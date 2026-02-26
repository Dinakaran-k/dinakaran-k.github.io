import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    published: { type: Boolean, default: true },
    tags: [String]
  },
  { timestamps: true }
);

export default mongoose.model("BlogPost", blogPostSchema);
