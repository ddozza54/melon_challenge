import express from "express";
import { registerView } from "../controllers/songController";

const apiRouter = express.Router();

apiRouter.post("/music/:id([0-9a-f]{24}/view", registerView);

export default apiRouter;
