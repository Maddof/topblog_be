import prisma from "./prismaClient.js";

const getAllPublishedPosts = async () => {
  try {
    const allPosts = await prisma.post.findMany({
      where: {
        published: true,
      },
    });
    return allPosts;
  } catch (error) {
    console.error("Error getting all posts", error);
  }
};

const createSinglePost = async (title, content, pubStatus) => {
  try {
    const createPost = await prisma.create({
      data: {
        title,
        content,
        published: pubStatus,
      },
    });
  } catch (error) {
    console.error("Error getting creating post", error);
  }
};

export { getAllPublishedPosts, createSinglePost };
