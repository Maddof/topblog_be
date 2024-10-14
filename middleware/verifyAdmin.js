// Middleware to check admin role
const verifyAdmin = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res
      .status(403)
      .json({ message: "Unauthorized. Admin access required." });
  }
  next();
};

export { verifyAdmin };
