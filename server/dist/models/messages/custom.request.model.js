import mongoose from "mongoose";
import { PeriodEnum } from "../payment/plan.model.js";
export const AcceptedEnum = {
    PENDING: "PENDING",
    ACCEPTED: "ACCEPTED",
    REJECTED: "REJECTED",
};
const CustomRequestSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please Enter your Email"],
        match: [/.+\@.+\..+/, 'Please enter a valid email address']
    },
    attended: {
        type: Boolean,
        required: true,
        default: false
    },
    accepted: {
        type: String,
        enum: Object.values(AcceptedEnum),
    },
    reason: String,
    cards: {
        type: Number,
        required: true
    },
    comment: String,
    period: {
        type: String,
        required: true,
        enum: Object.values(PeriodEnum),
    },
    interval: {
        type: Number,
        required: [true, "Enter Plan Interval"]
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true
});
const CustomRequest = mongoose.model("CustomRequest", CustomRequestSchema);
export default CustomRequest;
//# sourceMappingURL=custom.request.model.js.map