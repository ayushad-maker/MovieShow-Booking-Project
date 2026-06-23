import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import "dotenv/config";

import { serve } from "inngest/express";
import { inngest, functions } from "./ingest/index.js"
import showRouter from "./Routes/showRoutes.js";
import BoookingRouter from "./Routes/bookingRoutes.js";
import AdminRoutes from "./Routes/adminRoutes.js";
import UserRouter from "./Routes/userRoutes.js";
import { connectDB } from "./configs/db.js";

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
app.use("/api/show",showRouter);
app.use("/api/booking",BoookingRouter);
app.use("/api/admin",AdminRoutes);
app.use("/api/user",UserRouter);

app.listen(port, () => {
  console.log(`server is running on port ${port}.`);
});
