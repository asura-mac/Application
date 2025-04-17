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
import ApiFeatures from "../../utils/services/api.features.js";
import Card from "../../models/card/card.model.js";
import User from "../../models/accounts/user.model.js";
import mongoose from "mongoose";
export const getAllCards = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const resultPerPage = 20;
    const filter = {};
    if (req.query.type !== "ALL") {
        filter.type = req.query.type;
    }
    const count = yield Card.countDocuments(filter);
    const apiFeatures = new ApiFeatures(Card.find(filter).select("data.name type shortCode createdAt").populate("userId", "profile.email").sort({ $natural: -1 }), req.query).searchCard();
    let filteredCards = yield apiFeatures.getQuery();
    let filteredCardsCount = filteredCards.length;
    apiFeatures.pagination(resultPerPage);
    filteredCards = yield apiFeatures.getQuery().clone();
    res.status(200).json({
        success: true,
        count,
        resultPerPage,
        cards: filteredCards,
        filteredCardsCount
    });
}));
export const getCardStats = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid ID format", 400));
    }
    const user = yield User.findById(id);
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }
    const botanicalCard = yield Card.countDocuments({ userId: user.id, type: "BOTANICAL" });
    const animalCard = yield Card.countDocuments({ userId: user.id, type: "ANIMAL" });
    const creatorCard = yield Card.countDocuments({ userId: user.id, type: "CREATOR" });
    const individualCard = yield Card.countDocuments({ userId: user.id, type: "INDIVIDUAL" });
    const medicalCard = yield Card.countDocuments({ userId: user.id, type: "MEDICAL" });
    res.status(200).json({
        success: true,
        count: {
            botanical: botanicalCard,
            individual: individualCard,
            creator: creatorCard,
            medical: medicalCard,
            animal: animalCard
        }
    });
}));
export const getUserCards = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid ID format", 400));
    }
    const user = yield User.findById(id);
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }
    const resultPerPage = 20;
    const filter = { userId: user._id };
    if (req.query.type !== "ALL") {
        filter.type = req.query.type;
    }
    const count = yield Card.countDocuments(filter);
    const apiFeatures = new ApiFeatures(Card.find(filter).select("data.name userId type shortCode createdAt").populate("userId", "profile.email").sort({ $natural: -1 }), req.query).searchCard();
    let filteredCards = yield apiFeatures.getQuery();
    let filteredCardsCount = filteredCards.length;
    apiFeatures.pagination(resultPerPage);
    filteredCards = yield apiFeatures.getQuery().clone();
    res.status(200).json({
        success: true,
        count,
        resultPerPage,
        cards: filteredCards,
        filteredCardsCount
    });
}));
export const getSingleCard = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid ID format", 400));
    }
    const card = yield Card.findById(id).populate("userId", "profile.email");
    if (!card) {
        return next(new ErrorHandler("Card Not Found", 404));
    }
    res.status(200).json({
        success: true,
        card
    });
}));
export const deleteCard = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid ID format", 400));
    }
    const card = yield Card.findById(id);
    if (!card) {
        return next(new ErrorHandler("Card Not Found", 404));
    }
    const user = yield User.findById(card.userId);
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }
    yield Card.findByIdAndDelete(id);
    user.access.cards.created--;
    yield user.save();
    res.status(200).json({
        success: true,
        message: "Successfully deleted card"
    });
}));
//# sourceMappingURL=card.controller.js.map