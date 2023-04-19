import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  owner: { type: String, trim: true, required: true, ref: "User" },
  ownerName: { type: String, trim: true, required: true },
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
