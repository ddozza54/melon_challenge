import { async } from "regenerator-runtime";
import User from "../models/User";
import Song from "../models/Song";
import { playlist } from "./songController";
const siteName = "HanSaRang Music";

export const getLogin = (req, res) => {
  return res.render("login", { pageTitle: "로그인" });
};

export const postLogin = async (req, res) => {
  const pageTitle = "로그인";
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "일치하는 회원 정보가 없습니다.",
    });
  }
  if (password !== user.password) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "비밀번호가 일치하지 않습니다.",
    });
  }

  req.session.loggedIn = true;
  req.session.user = user;
  req.session.playlist = user.playlist;

  return res.redirect("/");
};

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "회원 가입" });
};

export const postJoin = async (req, res) => {
  const pageTitle = "회원 가입";
  const {
    body: { username, password, password2, name, email, location },
  } = req;
  const exsist = await User.exists({ username });
  if (exsist) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "이미 존재하는 아이디 입니다.",
    });
  } else {
    if (password !== password2) {
      return res.status(400).render("join", {
        pageTitle,
        errorMessage: "비밀번호가 일치하지 않습니다.",
      });
    }
    await User.create({
      username,
      password,
      password2,
      name,
      email,
      location,
      playlist: [],
    });
    return res.redirect("/login");
  }
};

export const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};

export const community = (req, res) => {
  return res.render("community", { pageTitle: "방명록" });
};

export const addPlaylist = async (req, res) => {
  const pageTitle = "플레이리스트";
  const {
    session: { user: _id },
  } = req;
  const { songId } = req.body;
  let newPlaylist = [];
  if (req.session.loggedIn) {
    const user = await User.findById(_id);
    if (!user.playlist.includes(songId)) {
      newPlaylist = [...user.playlist, songId];
      console.log("add!!", newPlaylist);
      req.session.playlist = newPlaylist;
      res.locals.playlist = newPlaylist;
    } else {
      newPlaylist = user.playlist.filter((v) => v._id != songId);
      console.log("remove!!", newPlaylist);
      req.session.playlist = newPlaylist;
      res.locals.playlist = newPlaylist;
    }
    await User.findByIdAndUpdate(_id, {
      playlist: newPlaylist,
    });
    return res.end();
  } else {
    return res.status(400).render("home", {
      pageTitle,
      errorMessage: "노래 찜하기는 로그인 후 이용해주십시오.",
    });
  }
};
