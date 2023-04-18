import express from "express";
import {
  musicHome,
  play,
  playlist,
  getMusicUpload,
  postMusicUpload,
  getEditSong,
  postEditSong,
} from "../controllers/songController";
import { uploadFiles } from "../middlewares";

const musicRouter = express.Router();

musicRouter.get("/", musicHome);
musicRouter.get("/:id([0-9a-f]{24})", play);
musicRouter
  .route("/:id([0-9a-f]{24})/edit")
  .get(getEditSong)
  .post(postEditSong);
musicRouter.get("/playlist", playlist);
musicRouter
  .route("/upload")
  .get(getMusicUpload)
  .post(
    uploadFiles.fields([{ name: "imgfile" }, { name: "songfile" }]),
    postMusicUpload
  );

export default musicRouter;
