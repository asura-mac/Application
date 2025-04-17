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
import CustomRequest, { AcceptedEnum } from "../models/messages/custom.request.model.js";
import { EMAIL_REQUEST_CUSTOM_PLAN } from "../constants/template.js";
import sendMail from "../utils/services/send.mail.js";
import Plan, { PlanEnum } from "../models/payment/plan.model.js";
export const requestCustomPlan = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email, cards, comment, period, interval } = req.body;
    if (!email || !cards || !comment || !period || !interval)
        return next(new ErrorHandler("All fields are required", 404));
    const newRequest = yield CustomRequest.create({
        email,
        cards: Number(cards),
        accepted: AcceptedEnum.PENDING,
        comment,
        period,
        interval: Number(interval),
        user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
    });
    try {
        const options = {
            templateId: EMAIL_REQUEST_CUSTOM_PLAN,
            recieverEmail: process.env.ADMIN_EMAIL,
            dynamicData: {
                email: email,
                cards: cards,
                comment: comment,
                period: period,
                interval: interval,
                link: `https://admin.voolata.com/requests/details?id=${newRequest._id}`
            }
        };
        yield sendMail(options);
    }
    catch (error) {
        console.log(error.message);
    }
    res.status(200).json({
        success: true,
        newRequest
    });
}));
export const getCustomPlan = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const plan = yield Plan.findById(req.params.id);
    if (!plan)
        return next(new ErrorHandler(`No Plan By Id ${req.params.id}`, 404));
    if (plan.planType !== PlanEnum.CUSTOM)
        return next(new ErrorHandler(`Plan ${req.params.id} is not a Custom Plan`, 403));
    if (plan.name !== req.query.user)
        return next(new ErrorHandler(`Plan mismatch`, 403));
    res.status(200).json({
        success: true,
        plan
    });
}));
export const getAllPlans = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const plans = yield Plan.find({ visible: true, planType: { $ne: PlanEnum.CUSTOM } });
    res.status(200).json({
        success: true,
        plans
    });
}));
export const getPlan = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const plan = yield Plan.findById(req.params.id);
    if (!plan)
        return next(new ErrorHandler(`No Plan By Id ${req.params.id}`, 404));
    if (plan.planType === PlanEnum.CUSTOM)
        return next(new ErrorHandler(`No Plan By Id ${req.params.id}`, 404));
    res.status(200).json({
        success: true,
        plan
    });
}));
//# sourceMappingURL=plan.controller.js.map