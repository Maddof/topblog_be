import { getAllPublishedPosts } from "../db/postsQueries.js";
import { createSinglePost } from "../db/postsQueries.js";

const allPublishedPosts = async (req, res, next) => {
  try {
    const allPosts = await getAllPublishedPosts();
    res.json({
      posts: allPosts,
    });
  } catch (error) {
    return next(error);
  }
};

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Create the post using Prisma
    const newPost = await createSinglePost(title, content, false);

    res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { allPublishedPosts, createPost };
