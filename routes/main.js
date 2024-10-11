import express from "express";
import { index } from "../controllers/index.js";
import { verifyToken } from "../middleware/verifyAndRefreshToken.js";

const navRouter = express.Router();

// @desc Welcome message
// @route GET /
navRouter.get("/", verifyToken, index);

export { navRouter };
