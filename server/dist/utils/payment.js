var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Subscription from "../models/payment/subscription.model.js";
import Transaction, { TransactionEnum } from "../models/payment/transaction.model.js";
export const handleDonation = (paymentData) => __awaiter(void 0, void 0, void 0, function* () {
    const { order_id, status, id, method, card, bank, wallet, vpa, acquirer_data, error_code, error_description, error_source, error_step, error_reason } = paymentData;
    yield Transaction.findOneAndUpdate({ razorpayOrderId: order_id }, {
        status,
        razorpayPaymentId: id,
        error: {
            error_code: error_code || undefined,
            error_description: error_description || undefined,
            error_source: error_source || undefined,
            error_step: error_step || undefined,
            error_reason: error_reason || undefined
        },
        paymentMethod: {
            methodType: method,
            cardInfo: card ? {
                cardType: card.type,
                issuer: card.issuer,
                last4: card.last4,
                name: card.name,
                network: card.network,
            } : undefined,
            bankInfo: bank || undefined,
            walletInfo: wallet || undefined,
            upiInfo: vpa || undefined,
            data: acquirer_data || undefined,
        }
    }, { new: true, runValidators: true, useFindAndModify: false });
});
export const handleTransaction = (paymentData, subscriptionData, subscription) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, order_id, status, id, method, card, bank, wallet, vpa, acquirer_data, error_code, error_description, error_source, error_step, error_reason } = paymentData;
    const { current_end, current_start } = subscriptionData;
    yield Transaction.create({
        transactionFor: subscription.subscriptionType,
        transactionType: TransactionEnum.RECURRING,
        donator: subscription.donator || undefined,
        user: subscription.user || undefined,
        amount: typeof amount === "string" ? parseInt(amount, 10) / 100 : (amount !== null && amount !== void 0 ? amount : 0) / 100, // ✅ Fixed Type Error
        start: (current_start !== null && current_start !== void 0 ? current_start : 0) * 1000,
        end: (current_end !== null && current_end !== void 0 ? current_end : 0) * 1000,
        status,
        razorpayOrderId: order_id,
        razorpayPaymentId: id,
        error: {
            error_code: error_code || undefined,
            error_description: error_description || undefined,
            error_source: error_source || undefined,
            error_step: error_step || undefined,
            error_reason: error_reason || undefined
        },
        paymentMethod: {
            methodType: method,
            cardInfo: card ? {
                cardType: card.type,
                issuer: card.issuer,
                last4: card.last4,
                name: card.name,
                network: card.network,
            } : undefined,
            bankInfo: bank || undefined,
            walletInfo: wallet || undefined,
            upiInfo: vpa || undefined,
            data: acquirer_data || undefined,
        },
    });
});
export const handleSubscription = (subscriptionData, subscription) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, start_at, end_at, charge_at, total_count, paid_count, remaining_count, status, current_start, current_end } = subscriptionData;
    yield Subscription.findOneAndUpdate({ razorSubscriptionId: id }, {
        start: start_at * 1000,
        end: end_at * 1000,
        nextBilling: charge_at * 1000,
        currentStart: (current_start !== null && current_start !== void 0 ? current_start : 0) * 1000,
        currentEnd: (current_end !== null && current_end !== void 0 ? current_end : 0) * 1000,
        totalCount: total_count,
        paidCount: paid_count,
        remainingCount: remaining_count,
        status: ["completed", "cancelled"].includes((subscription === null || subscription === void 0 ? void 0 : subscription.status) || '') ? subscription === null || subscription === void 0 ? void 0 : subscription.status : status,
    }, { new: true, runValidators: true, useFindAndModify: false });
});
//# sourceMappingURL=payment.js.map