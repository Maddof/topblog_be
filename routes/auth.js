import express from "express";
import { login, logout, registerUser } from "../controllers/authController.js";
import {
  registerValidationRules,
  validateUser,
} from "../validators/userValidator.js";
import { refreshAccessToken } from "../middleware/verifyAndRefreshToken.js";
import { loginLimiter } from "../config/rateLimiter.js";

const authRouter = express.Router();

// @desc Create user
// @route POST /auth/register
authRouter.post(
  "/register",
  registerValidationRules(),
  validateUser,
  registerUser
);

// @desc Login and generates token, middleware to limit login attempts.
// @route POST /auth/login
authRouter.post("/login", loginLimiter, login); // ADD loginlimiter after testing

// @desc Logs out and clears cookie
// @route POST /auth/logout

authRouter.post("/logout", logout);

// @desc Refreshes access token
// @route POST /auth/refresh-token
authRouter.post("/refresh-token", refreshAccessToken);

export { authRouter };
