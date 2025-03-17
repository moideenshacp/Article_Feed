import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
    },
    category: {
      type: String,
    },
    content: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    tags: {
      type: String,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Article", articleSchema);
