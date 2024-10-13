import {
  getAllPublishedPosts,
  getAllPosts,
  createSinglePost,
  updateSinglePost,
} from "../db/postsQueries.js";

const posts = {
  // Method to get all posts from the database
  all: async (req, res, next) => {
    try {
      const allPosts = await getAllPosts();
      res.json({
        posts: allPosts,
      });
    } catch (error) {
      return next(error);
    }
  },

  // Method to get all published posts
  allPublished: async (req, res, next) => {
    try {
      const allPosts = await getAllPublishedPosts();
      res.json({
        posts: allPosts,
      });
    } catch (error) {
      return next(error);
    }
  },

  // Method to create a post
  create: async (req, res) => {
    try {
      const { title, content, published = false } = req.body;
      console.log(req.user);
      const authorId = req.user.userId;

      // Create the post using Prisma
      const newPost = await createSinglePost(
        title,
        content,
        published,
        authorId
      );

      res.status(201).json({
        message: "Post created successfully",
        post: newPost,
      });
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  update: async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { title, content, published = false } = req.body;
      const updatedPost = await updateSinglePost(
        postId,
        title,
        content,
        published
      );
      res.status(201).json({
        message: "Post updated successfully",
        post: updatedPost,
      });
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

export { posts };
