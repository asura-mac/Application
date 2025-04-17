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
import Transaction from "../../models/payment/transaction.model.js";
import { handleDonation } from "../payment.js";
const donationWebhook = (webhookData) => __awaiter(void 0, void 0, void 0, function* () {
    const { header, dataPay } = webhookData;
    const expectedSigntaure = crypto
        .createHmac("sha256", process.env.DONATION_WEBHOOK)
        .update(JSON.stringify(dataPay))
        .digest("hex");
    try {
        if (expectedSigntaure === header) {
            const donation = yield Transaction.findOne({ razorpayOrderId: dataPay.payload.payment.entity.order_id });
            if (donation) {
                yield handleDonation(dataPay.payload.payment.entity);
            }
        }
    }
    catch (error) {
        logger.error(error.message);
    }
});
export default donationWebhook;
//# sourceMappingURL=donation.webhook.js.map