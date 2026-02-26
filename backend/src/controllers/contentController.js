import BlogPost from "../models/BlogPost.js";
import Profile from "../models/Profile.js";
import Project from "../models/Project.js";
import { fetchGithubRepos } from "../services/github.js";

export async function getProfile(_req, res, next) {
  try {
    const profile = await Profile.findOne().lean();
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    return res.json(profile);
  } catch (err) {
    return next(err);
  }
}

export async function getProjects(req, res, next) {
  try {
    const includeGithub = req.query.includeGithub !== "false";
    const profile = await Profile.findOne().lean();

    const freelanceProjects = await Project.find().sort({ featured: -1, updatedAt: -1 }).lean();

    if (!includeGithub || !profile?.githubUsername) {
      return res.json({ freelanceProjects, githubProjects: [] });
    }

    let githubProjects = [];
    try {
      githubProjects = await fetchGithubRepos(profile.githubUsername);
    } catch (error) {
      console.warn("Failed to fetch GitHub projects", error.message);
    }

    return res.json({ freelanceProjects, githubProjects });
  } catch (err) {
    return next(err);
  }
}

export async function getPosts(_req, res, next) {
  try {
    const posts = await BlogPost.find({ published: true }).sort({ createdAt: -1 }).lean();
    return res.json(posts);
  } catch (err) {
    return next(err);
  }
}
