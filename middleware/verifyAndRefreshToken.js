import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY_15M || "15m";

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

// Middleware to refresh access token using refresh token
const refreshAccessToken = (req, res) => {
  // Get the refresh token from cookies
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(403).json({ error: "No refresh token provided" });
  }

  jwt.verify(refreshToken, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid refresh token" });

    // Generate new access token
    const newAccessToken = jwt.sign(
      { userId: user.userId, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: accessTokenExpiry }
    );

    res.status(200).json({
      accessToken: newAccessToken,
      role: user.role,
    });
  });
};

export { verifyToken, refreshAccessToken };
