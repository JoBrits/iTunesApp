const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// File System Module
const app = express();
const PORT = process.env.PORT || 3003;
const SECRET_KEY = process.env.JWT_SECRET;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Enable CORS for all origins and allow Content-Type header
app.use(cors({
  origin: "http://localhost:3000",  // Allow your frontend's origin (or "*" for all origins)
  methods: "GET,POST",  // Allow specific HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"],  // Allow specific headers
}));

// Middleware to authenticate requests
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });

    req.user = user;
    next();
  });
};

// Route to generate JWT
app.post("/login", (req, res) => {
  const { username } = req.body;

  if (!username) return res.status(400).json({ error: "Username is required" });

  const user = { name: username };
  const token = jwt.sign(user, SECRET_KEY);

  res.json({ token });
});

// Protected route example
app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.name}, this is protected data.` });
});

// Health check if server is running
app.get('/status', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Search route (now requires authentication)
app.get("/search", authenticateToken, async (req, res) => {
  const { term, media } = req.query;

  if (!term) {
    return res.status(400).send({ error: "Search term is required" });
  }

  try {
    const url = new URL("https://itunes.apple.com/search");
    url.searchParams.append("term", term);
    if (media && media !== "all") {
      url.searchParams.append("media", media);
    }
    const response = await fetch(url.toString());
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch data from iTunes API" });
  }
});

// Route to get track details by trackId
app.get("/track/:trackId", async (req, res) => {
  const { trackId } = req.params;

  try {
    const response = await fetch(
      `https://itunes.apple.com/lookup?id=${trackId}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch data from iTunes API" });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
