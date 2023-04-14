import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, trim: true, required: true },
  password: { type: String, trim: true, required: true },
  password2: { type: String, trim: true, required: true },
  name: { type: String, trim: true, required: true },
  birth: {
    type: Date,
    trim: true,
    required: true,
    default: new Date(-60 * 60 * 24 * 365 * 1000 * 6),
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  location: { type: String, trim: true, required: true },
  playlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
});

const User = mongoose.model("User", userSchema);

export default User;
