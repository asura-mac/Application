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
import User, { UserRoleEnum } from "../models/accounts/user.model.js";
import Card, { CardEnum } from "../models/card/card.model.js";
import mongoose from "mongoose";
import ApiFeatures from "../utils/services/api.features.js";
import Subscription from "../models/payment/subscription.model.js";
// Create Card
export const createCard = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    if (!user)
        return next(new ErrorHandler("User not found", 404));
    const totalCards = user.access.cards.total.extra + user.access.cards.total.initial;
    if (user.profile.role !== UserRoleEnum.ADMIN && !user.access.freeAccess && totalCards <= user.access.cards.created)
        return next(new ErrorHandler(`You have reached your total card limit.`, 403));
    let shortId = `sh${Date.now().toString(36)}`;
    let exists = yield Card.findOne({ shortCode: shortId });
    while (exists) {
        shortId = `sh${Date.now().toString(36)}`;
        exists = yield Card.findOne({ shortCode: shortId });
    }
    const { type } = req.query;
    if (!type)
        return next(new ErrorHandler("Card type is required", 400));
    if (!Object.values(CardEnum).includes(type))
        return next(new ErrorHandler("Invalid card type", 400));
    const card = yield Card.create({
        type,
        data: req.body,
        shortCode: shortId,
        userId: user._id
    });
    user.access.cards.created++;
    yield user.save();
    res.status(201).json({
        success: true,
        card,
    });
}));
// Batch Create Cards
export const createBatchCards = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    if (!user)
        return next(new ErrorHandler("User not found", 404));
    const { names, name, quantity } = req.body;
    if ((!Array.isArray(names) && !name) || (!names && (!quantity || quantity <= 0))) {
        return next(new ErrorHandler('Invalid request: Provide an array of names or a single name with quantity.', 400));
    }
    const totalRequested = Array.isArray(names) ? names.length : quantity;
    const totalCards = user.access.cards.total.extra + user.access.cards.total.initial;
    if (user.profile.role !== UserRoleEnum.ADMIN && !user.access.freeAccess && totalCards < user.access.cards.created + totalRequested) {
        return next(new ErrorHandler(`You have reached your total card limit.`, 403));
    }
    const batchCards = [];
    const { type } = req.query;
    if (!type)
        return next(new ErrorHandler("Card type is required", 400));
    if (!Object.values(CardEnum).includes(type))
        return next(new ErrorHandler("Invalid card type", 400));
    const cardNames = Array.isArray(names) ? names : Array(quantity).fill(name);
    for (const cardName of cardNames) {
        let shortId = `sh${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
        let exists = yield Card.findOne({ shortCode: shortId });
        while (exists) {
            shortId = `sh${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
            exists = yield Card.findOne({ shortCode: shortId });
        }
        batchCards.push({
            type,
            data: { name: cardName },
            shortCode: shortId,
            userId: user === null || user === void 0 ? void 0 : user._id,
        });
    }
    const createdCards = yield Card.insertMany(batchCards);
    user.access.cards.created += totalRequested;
    yield user.save();
    res.status(201).json({
        success: true,
        card: createdCards,
    });
}));
// Update Card
export const updateCard = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return next(new ErrorHandler("Invalid ID format", 400));
    const card = yield Card.findById(id);
    if (!card)
        return next(new ErrorHandler(`Card does not exist with Id: ${id}`, 404));
    const { user } = req;
    if (!user)
        return next(new ErrorHandler("User not found", 404));
    if (card.userId.toString() !== user._id.toString())
        return next(new ErrorHandler("Unauthorized to update this vCard", 401));
    const totalCards = user.access.cards.total.extra + user.access.cards.total.initial;
    // if (!user.access.freeAccess && totalCards <= user.access.cards.created) return next(new ErrorHandler(`You have reached your total card limit.`, 403));
    if (user.profile.role !== UserRoleEnum.ADMIN && !user.access.freeAccess && totalCards <= user.access.cards.created)
        return next(new ErrorHandler(`You have reached your total card limit.`, 403));
    const updatedCard = yield Card.findByIdAndUpdate(id, { data: req.body }, { new: true, runValidators: true, useFindAndModify: false });
    if (!updatedCard)
        return next(new ErrorHandler(`Update Failed`, 404));
    res.status(200).json({
        success: true,
        card: updatedCard,
    });
}));
// Delete Card
export const deleteCard = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return next(new ErrorHandler("Invalid ID format", 400));
    const card = yield Card.findById(id);
    if (!card)
        return next(new ErrorHandler(`Card does not exist with Id: ${id}`, 404));
    const { user } = req;
    if (!user)
        return next(new ErrorHandler("User not found", 404));
    if (card.userId.toString() !== user._id.toString())
        return next(new ErrorHandler("Unauthorized to delete this vCard", 401));
    yield Card.findByIdAndDelete(id);
    user.access.cards.created--;
    yield user.save();
    res.status(200).json({
        success: true,
        message: `Card deleted`,
    });
}));
export const deleteCards = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { ids } = req.body; // Expecting an array of card IDs in request body
    if (!Array.isArray(ids) || ids.length === 0) {
        return next(new ErrorHandler("Invalid request. Provide an array of card IDs.", 400));
    }
    // Validate ObjectIDs
    const invalidIds = ids.filter(id => !mongoose.Types.ObjectId.isValid(id));
    if (invalidIds.length > 0) {
        return next(new ErrorHandler(`Invalid ID format(s): ${invalidIds.join(", ")}`, 400));
    }
    const { user } = req;
    if (!user)
        return next(new ErrorHandler("User not found", 404));
    // Find all cards by IDs
    const cards = yield Card.find({ _id: { $in: ids } });
    if (cards.length === 0)
        return next(new ErrorHandler("No matching cards found", 404));
    // Check if the user owns all these cards
    const unauthorizedCards = cards.filter(card => card.userId.toString() !== user._id.toString());
    if (unauthorizedCards.length > 0) {
        return next(new ErrorHandler("Unauthorized to delete one or more vCards", 401));
    }
    // Perform deletion
    const deleteCount = yield Card.deleteMany({ _id: { $in: ids } });
    // Update user's created card count
    user.access.cards.created = Math.max(user.access.cards.created - deleteCount.deletedCount, 0);
    yield user.save();
    res.status(200).json({
        success: true,
        message: `Successfully deleted ${deleteCount.deletedCount} card(s)`,
    });
}));
// Fetch User Cards
export const getUserCards = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const resultPerPage = 20;
    const filter = { userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id };
    if (req.query.type !== "ALL") {
        filter.type = req.query.type;
    }
    const count = yield Card.countDocuments(filter);
    const apiFeatures = new ApiFeatures(Card.find(filter).select("data.name type shortCode createdAt").sort({ $natural: -1 }), req.query).searchCard();
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
// Get Display Card
export const getDisplayCard = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const card = yield Card.findOne({ shortCode: req.params.id });
    if (!card)
        return next(new ErrorHandler("Card Not Found", 404));
    const user = yield User.findById(card.userId);
    if (!user)
        return next(new ErrorHandler("User Not Found", 404));
    const returnCard = () => {
        res.status(200).json({ success: true, card });
        return;
    };
    if (user.access.freeAccess)
        return returnCard();
    if (user.access.latestSubscription) {
        const subscription = yield Subscription.findById(user.access.latestSubscription);
        if (subscription && ["active", "pending"].includes(subscription.status))
            return returnCard();
    }
    if (user.profile.role === UserRoleEnum.ADMIN)
        return returnCard();
    if (((_b = (_a = user.access.cards) === null || _a === void 0 ? void 0 : _a.created) !== null && _b !== void 0 ? _b : 0) <= ((_d = (_c = user.access.cards) === null || _c === void 0 ? void 0 : _c.total.initial) !== null && _d !== void 0 ? _d : 0))
        return returnCard();
    return next(new ErrorHandler("No Cards", 403));
}));
// Get General User Card
export const getGeneralCard = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid ID format", 400));
    }
    const card = yield Card.findById(id);
    if (!card)
        return next(new ErrorHandler("Card Not Found", 400));
    const { user } = req;
    if (!user)
        return next(new ErrorHandler("User not found", 404));
    if (card.userId.toString() !== user._id.toString())
        return next(new ErrorHandler("Unauthorized to fetch this vCard", 401));
    res.status(200).json({
        success: true,
        card,
    });
}));
//# sourceMappingURL=card.controller.js.map