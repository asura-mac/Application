var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import catchAsyncErrors from "../../middleware/catchAsyncErrors.js";
import Transaction from "../../models/payment/transaction.model.js";
import ErrorHandler from "../../utils/errorHandler.js";
import ApiFeatures from "../../utils/services/api.features.js";
import User from "../../models/accounts/user.model.js";
import mongoose from "mongoose";
import Donator from "../../models/accounts/donator.model.js";
export const getAllTransactions = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const resultPerPage = 20;
    const count = yield Transaction.countDocuments();
    const apiFeatures = new ApiFeatures(Transaction.find().sort({ $natural: -1 }), req.query).filter();
    let filteredTransactions = yield apiFeatures.getQuery();
    let filteredTransactionsCount = filteredTransactions.length;
    apiFeatures.pagination(resultPerPage);
    filteredTransactions = yield apiFeatures.getQuery().clone();
    res.status(200).json({
        success: true,
        count,
        resultPerPage,
        transactions: filteredTransactions,
        filteredTransactionsCount
    });
}));
export const getUserTransactions = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid ID format", 400));
    }
    const user = yield User.findById(id);
    if (!user) {
        return next(new ErrorHandler(`No User By Id ${id}`, 404));
    }
    const resultPerPage = 20;
    const count = yield Transaction.countDocuments({ user: id });
    const apiFeatures = new ApiFeatures(Transaction.find({ user: id }).sort({ $natural: -1 }), req.query).filter();
    let filteredTransactions = yield apiFeatures.getQuery();
    let filteredTransactionsCount = filteredTransactions.length;
    apiFeatures.pagination(resultPerPage);
    filteredTransactions = yield apiFeatures.getQuery().clone();
    res.status(200).json({
        success: true,
        count,
        resultPerPage,
        transactions: filteredTransactions,
        filteredTransactionsCount
    });
}));
export const getDonatorTransactions = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid ID format", 400));
    }
    const donator = yield Donator.findById(id);
    if (!donator) {
        return next(new ErrorHandler(`No User By Id ${id}`, 404));
    }
    const resultPerPage = 20;
    const count = yield Transaction.countDocuments({ donator: id });
    const apiFeatures = new ApiFeatures(Transaction.find({ donator: id }).sort({ $natural: -1 }), req.query).filter();
    let filteredTransactions = yield apiFeatures.getQuery();
    let filteredTransactionsCount = filteredTransactions.length;
    apiFeatures.pagination(resultPerPage);
    filteredTransactions = yield apiFeatures.getQuery().clone();
    res.status(200).json({
        success: true,
        count,
        resultPerPage,
        transactions: filteredTransactions,
        filteredTransactionsCount
    });
}));
export const getParticularTransaction = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid ID format", 400));
    }
    const transaction = yield Transaction.findById(id);
    if (!transaction) {
        return next(new ErrorHandler(`No Transaction By Id ${id}`, 404));
    }
    res.status(200).json({
        success: true,
        transaction,
    });
}));
export const updateTransaction = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid ID format", 400));
    }
    const transaction = yield Transaction.findById(id);
    if (!transaction) {
        return next(new ErrorHandler(`No Transaction By Id ${id}`, 404));
    }
    const { status } = req.body;
    if (!status) {
        return next(new ErrorHandler("Please provide the status", 400));
    }
    if (status === transaction.status) {
        return next(new ErrorHandler("Status cannot be the same as the current status", 400));
    }
    const updatedTransaction = yield Transaction.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true, useFindAndModify: false });
    res.status(200).json({
        success: true,
        transaction: updatedTransaction,
        message: "Subscription status updated successfully",
    });
}));
export const deleteTransaction = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid ID format", 400));
    }
    const transaction = yield Transaction.findById(id);
    if (!transaction) {
        return next(new ErrorHandler(`No Transaction By Id ${id}`, 404));
    }
    yield Transaction.findByIdAndDelete(id);
    res.status(200).json({
        success: true,
        message: "Transaction deleted successfully",
    });
}));
//# sourceMappingURL=transaction.controller.js.map