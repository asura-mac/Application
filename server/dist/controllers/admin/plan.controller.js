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
import { instance } from "../../index.js";
import Plan, { PlanEnum } from "../../models/payment/plan.model.js";
import mongoose from "mongoose";
import ApiFeatures from "../../utils/services/api.features.js";
export const createPlan = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, planType, cards, amount, period, interval } = req.body;
    if (!name || !description || !planType || !cards || !amount || !period || !interval) {
        return next(new ErrorHandler("All fields are required", 404));
    }
    ;
    const razorPlan = yield instance.plans.create({
        period,
        interval,
        item: {
            name,
            amount: Number(amount) * 100,
            currency: "INR",
            description,
        },
    });
    if (!razorPlan) {
        return next(new ErrorHandler("Failed to create plan", 404));
    }
    const plan = yield Plan.create({
        name,
        amount: Number(amount),
        description,
        cards: Number(cards),
        planType,
        period,
        interval: Number(interval),
        razorPlanId: razorPlan.id,
    });
    res.status(200).json({
        success: true,
        plan
    });
}));
export const createFreePlan = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, cards, period, interval } = req.body;
    if (!cards || !period || !interval || !name || !description) {
        return next(new ErrorHandler("All fields are required", 404));
    }
    const plan = yield Plan.create({
        name,
        amount: 0,
        description,
        cards: Number(cards),
        planType: PlanEnum.FREE,
        visible: false,
        period,
        interval: Number(interval),
    });
    res.status(200).json({
        success: true,
        plan
    });
}));
export const updateFreePlan = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid ID format", 400));
    }
    const plan = yield Plan.findOne({ _id: id, planType: PlanEnum.FREE });
    if (!plan) {
        return next(new ErrorHandler(`No Plan By Id ${id}`, 404));
    }
    const { name, description, cards, period, interval } = req.body;
    const updatePlan = {};
    if (name)
        updatePlan.name = name;
    if (description)
        updatePlan.description = description;
    if (cards)
        updatePlan.cards = Number(cards);
    if (period)
        updatePlan.period = period;
    if (interval)
        updatePlan.interval = Number(interval);
    yield Plan.findByIdAndUpdate(id, updatePlan, { new: true, runValidators: true, useFindAndModify: false });
    res.status(200).json({
        success: true,
        message: `Free Plan Updated`,
    });
}));
export const switchPlanVisibility = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid ID format", 400));
    }
    const plan = yield Plan.findById(id);
    if (!plan) {
        return next(new ErrorHandler(`No Plan By Id ${id}`, 404));
    }
    yield Plan.findByIdAndUpdate(id, { visible: !plan.visible }, { new: true, runValidators: true, useFindAndModify: false });
    res.status(200).json({
        success: true,
        message: "Plan visibility was updated successfully",
    });
}));
export const getAllPlans = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const resultPerPage = 20;
    const count = yield Plan.countDocuments();
    const apiFeatures = new ApiFeatures(Plan.find().sort({ $natural: -1 }), req.query).search().filter();
    let filteredPlans = yield apiFeatures.getQuery();
    let filteredPlanCount = filteredPlans.length;
    apiFeatures.pagination(resultPerPage);
    filteredPlans = yield apiFeatures.getQuery().clone();
    res.status(200).json({
        success: true,
        count,
        resultPerPage,
        plans: filteredPlans,
        filteredPlanCount
    });
}));
export const getParticularPlan = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid ID format", 400));
    }
    const plan = yield Plan.findById(id);
    if (!plan) {
        return next(new ErrorHandler(`No Plan By Id ${id}`, 404));
    }
    ;
    res.status(200).json({
        success: true,
        plan
    });
}));
export const updatePlan = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid ID format", 400));
    }
    const plan = yield Plan.findById(id);
    if (!plan) {
        return next(new ErrorHandler(`No Plan By Id ${id}`, 404));
    }
    const { name, description, cards } = req.body;
    const planData = {};
    if (name)
        planData.name = name;
    if (description)
        planData.description = description;
    if (cards)
        planData.cards = Number(cards);
    const updatedPlan = yield Plan.findByIdAndUpdate(id, planData, { new: true, runValidators: true, useFindAndModify: false });
    res.status(200).json({
        success: true,
        message: "Plan Updated Successfully",
        plan: updatedPlan
    });
}));
export const deletePlan = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid ID format", 400));
    }
    const plan = yield Plan.findById(id);
    if (!plan) {
        return next(new ErrorHandler(`No Plan By Id ${id}`, 404));
    }
    ;
    yield Plan.findByIdAndDelete(id);
    res.status(200).json({
        success: true,
        message: `Plan deleted successfully`,
    });
}));
//# sourceMappingURL=plan.controller.js.map