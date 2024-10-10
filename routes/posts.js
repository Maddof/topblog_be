import express from "express";
import { posts } from "../controllers/postController.js";
import {
  postValidationRules,
  validatePost,
} from "../validators/postValidator.js";

const postRouter = express.Router();

// @desc Get all posts
// @route GET /posts/
postRouter.get("/", posts.all);

// @desc Get all published posts
// @route GET /posts/public/
postRouter.get("/public/", posts.allPublished);

// @desc Create new post
// @route POST /posts/
postRouter.post("/", postValidationRules(), validatePost, posts.create);

// @desc Update a post
// @route PUT /posts/:postId
postRouter.put("/:postId", posts.update);

export { postRouter };
