import express from "express";
import {
  play,
  customPlaylist,
  getMusicUpload,
  postMusicUpload,
} from "../controllers/songController";

const musicRouter = express.Router();

musicRouter.get("/:id/play", play);
musicRouter.get("/playlist", customPlaylist);
musicRouter.route("/upload").get(getMusicUpload).post(postMusicUpload);

export default musicRouter;
