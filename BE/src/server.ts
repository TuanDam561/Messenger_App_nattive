import express from "express";
import dotenv from "dotenv";
import { prisma } from "./configs/prisma";
import userRouter from "./routers/userRouter";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api", userRouter);
const PORT = Number(process.env.PORT) || 3000;

// middleware
app.use(express.json());

// start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
