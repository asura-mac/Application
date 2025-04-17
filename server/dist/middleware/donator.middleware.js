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
import catchAsyncErrors from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import Donator from "../models/accounts/donator.model.js";
export const isAuthenticatedDonator = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const donatorToken = req.cookies["donator_auth"];
    if (!donatorToken) {
        throw new ErrorHandler("Unauthorized access", StatusCodes.FORBIDDEN);
    }
    const decoded = jwt.verify(donatorToken, process.env.JWT_SECRET);
    const donator = yield Donator.findById(decoded.id);
    if (!donator) {
        throw new ErrorHandler("Donator not found", StatusCodes.NOT_FOUND);
    }
    req.donator = donator;
    next();
}));
//# sourceMappingURL=donator.middleware.js.map