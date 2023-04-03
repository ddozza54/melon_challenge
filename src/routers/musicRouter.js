import express from "express";
import {
  play,
  customPlaylist,
  getMusicUpload,
  postMusicUpload,
} from "../controllers/songController";
import { uploadFiles } from "../middlewares";

const musicRouter = express.Router();

musicRouter.get("/:id/play", play);
musicRouter.get("/playlist", customPlaylist);
musicRouter.route("/upload").get(getMusicUpload).post(
  // uploadFiles.fields([{ imgfile: "imgfile" }, { songfile: "songfile" }]),
  uploadFiles.single("imgfile"),
  postMusicUpload
);

export default musicRouter;
