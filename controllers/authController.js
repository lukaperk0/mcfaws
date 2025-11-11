import User from "../models/User.js";

const MAX_USERS = 100; // lahko prilagodiš

export async function register(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Vsa polja so obvezna!" });
    }

    const userCount = await User.countDocuments();
    if (userCount >= MAX_USERS) {
      return res.status(403).json({ error: "Doseženo maksimalno število uporabnikov!" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Uporabnik že obstaja" });
    }

    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: "Uporabnik uspešno registriran!" });
  } catch (err) {
    console.error("Napaka v register kontrolerju:", err);
    res.status(500).json({ error: "Napaka pri registraciji" });
  }
}