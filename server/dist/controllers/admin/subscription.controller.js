var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from "mongoose";
import catchAsyncErrors from "../../middleware/catchAsyncErrors.js";
import User from "../../models/accounts/user.model.js";
import Subscription from "../../models/payment/subscription.model.js";
import ErrorHandler from "../../utils/errorHandler.js";
import ApiFeatures from "../../utils/services/api.features.js";
import Donator from "../../models/accounts/donator.model.js";
export const getUserLatestSubscription = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid ID format", 400));
    }
    const user = yield User.findById(id);
    if (!user) {
        return next(new ErrorHandler(`User does not exist with Id: ${id}`, 404));
    }
    const subscription = yield Subscription.findById(user.access.latestSubscription).populate("planId", "name amount currentEnd");
    if (!subscription) {
        return next(new ErrorHandler(`User does not exist with Id: ${id}`, 404));
    }
    res.status(200).json({
        success: true,
        subscription,
    });
}));
export const getUserSubscriptions = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid ID format", 400));
    }
    const user = yield User.findById(id);
    if (!user) {
        return next(new ErrorHandler(`User does not exist with Id: ${id}`, 404));
    }
    const resultPerPage = 20;
    const count = yield Subscription.countDocuments({ user: user._id });
    const apiFeatures = new ApiFeatures(Subscription.find({ user: user._id }).sort({ $natural: -1 }), req.query).filter();
    let filteredSubscriptions = yield apiFeatures.getQuery();
    let filteredSubscriptionsCount = filteredSubscriptions.length;
    apiFeatures.pagination(resultPerPage);
    filteredSubscriptions = yield apiFeatures.getQuery().clone();
    res.status(200).json({
        success: true,
        count,
        resultPerPage,
        subscriptions: filteredSubscriptions,
        filteredSubscriptionsCount
    });
}));
export const getAllUserSubscriptions = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const resultPerPage = 20;
    const count = yield Subscription.countDocuments();
    const apiFeatures = new ApiFeatures(Subscription.find().sort({ $natural: -1 }), req.query).filter();
    let filteredSubscriptions = yield apiFeatures.getQuery();
    let filteredSubscriptionsCount = filteredSubscriptions.length;
    apiFeatures.pagination(resultPerPage);
    filteredSubscriptions = yield apiFeatures.getQuery().clone();
    res.status(200).json({
        success: true,
        count,
        resultPerPage,
        subscriptions: filteredSubscriptions,
        filteredSubscriptionsCount
    });
}));
export const getParticularSubscription = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid ID format", 400));
    }
    const subscription = yield Subscription.findById(id).populate("planId", "name amount currentEnd");
    if (!subscription) {
        return next(new ErrorHandler(`Subscription does not exist with Id: ${id}`, 404));
    }
    res.status(200).json({
        success: true,
        subscription,
    });
}));
export const updateSubscription = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid ID format", 400));
    }
    const subscription = yield Subscription.findById(id);
    if (!subscription) {
        return next(new ErrorHandler(`Subscription does not exist with Id: ${id}`, 404));
    }
    const { status } = req.body;
    if (!status) {
        return next(new ErrorHandler("Please provide the status", 400));
    }
    if (status === subscription.status) {
        return next(new ErrorHandler("Status cannot be the same as the current status", 400));
    }
    const updatedSubscription = yield Subscription.findByIdAndUpdate(id, { status }, { new: true, runValidators: true, useFindAndModify: false });
    res.status(200).json({
        success: true,
        subscription: updatedSubscription,
        message: "Subscription status updated successfully",
    });
}));
export const deleteSubscription = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid ID format", 400));
    }
    const subscription = yield Subscription.findById(id);
    if (!subscription) {
        return next(new ErrorHandler(`Subscription does not exist with Id: ${id}`, 404));
    }
    yield Subscription.findByIdAndDelete(id);
    res.status(200).json({
        success: true,
        message: "Subscription deleted successfully",
    });
}));
export const getDonatorLatestSubscription = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid ID format", 400));
    }
    const donator = yield Donator.findById(id);
    if (!donator) {
        return next(new ErrorHandler(`User does not exist with Id: ${id}`, 404));
    }
    const subscription = yield Subscription.findById(donator.latestDonation).populate("planId", "_id name amount currentEnd");
    if (!subscription) {
        return next(new ErrorHandler(`User does not exist with Id: ${id}`, 404));
    }
    res.status(200).json({
        success: true,
        subscription,
    });
}));
export const getDonatorSubscriptions = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid ID format", 400));
    }
    const donator = yield Donator.findById(id);
    if (!donator) {
        return next(new ErrorHandler(`User does not exist with Id: ${id}`, 404));
    }
    const resultPerPage = 20;
    const count = yield Subscription.countDocuments({ donator: donator._id });
    const apiFeatures = new ApiFeatures(Subscription.find({ donator: donator._id }).sort({ $natural: -1 }), req.query).filter();
    let filteredSubscriptions = yield apiFeatures.getQuery();
    let filteredSubscriptionsCount = filteredSubscriptions.length;
    apiFeatures.pagination(resultPerPage);
    filteredSubscriptions = yield apiFeatures.getQuery().clone();
    res.status(200).json({
        success: true,
        count,
        resultPerPage,
        subscriptions: filteredSubscriptions,
        filteredSubscriptionsCount
    });
}));
//# sourceMappingURL=subscription.controller.js.map