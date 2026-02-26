import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    source: { type: String, enum: ["freelance", "github"], default: "freelance" },
    description: { type: String, required: true },
    technologies: [String],
    liveUrl: String,
    repoUrl: String,
    playStoreUrl: String,
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
