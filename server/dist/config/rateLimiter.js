import { rateLimit } from 'express-rate-limit';
const limiterOptions = {
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
};
const limiter = rateLimit(limiterOptions);
export default limiter;
//# sourceMappingURL=rateLimiter.js.map