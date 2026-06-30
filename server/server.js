import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import "dotenv/config";

import { serve } from "inngest/express";
import { inngest, functions } from "./ingest/index.js";
import showRouter from "./Routes/showRoutes.js";
import BoookingRouter from "./Routes/bookingRoutes.js";
import AdminRoutes from "./Routes/adminRoutes.js";
import UserRouter from "./Routes/userRoutes.js";
import { connectDB } from "./configs/db.js";
import { stripeWebhooks } from "./controller/stripeWebhooks.js";

const app = express();
const port = 3000;

await connectDB();

app.use(
  "/api/stripe",
  express.raw({ type: "application/json" }),
  stripeWebhooks,
);

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

app.get("/", (req, res) => {
  res.send("server is live");
});
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/show", showRouter);
app.use("/api/booking", BoookingRouter);
app.use("/api/admin", AdminRoutes);
app.use("/api/user", UserRouter);

app.listen(port, () => {
  console.log(`server is running on port ${port}.`);
});
