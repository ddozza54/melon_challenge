import express from "express";
import { home } from "../controllers/songController";
import { login, join } from "../controllers/userController";
const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/login", login);
rootRouter.get("/join", join);

export default rootRouter;
