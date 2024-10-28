import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import { navRouter } from "./routes/main.js";
import { postRouter } from "./routes/posts.js";
import { commentRouter } from "./routes/comments.js";
import { authRouter } from "./routes/auth.js";
import { errorHandler } from "./middleware/errorHandler.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

// Get directory & file names using ES module compatible methods

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect//Express middleware to enable cors
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:4173",
      "https://topblogfe.netlify.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// BODY PARSER MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use(cookieParser());
app.use(navRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);
app.use("/auth", authRouter); // Add auth routes

// ERROR HANDLING

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
