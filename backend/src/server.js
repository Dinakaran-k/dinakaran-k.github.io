import "dotenv/config";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { connectDb } from "./config/db.js";
import apiRoutes from "./routes/api.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: process.env.FRONTEND_ORIGIN?.split(",") || "*" }));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", apiRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

async function start() {
  await connectDb();
  app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`);
  });
}

start().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
