var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { donationQueueName, jobOptions, redisConnection } from "../../config/queue.js";
import { Queue, Worker } from "bullmq";
import logger from "../../config/logger.js";
import { redis } from "../../index.js";
import donationWebhook from "../webhook/donation.webhook.js";
export const donationQueue = new Queue(donationQueueName, {
    connection: redisConnection,
    defaultJobOptions: jobOptions
});
export const addDonationToQueue = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield redis.xlen("bull:donation-queue:events");
    if (result > 0) {
        yield redis.del("bull:donation-queue:events");
    }
    const id = yield redis.get("bull:donation-queue:id");
    if (id !== null && Number(id) > 99) {
        yield redis.set("bull:donation-queue:id", "0");
    }
    yield donationQueue.add("Donation Queue", data);
});
const worker = new Worker(donationQueueName, (job) => __awaiter(void 0, void 0, void 0, function* () {
    yield donationWebhook(job.data);
}), { connection: redisConnection });
worker.on('completed', (job) => {
    console.log(`Job ${job.id} has completed!`);
    logger.info(`Job ${job.id} has completed!`);
});
worker.on("failed", (job, err, prev) => __awaiter(void 0, void 0, void 0, function* () {
    if (!job) {
        console.log(`A job has failed but job details are missing.`);
        logger.error(`A job has failed but job details are missing.`);
        return;
    }
    console.log(`Job ${job.id} has failed with ${err.message}`);
    logger.error(`Job ${job.id} has failed with ${err.message}`);
}));
//# sourceMappingURL=donation.queue.js.map