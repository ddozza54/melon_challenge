import Song from "../models/Song";
import User from "../models/User";

export const home = async (req, res) => {
  return res.render("home", { pageTitle: "Home" });
};

export const musicHome = async (req, res) => {
  return res.render("musicHome", { pageTitle: "musicHome" });
};

export const getMusicUpload = async (req, res) => {
  return res.render("musicUpload", { pageTitle: "musicUpload" });
};

export const postMusicUpload = async (req, res) => {
  const { title, artist, description } = req.body;

  const music = new Song({
    title,
    artist,
    description,
    createAt: Date.now(),
    meta: {
      views: 0,
      rating: 0,
    },
  });

  console.log(music);
  // try {
  //   await Song.create({
  //     title,
  //     description,
  //   });
  //   return res.direct("/");
  // } catch {
  //   return res
  //     .status(400)
  //     .render("musicUpload", {
  //       pageTitle: "musicUpload",
  //       errorMessage: error._message,
  //     });
  // }
  return res.redirect("/music");
};

export const play = async (req, res) => {
  return res.send("music playing");
  // return res.render("customPlaylist", { pageTitle: "customPlaylist" });
};

export const customPlaylist = async (req, res) => {
  return res.render("customPlaylist", { pageTitle: "customPlaylist" });
};
