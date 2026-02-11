import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

dotenv.config();
app.use(cors({ origin: "*" }));
app.use(express.json());

let users = [
  {
    id: 1,
    firstName: "Alice",
    lastName: "Johnson",
    dateOfBirth: "1995-06-15",
    email: "alice@example.com",
  },
  {
    id: 2,
    firstName: "Bob",
    lastName: "Smith",
    dateOfBirth: "1992-09-20",
    email: "bob@example.com",
  },
];

app.get("/", (req, res) => {
  res.send("API Running");
});

// GET all users
app.get("/users", (req, res) => {
  res.json(users);
});

// GET single user
app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

// CREATE user
app.post("/users", (req, res) => {
  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    ...req.body,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// UPDATE user
app.put("/users/:id", (req, res) => {
  const index = users.findIndex(u => u.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: "User not found" });

  users[index] = { ...users[index], ...req.body };
  res.json(users[index]);
});

// DELETE user
app.delete("/users/:id", (req, res) => {
  users = users.filter(u => u.id != req.params.id);
  res.json({ message: "User deleted" });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
