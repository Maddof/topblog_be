import prisma from "./prismaClient.js";

const createSingleComment = async (content, gName, gEmail, postId) => {
  try {
    const newComment = await prisma.comment.create({
      data: {
        content: content,
        guestName: gName,
        guestEmail: gEmail,
        post: {
          connect: { id: parseInt(postId) },
        },
      },
    });
    return newComment;
  } catch (error) {
    console.error("Error creating comment", error);
    throw error;
  }
};

export { createSingleComment };
