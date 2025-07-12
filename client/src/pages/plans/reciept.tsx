import Loader from "@/components/rest/loader";
import "@/css/print.css";
import { ITransaction } from "@/types/type";
import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const RecieptPage = () => {
    const { type, id } = useParams();
    const [transaction, setTransaction] = useState<ITransaction | null>();

    const fetchTransaction = async () => {
        try {
            let link;
            if (type === "user") {
                link = `${import.meta.env.VITE_BASE_URL}/sub/transaction/${id}`;
            } else {
                link = `${import.meta.env.VITE_BASE_URL}/donate/transaction/${id}`
            }
            const { data } = await axios.get(link, { withCredentials: true });
            setTransaction(data.transaction);
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        fetchTransaction();
    }, [id, type]);

    const formatDate = (date: string | Date) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (!id || !transaction) ? <Loader /> : (
        <>
            <Helmet>
                <title>Evool Foundation | Receipt {id}</title>
                <meta name="description" content={`This is the receipt page of Evool Foundation`} />
                <meta name="keywords" content="receipt, evool foundation, donation" />
            </Helmet>
            
            <div className="min-h-screen bg-gray-50 py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden printable">
                        {/* Letterhead Section */}
                        <div className="letterhead-container">
                            <img 
                                src="/reciept_top.png" 
                                alt="Evool Foundation Letterhead" 
                                className="w-full h-auto"
                            />
                        </div>

                        {/* Receipt Content */}
                        <div className="p-8">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Receipt</h2>
                                <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8 mb-8">
                                {/* Transaction Details */}
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                                        Transaction Details
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 font-medium">Amount:</span>
                                            <span className="font-semibold text-green-600">
                                                {transaction.currency === "INR" ? "₹" : "$"} {transaction?.amount}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 font-medium">Period:</span>
                                            <span className="text-gray-800">
                                                {formatDate(transaction?.start)} - {formatDate(transaction?.end)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 font-medium">Status:</span>
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                transaction.status.toUpperCase() === 'CAPTURED' 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {transaction.status.toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 font-medium">Currency:</span>
                                            <span className="text-gray-800">{transaction.currency.toUpperCase()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 font-medium">Date:</span>
                                            <span className="text-gray-800">
                                                {formatDate(transaction?.start)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Information */}
                                <div className="bg-blue-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-blue-200 pb-2">
                                        Payment Information
                                    </h3>
                                    <div className="space-y-3">
                                        <div>
                                            <span className="text-gray-600 font-medium block">Payment Method:</span>
                                            <span className="text-gray-800 font-mono text-sm">
                                                {transaction.paymentMethod?.methodType 
                                                    ? transaction.paymentMethod.methodType.toUpperCase()
                                                    : 'UPI'
                                                } *** *** ***razorpay
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600 font-medium block">Payment ID:</span>
                                            <span className="text-gray-800 font-mono text-sm break-all">
                                                {transaction.razorpayPaymentId}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600 font-medium block">Order ID:</span>
                                            <span className="text-gray-800 font-mono text-sm break-all">
                                                {transaction.razorpayOrderId}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Transaction ID Section */}
                            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg mb-8">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Transaction ID</h3>
                                <p className="text-blue-600 font-mono text-sm break-all font-semibold">
                                    {transaction?._id}
                                </p>
                            </div>

                            {/* PAN Number Section (if applicable) */}
                            {type === "donate" && (
                                <div className="bg-yellow-50 p-6 rounded-lg mb-8 border-l-4 border-yellow-400">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">PAN Number</h3>
                                    <p className="text-gray-800 font-mono">AAICE3928L</p>    
                                </div>
                            )}

                            {/* Contact Information */}
                            <div className="text-center py-6 border-t border-gray-200">
                                <p className="text-gray-600">
                                    For any queries, please contact us at{" "}
                                    <a 
                                        href="mailto:contactus@evoolfoundation.org" 
                                        className="text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                        contactus@evoolfoundation.org
                                    </a>
                                </p>
                            </div>

                            {/* Print Button */}
                            <div className="text-center mt-8 not-printable">
                                <button
                                    onClick={() => window.print()}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                >
                                    Print Receipt
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RecieptPage;