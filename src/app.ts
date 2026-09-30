import express, { Application } from "express";
import cors from "cors";
import mealRoutes from "../src/routes/Mealroute";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api/meals", mealRoutes);

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", service: "catalog-service" });
});

export default app;