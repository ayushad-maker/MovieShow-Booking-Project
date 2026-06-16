import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import "dotenv/config";
import connectDB from "./configs/db.js";
import { serve } from "inngest/express";
import { inngest, functions } from "./ingest/index.js"

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

await connectDB();

app.get("/", (req, res) => {
  res.send("server is live");
});
app.use("/api/inngest", serve({ client: inngest, functions }));
app.listen(port, () => {
  console.log(`server is running on port ${port}.`);
});
