require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// CORS (basic - adjust for production)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// API Keys from environment variables
const API_KEYS = {
  key1: process.env.API_KEY1,
  key2: process.env.API_KEY2,
  key3: process.env.API_KEY3,
};

const VALID_PASSWORD = process.env.PASSWORD;

// Authentication endpoint
app.post("/api/authenticate", (req, res) => {
  const { password } = req.body;

  if (password === VALID_PASSWORD) {
    res.json({
      success: true,
      apiKeys: API_KEYS,
    });
  } else {
    res.status(401).json({
      success: false,
      error: "Invalid password",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
