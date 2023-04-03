import Song from "../models/Song";
import User from "../models/User";

export const home = async (req, res) => {
  return res.render("home", { pageTitle: "Home" });
};

export const musicHome = async (req, res) => {
  const songs = await Song.find({});
  return res.render("musicHome", { pageTitle: "musicHome", songs });
};

export const getMusicUpload = async (req, res) => {
  return res.render("musicUpload", { pageTitle: "musicUpload" });
};

export const postMusicUpload = async (req, res) => {
  const {
    body: { title, artist, description },
  } = req;
  const imgfileObj = req.files.imgfile;
  const imgpath = imgfileObj.map((v) => v.path)[0];
  const song = new Song({
    title,
    imgpath,
    artist,
    description,
    createAt: Date.now(),
    meta: {
      views: 0,
      rating: 0,
    },
  });

  await song.save();

  console.log(imgpath);

  return res.redirect("/music");
};

export const play = async (req, res) => {
  return res.send("music playing");
  // return res.render("customPlaylist", { pageTitle: "customPlaylist" });
};

export const customPlaylist = async (req, res) => {
  return res.render("customPlaylist", { pageTitle: "customPlaylist" });
};
