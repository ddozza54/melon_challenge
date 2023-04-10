import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "한사랑 뮤직앱";
  res.locals.loggedInUser = req.session.user || {};
  next();
};

export const uploadFiles = multer({ dest: "uploads/" });
