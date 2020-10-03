const {RateLimiterMemory} = require("rate-limiter-flexible");

const rateLimiter = new RateLimiterMemory({
    points: 500,
    duration: 60*60,
});

const rateLimiterMiddleware = (req, res, next) => {
    rateLimiter.consume(req.ip)
        .then(() => {
            next();
        })
        .catch(() => {
            res.status(429).send('Slow down! You did too many requests.');
        });
}

module.exports = rateLimiterMiddleware;