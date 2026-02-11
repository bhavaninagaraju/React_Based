import express from "express";

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
      { id: 1,
        firstName: "Alice",
        lastName: "Johnson",
        dateOfBirth: "1995-06-15",
        email: "alice@example.com" },
      { id: 2,
        firstName: "Bob",
        lastName: "Smith",
        dateOfBirth: "1992-09-20",
        email: "bob@example.com" }
    ]);
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


startServer();
