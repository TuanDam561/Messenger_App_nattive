import express from "express";
import authRouter from "../routers/authRouter";

const app = express();
app.use("/auth", authRouter);
export default app;
