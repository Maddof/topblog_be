import express from "express";
import { index } from "../controllers/index.js";

const navRouter = express.Router();

navRouter.get("/", index);

export { navRouter };
