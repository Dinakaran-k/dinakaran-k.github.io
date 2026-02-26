import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    headline: { type: String, required: true },
    location: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    linkedin: { type: String, required: true },
    githubUsername: { type: String, required: true },
    summary: { type: String, required: true },
    education: [
      {
        institution: String,
        degree: String,
        score: String,
        startDate: String,
        endDate: String
      }
    ],
    experiences: [
      {
        role: String,
        company: String,
        startDate: String,
        endDate: String,
        achievements: [String]
      }
    ],
    skills: {
      type: Map,
      of: [String],
      default: {}
    },
    openToWork: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
