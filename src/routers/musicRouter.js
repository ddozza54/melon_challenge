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

// {
//   meta: { views: 0, rating: 0 },
//   _id: 642ac03abcd374269d556393,
//   title: 'Havana🇨🇺',
//   imgpath: 'uploads/ded7914c4c2f9801a1f75ce2177c1c9a',
//   songpath: 'uploads/c96035a67d57ecd206b4e95e374468ed',
//   artist: 'Camila cabello',
//   description: '한사랑 산악회 커버',
//   createdAt: 2023-04-03T12:02:02.690Z,
//   __v: 0
// }
