import express from "express";
import { registerView } from "../controllers/songController";
import { addPlaylist } from "../controllers/userController";

const apiRouter = express.Router();

apiRouter.post("/music/:id([0-9a-f]{24})/view", registerView);

apiRouter.post("/music/:id([0-9a-f]{24})/playlist", addPlaylist);

export default apiRouter;
