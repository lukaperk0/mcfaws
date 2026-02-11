import express from "express";
import mongoose from "mongoose"; // DODAJ TO
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import appRoutes from "./api/routes/app.js";
import { connectDB } from "./config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/app", appRoutes);

// Poveži se z MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("Minecraft info backend is running!");
});

const PORT = process.env.PORT || 50000; // SPREMENI TUDI TO (za Render)
const server = app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);

// Graceful shutdown
async function shutdown(signal) {
  console.log(`\n🔻 ${signal} prejet, zapiram...`);
  try {
    await mongoose.connection.close();
    console.log("🔒 MongoDB connection closed");
  } catch (e) {
    console.error("Napaka pri zapiranju Mongo povezave:", e.message);
  }
  server.close(() => {
    console.log("🛑 HTTP server closed");
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 5000);
}

["SIGINT", "SIGTERM"].forEach((sig) => process.on(sig, () => shutdown(sig)));
