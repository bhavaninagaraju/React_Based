import jsonServer from "json-server";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

// --- Setup file paths ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbFile = path.join(__dirname, "db.json");

// --- Create server ---
const server = jsonServer.create();
const router = jsonServer.router(dbFile);
const middlewares = jsonServer.defaults();

// --- PORT for cloud hosting ---
const PORT = process.env.PORT || 3000;

// --- Enable CORS so frontend can access API ---
server.use(cors());
server.use(middlewares);
server.use(jsonServer.bodyParser);

// --- Optional: Log each request ---
server.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// --- Mount JSON-server router at /api ---
server.use("/api", router);

// --- Start server ---
server.listen(PORT, () => {
  console.log(`JSON Server running on port ${PORT}`);
});
