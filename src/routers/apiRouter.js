import express from "express";
import { registerView, receiveCurrentPlaying ,reqNextSong} from "../controllers/songController";
import { addPlaylist, addComment } from "../controllers/userController";

const apiRouter = express.Router();

apiRouter.post("/music/:id([0-9a-f]{24})/view", registerView);

apiRouter.post("/music/:id([0-9a-f]{24})/playlist", addPlaylist);
apiRouter.post("/music/:id([0-9a-f]{24})/nowPlaying", receiveCurrentPlaying)
// apiRouter.post("/music/:id([0-9a-f]{24})/audioFinished", reqNextSong)

apiRouter.post("/community/comment", addComment);
export default apiRouter;
