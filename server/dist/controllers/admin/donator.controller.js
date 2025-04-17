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
import Donator from "../../models/accounts/donator.model.js";
import ErrorHandler from "../../utils/errorHandler.js";
import ApiFeatures from "../../utils/services/api.features.js";
import mongoose from "mongoose";
export const getAllDonators = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const resultPerPage = 20;
    const count = yield Donator.countDocuments();
    const apiFeatures = new ApiFeatures(Donator.find().sort({ $natural: -1 }), req.query).search().filter();
    let filteredDonators = yield apiFeatures.getQuery();
    let filteredDonatorsCount = filteredDonators.length;
    apiFeatures.pagination(resultPerPage);
    filteredDonators = yield apiFeatures.getQuery().clone();
    res.status(200).json({
        success: true,
        count,
        resultPerPage,
        filteredDonatorsCount,
        donators: filteredDonators,
    });
}));
export const getSingleDonator = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid ID format", 400));
    }
    const donator = yield Donator.findById(id).populate("latestDonation", "planId status currentEnd");
    ;
    if (!donator) {
        return next(new ErrorHandler(`No Donator By Id ${id}`, 404));
    }
    res.status(200).json({
        success: true,
        donator,
    });
}));
//# sourceMappingURL=donator.controller.js.map