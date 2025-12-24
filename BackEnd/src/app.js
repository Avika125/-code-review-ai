const express = require("express");
const aiRoutes = require("./routes/ai.routes");
const cors = require("cors");

const app = express();

/**
 * CORS – allow localhost + Netlify
 */
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://review-code-ai.netlify.app",
];

// Manual CORS headers (including OPTIONS)
app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,OPTIONS,PUT,PATCH,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  res.header("Access-Control-Allow-Credentials", "true");

  // Preflight request ko yahin khatam kar do
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

// (optional) standard cors middleware
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/ai", aiRoutes);

module.exports = app;
