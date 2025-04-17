var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jobOptions, redisConnection, subscriptionQueueName } from "../../config/queue.js";
import { Queue, Worker } from "bullmq";
import logger from "../../config/logger.js";
import { redis } from "../../index.js";
import subscriptionwebhook from "../webhook/subscription.webhook.js";
export const subscriptionQueue = new Queue(subscriptionQueueName, {
    connection: redisConnection,
    defaultJobOptions: jobOptions
});
export const addSubscriptionToQueue = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield redis.xlen("bull:subscription-queue:events");
    if (result > 0) {
        yield redis.del("bull:subscription-queue:events");
    }
    const id = yield redis.get("bull:subscription-queue:id");
    if (id !== null && Number(id) > 99) {
        yield redis.set("bull:subscription-queue:id", "0");
    }
    yield subscriptionQueue.add("Subscription Queue", data);
});
const worker = new Worker(subscriptionQueueName, (job) => __awaiter(void 0, void 0, void 0, function* () {
    yield subscriptionwebhook(job.data);
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
//# sourceMappingURL=subscription.queue.js.map