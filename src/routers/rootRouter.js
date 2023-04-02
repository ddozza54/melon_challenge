import express from "express";
import {
  home,
  musicHome,
  getMusicUpload,
  postMusicUpload,
} from "../controllers/songController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/music", musicHome);

// rootRouter.get("/login", login);
// rootRouter.get("/join", join);

export default rootRouter;
