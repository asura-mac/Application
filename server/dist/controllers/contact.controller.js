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
import Contact from "../models/messages/contact.model.js";
export const createContact = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, message, report } = req.body;
    if (!email || !name || !message)
        return next(new ErrorHandler("All fields are required", 404));
    const contact = yield Contact.create({
        email,
        name,
        message,
        report: report !== undefined ? Boolean(report) : undefined
    });
    res.status(200).json({
        success: true,
        contact
    });
}));
//# sourceMappingURL=contact.controller.js.map