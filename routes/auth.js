import express from "express";
import { login, registerUser } from "../controllers/authController.js";
import {
  registerValidationRules,
  validateUser,
} from "../validators/userValidator.js";

const authRouter = express.Router();

// @desc Create user
// @route POST /auth/register
authRouter.post(
  "/register",
  registerValidationRules(),
  validateUser,
  registerUser
);

// @desc Login and generates token
// @route POST /auth/login
authRouter.post("/login", login);

export { authRouter };
