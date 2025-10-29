import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Registracija
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Vsa polja so obvezna!" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Uporabnik že obstaja" });
    }

    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: "Uporabnik uspešno registriran!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Napaka pri registraciji" });
  }
});

export default router;
