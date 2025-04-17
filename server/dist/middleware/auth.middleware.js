var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from "jsonwebtoken";
import User, { UserRoleEnum } from "../models/accounts/user.model.js";
import { StatusCodes } from "http-status-codes";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "./catchAsyncErrors.js";
import Subscription from "../models/payment/subscription.model.js";
export const isAuthenticatedUser = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies["user_token"];
    if (!token) {
        throw new ErrorHandler("Unauthorized access", StatusCodes.FORBIDDEN);
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = yield User.findById(decoded.id);
    if (!user) {
        throw new ErrorHandler("User not found", StatusCodes.NOT_FOUND);
    }
    if (user.account.isBlocked) {
        throw new ErrorHandler("Your account has been blocked", StatusCodes.FORBIDDEN);
    }
    req.user = user;
    next();
}));
export const isUserVerified = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.account.isVerified)) {
        return next(new ErrorHandler("Please verify your email to access this resource", StatusCodes.UNAUTHORIZED));
    }
    next();
}));
export const hasAccess = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const user = req.user;
    if ((user === null || user === void 0 ? void 0 : user.profile.role) === UserRoleEnum.ADMIN) {
        return next();
    }
    if (user === null || user === void 0 ? void 0 : user.access.freeAccess) {
        return next();
    }
    if (!((_a = user === null || user === void 0 ? void 0 : user.access) === null || _a === void 0 ? void 0 : _a.cards) || !((_c = (_b = user === null || user === void 0 ? void 0 : user.access) === null || _b === void 0 ? void 0 : _b.cards) === null || _c === void 0 ? void 0 : _c.total)) {
        return next(new ErrorHandler("User access data is incomplete", 400));
    }
    const { created, total } = user.access.cards;
    const { initial, extra } = total;
    if (created < initial) {
        return next();
    }
    if (created >= initial + extra) {
        return next(new ErrorHandler("Cards limit exceeded", 401));
    }
    if (!(user === null || user === void 0 ? void 0 : user.access.latestSubscription)) {
        return next(new ErrorHandler("You don't have any subscription", 400));
    }
    const subscription = yield Subscription.findById(user.access.latestSubscription);
    if (!subscription) {
        return next(new ErrorHandler("Subscription not found", 400));
    }
    const isActiveSubscription = ["active", "pending", "created"].includes(subscription.status);
    const isCancelledSubscription = subscription.status === "cancelled" && subscription.currentEnd <= new Date();
    if (!isActiveSubscription || isCancelledSubscription) {
        return next(new ErrorHandler("Subscription expired, please recharge", 400));
    }
    next();
}));
export const checkCancellation = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const updateUserCards = () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.access.cards.total.extra) !== 0) {
            yield User.findByIdAndUpdate((_b = req.user) === null || _b === void 0 ? void 0 : _b._id, { "cards.total.extra": 0 }, { new: true, runValidators: true, useFindAndModify: false });
        }
    });
    const status = (_a = req.user) === null || _a === void 0 ? void 0 : _a.access.freeAccess;
    if (status) {
        yield updateUserCards();
    }
    if ((_b = req.user) === null || _b === void 0 ? void 0 : _b.access.latestSubscription) {
        const subscription = yield Subscription.findById((_c = req.user) === null || _c === void 0 ? void 0 : _c.access.latestSubscription);
        if (subscription && subscription.status === "cancelled" && subscription.currentEnd <= new Date(Date.now())) {
            yield updateUserCards();
        }
    }
    next();
}));
export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        var _a;
        if (!req.user || !roles.includes(req.user.profile.role)) {
            return next(new ErrorHandler(`Role: ${(_a = req.user) === null || _a === void 0 ? void 0 : _a.profile.role} is not allowed to access this resource`, StatusCodes.UNAUTHORIZED));
        }
        next();
    };
};
export const checkDeactivated = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if ((_a = req.user) === null || _a === void 0 ? void 0 : _a.account.isDeactivated) {
        return next(new ErrorHandler(`Your account is deactivated, contact the site to reactivate`, 401));
    }
    next();
}));
//# sourceMappingURL=auth.middleware.js.map