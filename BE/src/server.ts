import express from "express";
import dotenv from "dotenv";
import routerMiddlewares from "./middlewares/routerMiddlewares";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = Number(process.env.PORT) || 3000;

// middleware
app.use(express.json());
// use router middlewares
app.use("/api", routerMiddlewares);
// use error handler middleware
app.use(errorHandler);

// start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
