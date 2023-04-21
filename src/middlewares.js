import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const multerUploader = multerS3({
  s3: s3,
  bucket: "hansarang",
});

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "한사랑 뮤직앱";
  res.locals.loggedInUser = req.session.user || {};
  res.locals.nowPlayingSong = req.session.nowPlayingSong || {};
  res.locals.playlist = req.session.playlist || [];
  res.locals.isMaster = req.session.isMaster || false;
  next();
};

export const uploadFiles = multer({
  dest: "uploads/",
  storage: multerUploader,
});
