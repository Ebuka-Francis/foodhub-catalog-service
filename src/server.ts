import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/Db";

const PORT = process.env.PORT || 5001;

const start = async (): Promise<void> => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Catalog service running on port ${PORT}`);
  });
};

start();