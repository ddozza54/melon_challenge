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
musicRouter
  .route("/upload")
  .get(getMusicUpload)
  .post(
    // uploadFiles.single("imgfile"),
    uploadFiles.fields([{ name: "imgfile" }, { name: "songfile" }]),
    postMusicUpload
  );

export default musicRouter;
