import "dotenv/config";
import express from "express";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running 🚀 at http://localhost:${PORT}`);
});
