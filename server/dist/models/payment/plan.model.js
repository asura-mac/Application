import mongoose from "mongoose";
export const PeriodEnum = {
    DAILY: "daily",
    WEEKLY: "weekly",
    MONTHLY: "monthly",
    YEARLY: "yearly",
};
export const PlanEnum = {
    USER: "USER",
    ORGANIZATION: "ORGANIZATION",
    FREE: "FREE",
    CUSTOM: "CUSTOM",
    DONATOR: "DONATOR",
};
const PlanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Enter Plan Name"]
    },
    amount: {
        type: Number,
        required: [true, "Enter Plan Amount"]
    },
    cards: {
        type: Number,
        required: [true, "Enter Cards Allowed"]
    },
    description: {
        type: String,
        required: [true, "Enter Plan Description"]
    },
    planType: {
        type: String,
        required: true,
        enum: Object.values(PlanEnum),
    },
    visible: {
        type: Boolean,
        default: true
    },
    period: {
        type: String,
        required: true,
        enum: Object.values(PeriodEnum),
    },
    interval: {
        type: Number,
        required: [true, "Enter Plan Interval"]
    },
    razorPlanId: {
        type: String,
    }
}, {
    timestamps: true
});
const Plan = mongoose.model("Plan", PlanSchema);
export default Plan;
//# sourceMappingURL=plan.model.js.map