import express from "express";
import getPort from "get-port";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
app.use(cors({ origin: "*" }));

dotenv.config();


app.use(express.json());

app.get("/", (req, res) => {
  res.send("JSON Server is running!");
});
app.get("/users", (req, res) => {
    res.json([
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" }
    ]);
});

const DEFAULT_PORT = process.env.PORT || 5000;

async function startServer() {
  const port = await getPort({ port: DEFAULT_PORT });
  app.listen(port, () => {
    console.log(`JSON Server running on port ${port}`);
  });
}

startServer();
