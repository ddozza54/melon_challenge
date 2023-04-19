import { async } from "regenerator-runtime";
import Song from "../models/Song";
import User from "../models/User";
import session from "express-session";
const siteName = "HanSaRang Music";

export const home = async (req, res) => {
  return res.render("home", { pageTitle: "Home", siteName });
};

export const musicHome = async (req, res) => {
  const songs = await Song.find({}).sort({ views: "desc" });
  return res.render("musicHome", { pageTitle: "모든 노래", songs, siteName });
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
  req.session.nowPlayingSong = song;
  res.locals.nowPlayingSong = song;
  return res.render("musicPlayer", { pageTitle: song.title, song });
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

export const playlist = async (req, res) => {
  const pageTitle = "찜한 노래 목록";
  if (!req.session.loggedIn) {
    return res.render("playlist", {
      pageTitle,
    });
  } else {
    const {
      session: {
        user: { _id },
      },
    } = req;
    const user = await User.findById(_id);
    const playlist = user.playlist;
    const songs = [];
    for (let i = 0; i < playlist.length; i++) {
      let song = await Song.findById(playlist[i]).exec();
      songs.push(song);
    }
    return res.render("playlist", {
      pageTitle,
      siteName,
      songs,
    });
  }
};

export const getEditSong = async (req, res) => {
  const { id } = req.params;
  const song = await Song.findById(id);
  if (!song) {
    return res.status(404).render("404", { pageTitle: "Edit" });
  }
  return res.render("editSong", { pageTitle: "Edit" });
};
export const postEditSong = async (req, res) => {
  const { id } = req.params;
  const { title, artist, description, lyrics } = req.body;
  const song = await Song.exists({ _id: id });
  if (!song) {
    return res.render("404", { pageTitle: "Song is not Found." });
  }
  await Song.findByIdAndUpdate(id, {
    title,
    artist,
    description,
    lyrics,
  });

  return res.redirect(`/music/${id}`);
};

export const notPlaying = (req, res) =>
  res.render("notPlaying");
