import prisma from "../config/prismaClient.js";

async function main() {
  // Create some users
  const user1 = await prisma.user.create({
    data: {
      username: "john_doe",
      email: "john@example.com",
      password: "securepassword", // Use bcrypt to hash this in real scenarios
      role: "USER",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: "jane_doe",
      email: "jane@example.com",
      password: "anotherpassword",
      role: "ADMIN",
    },
  });

  // Create some posts
  const post1 = await prisma.post.create({
    data: {
      title: "First Post",
      content: "This is my first post",
      published: true,
      publishedAt: new Date(),
      author: {
        connect: { id: user1.id },
      },
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: "Second Post",
      content: "This is my second post",
      published: false, // Unpublished post
      author: {
        connect: { id: user2.id },
      },
    },
  });

  // Create some comments
  await prisma.comment.create({
    data: {
      content: "Great post!",
      guestName: "Guest User",
      post: {
        connect: { id: post1.id },
      },
    },
  });

  await prisma.comment.create({
    data: {
      content: "Looking forward to more!",
      guestEmail: "guest@example.com",
      post: {
        connect: { id: post1.id },
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
