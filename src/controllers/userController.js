import User from "../models/User";
const siteName = "HanSaRang Music";

export const login = (req, res) => {
  return res.render("login", { pageTitle: "Login" });
};

export const join = (req, res) => {
  return res.render("join", { pageTitle: "Join" });
};
