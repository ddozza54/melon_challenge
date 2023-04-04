import express from "express";
import {
  play,
  customPlaylist,
  getMusicUpload,
  postMusicUpload,
} from "../controllers/songController";
import { uploadFiles } from "../middlewares";

const musicRouter = express.Router();

musicRouter.get("/:id([0-9a-f]{24})", play);
musicRouter.get("/playlist", customPlaylist);
musicRouter
  .route("/upload")
  .get(getMusicUpload)
  .post(
    uploadFiles.fields([{ name: "imgfile" }, { name: "songfile" }]),
    postMusicUpload
  );

export default musicRouter;
