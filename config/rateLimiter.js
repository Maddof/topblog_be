import rateLimit from "express-rate-limit";

const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: "Too many login attempts, please try again later.",
});

const postLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 1, // Limit each IP to 5 requests per windowMs
  message: "Too many post attempts, please try again later.",
});

export { loginLimiter, postLimiter };
