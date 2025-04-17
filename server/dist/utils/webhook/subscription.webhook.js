var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import logger from "../../config/logger.js";
import crypto from "crypto";
import Subscription from "../../models/payment/subscription.model.js";
import { handleSubscription, handleTransaction } from "../payment.js";
import User from "../../models/accounts/user.model.js";
import Transaction from "../../models/payment/transaction.model.js";
const subscriptionwebhook = (webhookData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const { header, dataSub } = webhookData;
    const { event, payload } = dataSub;
    const expectedSigntaure = crypto
        .createHmac("sha256", process.env.SUBSCRIPTION_WEBHOOK)
        .update(JSON.stringify(dataSub))
        .digest("hex");
    try {
        if (expectedSigntaure === header) {
            const subscription = yield Subscription.findOne({ razorSubscriptionId: (_b = (_a = payload.subscription) === null || _a === void 0 ? void 0 : _a.entity) === null || _b === void 0 ? void 0 : _b.id });
            if (!subscription) {
                console.log("Invalid Subscription, Wrong database");
                logger.error("Invalid Subscription, Wrong database");
            }
            else {
                yield handleSubscription((_c = payload.subscription) === null || _c === void 0 ? void 0 : _c.entity, subscription);
                const user = yield User.findOne({ activePlan: subscription._id });
                switch (event) {
                    case "subscription.charged":
                        const { method, card, bank, wallet, vpa, acquirer_data } = (_d = payload.payment) === null || _d === void 0 ? void 0 : _d.entity;
                        yield Subscription.findOneAndUpdate({ razorSubscriptionId: (_f = (_e = payload.subscription) === null || _e === void 0 ? void 0 : _e.entity) === null || _f === void 0 ? void 0 : _f.id }, {
                            paymentMethod: {
                                methodType: method,
                                cardInfo: card ? {
                                    cardType: card === null || card === void 0 ? void 0 : card.type,
                                    issuer: card === null || card === void 0 ? void 0 : card.issuer,
                                    last4: card === null || card === void 0 ? void 0 : card.last4,
                                    name: card === null || card === void 0 ? void 0 : card.name,
                                    network: card === null || card === void 0 ? void 0 : card.network,
                                } : undefined,
                                bankInfo: bank || undefined,
                                walletInfo: wallet || undefined,
                                upiInfo: vpa || undefined,
                                data: acquirer_data || undefined,
                            },
                        }, { new: true, runValidators: true, useFindAndModify: false });
                        const checkPayment = yield Transaction.findOne({ razorpayPaymentId: (_h = (_g = payload.payment) === null || _g === void 0 ? void 0 : _g.entity) === null || _h === void 0 ? void 0 : _h.id });
                        if (!checkPayment) {
                            yield handleTransaction((_j = payload.payment) === null || _j === void 0 ? void 0 : _j.entity, (_k = payload.subscription) === null || _k === void 0 ? void 0 : _k.entity, subscription);
                        }
                        break;
                    case "subscription.completed":
                        // disable short url and next billing
                        // extra should not be zero but substracted from the plan cards
                        if ((user === null || user === void 0 ? void 0 : user.access.cards.total.extra) !== 0) {
                            yield User.findOneAndUpdate({ "access.latestSubscription": subscription._id }, { "access.cards.total.extra": 0 }, { new: true, runValidators: true, useFindAndModify: false });
                        }
                        break;
                    case "subscription.cancelled":
                        // disable short url and next billing
                        // extra should not be zero but substracted from the plan cards
                        if ((user === null || user === void 0 ? void 0 : user.access.cards.total.extra) !== 0 && subscription.currentEnd <= new Date(Date.now())) {
                            yield User.findOneAndUpdate({ "access.latestSubscription": subscription._id }, { "access.cards.total.extra": 0 }, { new: true, runValidators: true, useFindAndModify: false });
                        }
                        break;
                    default:
                        console.log(event);
                        break;
                }
            }
        }
    }
    catch (error) {
        logger.error(error.message);
    }
});
export default subscriptionwebhook;
//# sourceMappingURL=subscription.webhook.js.map