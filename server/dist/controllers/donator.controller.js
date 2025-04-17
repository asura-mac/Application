var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import crypto from "crypto";
import short from "short-uuid";
import logger from "../config/logger.js";
import Donator from "../models/accounts/donator.model.js";
import { EMAIL_OTP_VERIFICATION } from "../constants/template.js";
import sendMail from "../utils/services/send.mail.js";
import sendDonatorToken from "../utils/tokens/donator.token.js";
import { instance } from "../index.js";
import Plan, { PlanEnum } from "../models/payment/plan.model.js";
import Subscription, { SubscriptionEnum } from "../models/payment/subscription.model.js";
import Transaction, { TransactionEnum } from "../models/payment/transaction.model.js";
import { addDonationToQueue } from "../utils/queue/donation.queue.js";
import { handleDonation } from "../utils/payment.js";
import ApiFeatures from "../utils/services/api.features.js";
import mongoose from "mongoose";
export const sendDonatorOTP = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email)
        return next(new ErrorHandler("Please enter Email", 400));
    let donator = yield Donator.findOne({ email });
    if (!donator)
        donator = yield Donator.create({ email });
    const otp = donator.getOneTimePassword();
    yield donator.save({ validateBeforeSave: false });
    try {
        const options = {
            templateId: EMAIL_OTP_VERIFICATION,
            recieverEmail: donator.email,
            dynamicData: {
                otp: otp,
            }
        };
        yield sendMail(options);
        res.status(200).json({
            success: true,
            message: `Email sent to ${donator.email} successfully`,
        });
    }
    catch (error) {
        donator.oneTimePassword = undefined;
        donator.oneTimeExpire = undefined;
        yield donator.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));
    }
}));
export const loginDonator = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { otp, email } = req.body;
    if (!email || !otp)
        return next(new ErrorHandler("Please enter Email and And Otp", 400));
    const oneTimePassword = crypto
        .createHash("sha256")
        .update(otp.toString())
        .digest("hex");
    const donator = yield Donator.findOne({
        email,
        oneTimePassword,
        oneTimeExpire: { $gt: Date.now() },
    });
    console.log(donator);
    if (!donator)
        return next(new ErrorHandler("Email Veification OTP has Expired", 400));
    donator.oneTimePassword = undefined;
    donator.oneTimeExpire = undefined;
    yield donator.save();
    sendDonatorToken(donator, 200, res);
}));
export const getDonator = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const donator = yield Donator.findById((_a = req.donator) === null || _a === void 0 ? void 0 : _a._id).populate("latestDonation", "planId status currentEnd");
    res.status(200).json({
        success: true,
        donator,
    });
}));
export const createDonatorDetails = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { firstName, lastName, phoneNumber, street, city, state, postalCode, country } = req.body;
    if (!firstName || !lastName || !phoneNumber || !street || !city || !state || !postalCode || !country) {
        return next(new ErrorHandler("Please enter all the required fields", 400));
    }
    const updateData = {
        firstName,
        lastName,
        phoneNumber,
        address: {
            street,
            city,
            state,
            postalCode,
            country,
        },
    };
    const donator = yield Donator.findByIdAndUpdate((_a = req.donator) === null || _a === void 0 ? void 0 : _a._id, updateData, { new: true, runValidators: true, useFindAndModify: false });
    res.status(200).json({
        success: true,
        donator,
    });
}));
export const createDonationPlan = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { amount, period } = req.body;
    if (!amount || !period)
        return next(new ErrorHandler("All fields are required", 404));
    const donator = yield Donator.findById((_a = req.donator) === null || _a === void 0 ? void 0 : _a._id);
    if (!donator)
        return next(new ErrorHandler("Donator not found", 404));
    const razorPlan = yield instance.plans.create({
        period,
        interval: 1,
        item: {
            name: donator._id.toString(),
            amount: Number(amount) * 100,
            currency: "INR",
            description: `Donation Plan for ${donator._id}`,
        },
    });
    if (!razorPlan)
        return next(new ErrorHandler("Failed to create plan from backend", 404));
    const plan = yield Plan.create({
        name: donator._id,
        amount: Number(amount),
        description: `Donation Plan for ${donator._id}`,
        cards: 0,
        planType: PlanEnum.DONATOR,
        period,
        interval: 1,
        razorPlanId: razorPlan.id,
    });
    res.status(200).json({
        success: true,
        plan
    });
}));
export const createSubscription = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const donator = yield Donator.findById((_a = req.donator) === null || _a === void 0 ? void 0 : _a._id);
    if (!donator)
        return next(new ErrorHandler("Donator not found", 404));
    if (donator.latestDonation) {
        const existingSubscription = yield Subscription.findById(donator.latestDonation);
        if (existingSubscription) {
            if (existingSubscription.status === "just_created") {
                yield Subscription.findByIdAndDelete(donator.latestDonation);
            }
            else if (!["completed", "cancelled"].includes(existingSubscription.status) ||
                (existingSubscription.status === "cancelled" && existingSubscription.currentEnd > new Date(Date.now()))) {
                return next(new ErrorHandler("You already have an active recurring Donation", 403));
            }
        }
    }
    const plan = yield Plan.findOne({ razorPlanId: req.body.id });
    if (!plan)
        return next(new ErrorHandler("Invalid Plan", 404));
    const razorSubscription = yield instance.subscriptions.create({
        plan_id: req.body.id,
        total_count: 12,
        quantity: 1,
        customer_notify: 0,
    });
    if (!razorSubscription)
        return next(new ErrorHandler("Failed to create subscription", 404));
    const subscription = yield Subscription.create({
        planId: plan._id,
        razorSubscriptionId: razorSubscription.id,
        shortUrl: razorSubscription.short_url,
        status: "just_created",
        subscriptionType: SubscriptionEnum.DONATOR,
        donator: donator._id,
    });
    yield Donator.findByIdAndUpdate(donator._id, { latestDonation: subscription._id }, { new: true, runValidators: true, useFindAndModify: false });
    res.status(200).json({
        success: true,
        key: process.env.RAZORPAY_KEY_ID,
        subscriptions_id: razorSubscription.id,
    });
}));
export const createDonation = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { amount, currency } = req.body;
    if (!amount || !currency) {
        return next(new ErrorHandler("All fields are required", 404));
    }
    ;
    const donator = yield Donator.findById((_a = req.donator) === null || _a === void 0 ? void 0 : _a._id);
    if (!donator) {
        return next(new ErrorHandler("Donator not found", 404));
    }
    const order = yield instance.orders.create({
        amount: Number(amount) * 100,
        currency: currency,
        receipt: `receipt_${short.generate()}`
    });
    if (!order) {
        return next(new ErrorHandler("Order Failed", 400));
    }
    yield Transaction.create({
        amount: amount,
        status: "just_created",
        razorpayOrderId: order.id,
        razorpayPaymentId: "pending",
        transactionFor: SubscriptionEnum.DONATOR,
        transactionType: TransactionEnum.ONETIME,
        currency: req.body.currency,
        donator: donator._id,
    });
    res.status(200).json({
        success: true,
        key: process.env.RAZORPAY_KEY_ID,
        order,
    });
}));
export const capturePayment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const webhookPayload = {
        header: req.headers['x-razorpay-signature'],
        dataPay: req.body
    };
    try {
        yield addDonationToQueue(webhookPayload);
    }
    catch (error) {
        logger.error("Failed to put Subscription in Queue");
    }
    res.status(200).send('OK');
});
export const verifyPayment = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const toBe = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSigntaure = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(toBe.toString())
        .digest("hex");
    const payment = yield instance.payments.fetch(razorpay_payment_id);
    if (!payment) {
        return next(new ErrorHandler("Payment Not Found", 404));
    }
    if (expectedSigntaure === razorpay_signature) {
        if (payment.status === "captured") {
            const donation = yield Transaction.findOne({ razorpayOrderId: payment.order_id });
            if (donation) {
                yield handleDonation(payment);
            }
        }
    }
    else {
        return next(new ErrorHandler("Payment Not Verified", 403));
    }
    res.status(200).json({
        success: true,
        paymentStatus: payment.status
    });
}));
export const getDonatorSubscription = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { donator } = req;
    if (!donator) {
        return next(new ErrorHandler("Donator not found", 404));
    }
    let subscription;
    if (donator.latestDonation) {
        subscription = yield Subscription.findById(donator.latestDonation).populate("planId", "name amount");
        ;
    }
    res.status(200).json({
        success: true,
        subscription
    });
}));
export const getDonatorTransaction = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const resultPerPage = 20;
    const count = yield Transaction.countDocuments();
    const donator = yield Donator.findById((_a = req.donator) === null || _a === void 0 ? void 0 : _a._id);
    if (!donator) {
        return next(new ErrorHandler("Donator not found", 404));
    }
    const apiFeatures = new ApiFeatures(Transaction.find({ donator: donator._id }).sort({ $natural: -1 }), req.query).filter();
    let filteredTransaction = yield apiFeatures.getQuery();
    let filteredTransactionCount = filteredTransaction.length;
    apiFeatures.pagination(resultPerPage);
    filteredTransaction = yield apiFeatures.getQuery().clone();
    res.status(200).json({
        success: true,
        count,
        resultPerPage,
        transactions: filteredTransaction,
        filteredTransactionCount
    });
}));
export const getParticularDonatorTransaction = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid ID format", 400));
    }
    const transaction = yield Transaction.findById(id);
    if (!transaction) {
        return next(new ErrorHandler("Transaction not found", 404));
    }
    if (transaction.transactionFor !== SubscriptionEnum.DONATOR) {
        return next(new ErrorHandler("Transaction not found", 403));
    }
    res.status(200).json({
        success: true,
        transaction,
    });
}));
export const logoutDonator = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("donator_auth", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
}));
//# sourceMappingURL=donator.controller.js.map