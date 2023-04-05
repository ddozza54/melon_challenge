import { async } from "regenerator-runtime";
import Song from "../models/Song";
import User from "../models/User";
const siteName = "HanSaRang Music";

export const home = async (req, res) => {
  return res.render("home", { pageTitle: "Home", siteName });
};

export const musicHome = async (req, res) => {
  const songs = await Song.find({}).sort({ views: "desc" });
  return res.render("musicHome", { pageTitle: "musicHome", songs, siteName });
};

export const getMusicUpload = async (req, res) => {
  return res.render("musicUpload", { pageTitle: "musicUpload", siteName });
};

export const postMusicUpload = async (req, res) => {
  const {
    body: { title, artist, description },
  } = req;
  const imgfileObj = req.files.imgfile;
  const imgpath = imgfileObj.map((v) => v.path)[0];
  const songfileObj = req.files.songfile;
  const songpath = songfileObj.map((v) => v.path)[0];

  const song = new Song({
    title,
    imgpath,
    songpath,
    artist,
    description,
    createAt: Date.now(),
    meta: {
      views: 0,
      rating: 0,
    },
  });

  await song.save();

  return res.redirect("/music");
};

export const play = async (req, res) => {
  const { id } = req.params;
  const song = await Song.findById(id);
  if (!song) {
    return res.status(404).render("404", { pageTitle: "Song is not Found." });
  }

  return res.render("musicPlayer", { pageTitle: song.title, song });
};

export const playlist = async (req, res) => {
  return res.render("playlist", {
    pageTitle: "Custom playlist",
    siteName,
  });
};

export const registerView = async (req, res) => {
  const { id } = req.params;
  const song = await Song.findById(id);

  if (!song) {
    return res.sendStatus(404);
  }
  song.views += 1;
  await song.save();
  return res.sendStatus(200);
};
