var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ErrorHandler from "../../utils/errorHandler.js";
import catchAsyncErrors from "../../middleware/catchAsyncErrors.js";
import User from "../../models/accounts/user.model.js";
import CustomRequest, { AcceptedEnum } from "../../models/messages/custom.request.model.js";
import { CLIENT_URL, instance } from "../../index.js";
import Plan, { PlanEnum } from "../../models/payment/plan.model.js";
import { EMAIL_REPLY_CUSTOM_PLAN } from "../../constants/template.js";
import sendMail from "../../utils/services/send.mail.js";
import mongoose from "mongoose";
import ApiFeatures from "../../utils/services/api.features.js";
export const createCustomPlan = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { period, interval, userId, amount, cards } = req.body;
    if (!period || !interval || !amount || !cards || !userId) {
        return next(new ErrorHandler("All fields are required", 400));
    }
    const user = yield User.findById(userId);
    if (!user) {
        return next(new ErrorHandler(`User does not exist with Id: ${userId}`, 404));
    }
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid ID format", 400));
    }
    const customRequest = yield CustomRequest.findById(id);
    if (!customRequest) {
        return next(new ErrorHandler(`Custom Request does not exist with Id: ${id}`, 404));
    }
    const razorPlan = yield instance.plans.create({
        period,
        interval,
        item: {
            name: userId,
            amount: Number(amount) * 100,
            currency: "INR",
            description: `Custom Plan for ${userId}`
        },
    });
    if (!razorPlan) {
        return next(new ErrorHandler("Failed to create plan", 500));
    }
    const plan = yield Plan.create({
        name: userId,
        amount: Number(amount),
        description: `Custom Plan for ${userId}`,
        cards: Number(cards),
        planType: PlanEnum.CUSTOM,
        period,
        interval: Number(interval),
        razorPlanId: razorPlan.id,
    });
    try {
        const options = {
            templateId: EMAIL_REPLY_CUSTOM_PLAN,
            recieverEmail: user.profile.email,
            dynamicData: {
                status: "Accepted",
                link: `${CLIENT_URL}/view-custom?id=${plan._id}&user=${user._id}`,
            }
        };
        yield sendMail(options);
    }
    catch (error) {
        console.log(error.message);
    }
    const newRequest = yield CustomRequest.findByIdAndUpdate(req.params.id, { attended: true, accepted: AcceptedEnum.ACCEPTED, reason: plan._id }, { new: true, runValidators: true, useFindAndModify: false });
    res.status(200).json({
        success: true,
        request: newRequest,
    });
}));
export const getAllCustomRequests = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const resultPerPage = 20;
    const count = yield CustomRequest.countDocuments();
    const apiFeatures = new ApiFeatures(CustomRequest.find().sort({ $natural: -1 }), req.query).filter();
    let filteredRequests = yield apiFeatures.getQuery();
    let filteredRequestsCount = filteredRequests.length;
    apiFeatures.pagination(resultPerPage);
    filteredRequests = yield apiFeatures.getQuery().clone();
    res.status(200).json({
        success: true,
        count,
        resultPerPage,
        requests: filteredRequests,
        filteredRequestsCount
    });
}));
export const getParticularRequest = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid ID format", 400));
    }
    const request = yield CustomRequest.findById(id).populate("user", "name email");
    if (!request) {
        return next(new ErrorHandler("Request not found", 404));
    }
    res.status(200).json({
        success: true,
        request,
    });
}));
export const deleteRequest = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid ID format", 400));
    }
    const request = yield CustomRequest.findById(id);
    if (!request) {
        return next(new ErrorHandler("Request not found", 404));
    }
    yield CustomRequest.findByIdAndDelete(id);
    res.status(200).json({
        success: true,
        message: "Request deleted successfully"
    });
}));
export const attendCustomRequests = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid ID format", 400));
    }
    const request = yield CustomRequest.findById(id);
    if (!request) {
        return next(new ErrorHandler("Request not found", 404));
    }
    const { status, reason } = req.body;
    if (!status || !reason) {
        return next(new ErrorHandler("Status and reason are required", 400));
    }
    if (!Object.values(AcceptedEnum).includes(status)) {
        return next(new ErrorHandler("Invalid Status", 400));
    }
    const newRequest = yield CustomRequest.findByIdAndUpdate(id, { attended: true, accepted: status, reason }, { new: true, runValidators: true, useFindAndModify: false }).populate("user", "name email");
    res.status(200).json({
        success: true,
        request: newRequest,
        message: `Request successfully attended`
    });
}));
export const rejectCustomPlan = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, reason } = req.body;
    if (!userId || !reason) {
        return next(new ErrorHandler("All fields are required", 404));
    }
    const user = yield User.findById(userId);
    if (!user) {
        return next(new ErrorHandler(`User does not exist with Id: ${userId}`, 404));
    }
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid ID format", 400));
    }
    const customRequest = yield CustomRequest.findById(id);
    if (!customRequest) {
        return next(new ErrorHandler(`Custom Request does not exist with Id: ${id}`, 404));
    }
    if (customRequest.accepted === AcceptedEnum.ACCEPTED) {
        return next(new ErrorHandler("Custom Request already accepted cannot be rejected", 400));
    }
    try {
        const options = {
            templateId: EMAIL_REPLY_CUSTOM_PLAN,
            recieverEmail: user.profile.email,
            dynamicData: {
                status: "Rejected",
                reason: reason
            }
        };
        yield sendMail(options);
    }
    catch (error) {
        console.log(error.message);
    }
    const newRequest = yield CustomRequest.findByIdAndUpdate(req.params.id, { attended: true, accepted: AcceptedEnum.REJECTED, reason }, { new: true, runValidators: true, useFindAndModify: false }).populate("user", "name email");
    res.status(200).json({
        success: true,
        request: newRequest,
        message: "Request rejected successfully"
    });
}));
//# sourceMappingURL=request.controller.js.map