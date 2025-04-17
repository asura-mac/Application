var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from "express";
import { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from "date-fns";
import User from "../../models/accounts/user.model.js";
import Transaction from "../../models/payment/transaction.model.js";
import Card from "../../models/card/card.model.js";
import Subscription from "../../models/payment/subscription.model.js";
const router = Router();
/**
 * Helper function to get the start and end date based on the period
 */
const getDateRange = (period) => {
    const today = new Date();
    switch (period) {
        case "daily":
            return { start: startOfDay(today), end: endOfDay(today) };
        case "weekly":
            return { start: startOfWeek(today), end: endOfWeek(today) };
        case "monthly":
            return { start: startOfMonth(today), end: endOfMonth(today) };
        case "yearly":
            return { start: startOfYear(today), end: endOfYear(today) };
        default:
            return { start: new Date(0), end: today }; // Default: All-time
    }
};
/**
 * @route GET /stats/users
 * @desc Get users count with date filtering
 */
router.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { period, startDate, endDate } = req.query;
        let dateFilter = {};
        if (startDate && endDate) {
            dateFilter.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }
        else if (period) {
            const { start, end } = getDateRange(period);
            dateFilter.createdAt = { $gte: start, $lte: end };
        }
        const totalUsers = yield User.countDocuments(dateFilter);
        res.json({ totalUsers });
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching users count" });
    }
}));
/**
 * @route GET /stats/donations
 * @desc Get total donations with time range filtering
 */
router.get("/donations", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { period, startDate, endDate } = req.query;
        let dateFilter = {};
        if (startDate && endDate) {
            dateFilter.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }
        else if (period) {
            const { start, end } = getDateRange(period);
            dateFilter.createdAt = { $gte: start, $lte: end };
        }
        const totalDonations = yield Transaction.aggregate([
            { $match: Object.assign({ transactionFor: "DONATOR" }, dateFilter) },
            { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
        ]);
        res.json({ totalDonations: ((_a = totalDonations[0]) === null || _a === void 0 ? void 0 : _a.totalAmount) || 0 });
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching donations amount" });
    }
}));
/**
 * @route GET /stats/cards
 * @desc Get total cards count over time
 */
router.get("/cards", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { period, startDate, endDate } = req.query;
        let dateFilter = {};
        if (startDate && endDate) {
            dateFilter.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }
        else if (period) {
            const { start, end } = getDateRange(period);
            dateFilter.createdAt = { $gte: start, $lte: end };
        }
        const totalCards = yield Card.countDocuments(dateFilter);
        res.json({ totalCards });
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching cards count" });
    }
}));
/**
 * @route GET /stats/subscriptions/trend
 * @desc Get subscriptions trend for graphs
 */
router.get("/subscriptions/trend", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { period, startDate, endDate } = req.query;
        let dateFilter = {};
        if (startDate && endDate) {
            dateFilter.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }
        else if (period) {
            const { start, end } = getDateRange(period);
            dateFilter.createdAt = { $gte: start, $lte: end };
        }
        const trend = yield Subscription.aggregate([
            { $match: dateFilter },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);
        res.json({ trend });
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching subscriptions trend" });
    }
}));
export default router;
//# sourceMappingURL=stats.controller.js.map