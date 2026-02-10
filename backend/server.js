import express from "express";
import getPort from "get-port";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
app.use(cors());          // Allow requests from other origins
dotenv.config();          // Load .env variables

app.use(express.json());   // Parse JSON request bodies

// Test route
app.get("/", (req, res) => {
  res.send("JSON Server is running!");
});

// Sample users endpoint
app.get("/users", (req, res) => {
    res.json([
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" }
    ]);
});

const DEFAULT_PORT = process.env.PORT || 5000;

// Dynamically pick a port if 5000 is busy
async function startServer() {
  const port = await getPort({ port: DEFAULT_PORT });
  app.listen(port, () => {
    console.log(`JSON Server running on port ${port}`);
  });
}

startServer();
