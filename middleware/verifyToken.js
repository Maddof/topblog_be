import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify the JWT token
const verifyToken = (req, res, next) => {
  // Get the token from the Authorization header (usually in the format: Bearer <token>)
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ error: "No token provided" });
  }

  // Verify the token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Failed to authenticate token" });
    }

    // If the token is valid, attach the decoded payload (user data) to the request
    req.user = decoded;
    next();
  });
};

export { verifyToken };
