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
import Contact from "../../models/messages/contact.model.js";
import mongoose from "mongoose";
export const getAllContacts = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const resultPerPage = 20;
    const count = yield Contact.countDocuments();
    const apiFeatures = new ApiFeatures(Contact.find().sort({ $natural: -1 }), req.query).filter();
    let filteredContacts = yield apiFeatures.getQuery();
    let filteredContactsCount = filteredContacts.length;
    apiFeatures.pagination(resultPerPage);
    filteredContacts = yield apiFeatures.getQuery().clone();
    res.status(200).json({
        success: true,
        count,
        resultPerPage,
        contacts: filteredContacts,
        filteredContactsCount
    });
}));
export const getSingleContact = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid ID format", 400));
    }
    const contact = yield Contact.findById(id);
    if (!contact) {
        next(new ErrorHandler("Contact not found", 404));
    }
    res.status(200).json({
        success: true,
        contact
    });
}));
export const deleteContact = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid ID format", 400));
    }
    const contact = yield Contact.findById(id);
    if (!contact) {
        next(new ErrorHandler("Contact not found", 404));
    }
    yield Contact.findByIdAndDelete(id);
    res.status(200).json({
        success: true,
        message: "Contact deleted successfully"
    });
}));
export const switchAttendedContact = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid ID format", 400));
    }
    const contact = yield Contact.findById(id);
    if (!contact) {
        return next(new ErrorHandler("Contact not found", 404));
    }
    const newContact = yield Contact.findByIdAndUpdate(id, { attended: !contact.attended }, { new: true, runValidators: true, useFindAndModify: false });
    res.status(200).json({
        success: true,
        contact: newContact,
        message: "Contact attended switched successfully"
    });
}));
//# sourceMappingURL=contact.controller.js.map