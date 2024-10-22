import express from "express";
import { comments } from "../controllers/commentController.js";

const commentRouter = express.Router();

// @desc Get all comments
// @route GET /comments/

commentRouter.get("/", comments.all);

// @desc Get all comments
// @route GET /comments/paginated/

commentRouter.get("/paginated/", comments.allPaginated);

export { commentRouter };
