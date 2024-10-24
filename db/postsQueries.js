import prisma from "./prismaClient.js";

const PostService = {
  getAllPublishedPosts: async (page, limit) => {
    const skip = (page - 1) * limit;
    const take = limit;
    try {
      const allPosts = await prisma.post.findMany({
        skip,
        take,
        where: {
          published: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const totalPosts = await prisma.post.count({
        where: {
          published: true,
        },
      });

      return { allPosts, totalPosts };
    } catch (error) {
      console.error("Error getting all posts", error);
    }
  },

  getAllPosts: async (page, limit) => {
    const skip = (page - 1) * limit;
    const take = limit;
    try {
      const allPosts = await prisma.post.findMany({
        skip,
        take,
        orderBy: {
          createdAt: "desc",
        },
      });

      const totalPosts = await prisma.post.count();
      return { allPosts, totalPosts };
    } catch (error) {
      console.error("Could not get all posts", error);
    }
  },

  findUniquePost: async (postId) => {
    try {
      const post = await prisma.post.findUnique({
        where: { id: parseInt(postId) },
      });
      return post;
    } catch (error) {
      console.error("Error getting unique post", error);
      throw error;
    }
  },

  findPostAndCommentsByPostId: async (postId) => {
    try {
      const post = await prisma.post.findUnique({
        where: { id: postId },
        include: {
          author: {
            select: {
              username: true,
              email: true,
            },
          },
          comments: {
            orderBy: {
              createdAt: "desc",
            },
            select: {
              id: true,
              content: true,
              createdAt: true,
              guestName: true,
              guestEmail: true,
            },
          },
        },
      });
      return post;
    } catch (error) {
      console.error("Error fetching post, author, and comments", error);
      throw error;
    }
  },

  createSinglePost: async (title, content, pubStatus, authorId) => {
    try {
      const newPost = await prisma.post.create({
        data: {
          title,
          content,
          published: pubStatus,
          publishedAt: pubStatus ? new Date() : null,
          author: {
            connect: { id: authorId },
          },
        },
      });
      return newPost;
    } catch (error) {
      console.error("Error creating post", error);
      throw error;
    }
  },

  updateSinglePost: async (id, title, content, published) => {
    try {
      const updatedPost = await prisma.post.update({
        where: {
          id: parseInt(id),
        },
        data: {
          title,
          content,
          published,
          publishedAt: published ? new Date() : null,
        },
      });
      return updatedPost;
    } catch (error) {
      console.error("Error updating post", error);
      throw error;
    }
  },

  deleteSinglePost: async (postId) => {
    try {
      const existingPost = await prisma.post.findFirst({
        where: { id: postId },
      });

      if (!existingPost) {
        return null;
      }

      await prisma.post.delete({
        where: { id: existingPost.id },
      });

      return existingPost;
    } catch (error) {
      console.error("Error deleting post", error);
      throw error;
    }
  },
};

export default PostService;
