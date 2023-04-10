import { async } from "regenerator-runtime";
import User from "../models/User";
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
  return res.redirect("/");
};

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "회원 가입" });
};

export const postJoin = async (req, res) => {
  const {
    body: { username, password, password2, name, birth, email, location },
  } = req;
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
