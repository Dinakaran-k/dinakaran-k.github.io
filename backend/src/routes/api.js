import { Router } from "express";
import { getPosts, getProfile, getProjects } from "../controllers/contentController.js";
import { sendContactMessage } from "../controllers/contactController.js";

const router = Router();

router.get("/health", (_req, res) => res.json({ status: "ok" }));
router.get("/profile", getProfile);
router.get("/projects", getProjects);
router.get("/posts", getPosts);
router.post("/contact", sendContactMessage);

export default router;
