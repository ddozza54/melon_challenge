import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "한사랑 뮤직앱";
  res.locals.loggedInUser = req.session.user || {};
  res.locals.nowPlayingSong = req.session.nowPlayingSong || {};
  res.locals.nowPlayingTime = req.session.nowPlayingTime || 0;
  res.locals.playlist = req.session.playlist || [];
  res.locals.isMaster = req.session.isMaster || false;
  next();
};

export const uploadFiles = multer({ dest: "uploads/" });
