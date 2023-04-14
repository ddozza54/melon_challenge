import { async } from "regenerator-runtime";
import User from "../models/User";
import Song from "../models/Song";
import { playlist } from "./songController";
const siteName = "HanSaRang Music";

export const getLogin = (req, res) => {
  return res.render("login", { pageTitle: "로그인" });
};

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle: "로그인",
      errorMessage: "일치하는 회원 정보가 없습니다.",
    });
  }
  if (password !== user.password) {
    return res.status(400).render("login", {
      pageTitle: "로그인",
      errorMessage: "비밀번호가 일치하지 않습니다.",
    });
  }

  req.session.loggedIn = true;
  req.session.user = user;

  return res.redirect("/");
};

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "회원 가입" });
};

export const postJoin = async (req, res) => {
  const {
    body: { username, password, password2, name, birth, email, location },
  } = req;
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "비밀번호가 일치하지 않습니다.",
    });
  }
  const user = new User({
    username,
    password,
    password2,
    name,
    birth,
    email,
    location,
    playlist: [],
  });

  await user.save();

  return res.redirect("/login");
};

export const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};

export const community = (req, res) => {
  return res.render("community", { pageTitle: "Community" });
};

export const addPlaylist = async (req, res) => {
  console.log(req.params);
  //   { id: '642ec5b4874c8b05ef88e8ba' }
  console.log(req.body);
  // { songId: '642ec5b4874c8b05ef88e8ba' }
  const {
    session: { user: _id },
  } = req;
  const { songId } = req.body;
  const user = await User.findById(_id);
  const newPlaylist = [...user.playlist, songId];

  await User.findByIdAndUpdate(_id, {
    playlist: newPlaylist,
  });

  return res.end();
};
