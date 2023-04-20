import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, trim: true, required: true },
  password: { type: String, trim: true, required: true },
  password2: { type: String, trim: true, required: true },
  name: { type: String, trim: true, required: true },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  location: { type: String, trim: true, required: true },
  playlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
  isMaster: { type: Boolean, default: false },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  currentPlaying: {
    song: { type: mongoose.Schema.Types.ObjectId ,ref: "Song"},
    currentTime: { type: Number, default: 0 },
    currentVolume: { type: Number, default: 0.5 },
  },
});

const User = mongoose.model("User", userSchema);

export default User;
