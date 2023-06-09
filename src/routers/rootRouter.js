import express from "express";
import { home } from "../controllers/songController";
import {
  logout,
  getLogin,
  postLogin,
  getJoin,
  postJoin,
  community,
} from "../controllers/userController";
const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/logout", logout);
rootRouter.get("/community", community);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.route("/join").get(getJoin).post(postJoin);

export default rootRouter;
