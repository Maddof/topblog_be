import express from "express";
import {
  allPublishedPosts,
  createPost,
} from "../controllers/postController.js";
import {
  postValidationRules,
  validatePost,
} from "../validators/postValidator.js";

const postRouter = express.Router();

// GET all public posts
postRouter.get("/", allPublishedPosts);

// POST a new post
postRouter.post("/", postValidationRules(), validatePost, createPost);

export { postRouter };
