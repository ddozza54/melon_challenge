import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  title: { type: String, trim: true, required: true },
  imgpath: { type: String, required: true },
  artist: { type: String, trim: true, required: true },
  description: { type: String, trim: true },
  createdAt: { type: Date, required: true, default: Date.now },
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
});

const Song = mongoose.model("Song", songSchema);

export default Song;
