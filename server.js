import express from "express";
import pkg from "pg";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const { Pool } = pkg;

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// 🧱 Registracija
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2)",
      [email, hashed]
    );
    res.status(200).json({ message: "Registracija uspešna" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Napaka pri registraciji" });
  }
});

// 🔐 Prijava
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (result.rows.length === 0) return res.status(400).json({ error: "Uporabnik ne obstaja" });

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Napačno geslo" });

    res.status(200).json({ message: "Prijava uspešna" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Napaka pri prijavi" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server teče na portu ${PORT}`));
