import User from "../models/User.js";

const MAX_USERS = 100; // lahko prilagodiš

export async function register(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Vsa polja so obvezna!" });
    }
    /*
    const userCount = await User.countDocuments();
    if (userCount >= MAX_USERS) {
      return res.status(403).json({ error: "Doseženo maksimalno število uporabnikov!" });
    }
    */
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

export async function login(req, res) {
  try {
    const { username, password } = req.body;

    // 1) Preveri, če sta polja izpolnjena
    if (!username || !password) {
      return res.status(400).json({ error: "Vsa polja so obvezna!" });
    }

    // 2) Najdi uporabnika v bazi
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Napačno uporabniško ime ali geslo" });
    }

    // 3) Preveri geslo (zaenkrat direktna primerjava - NI VARNO!)
    if (user.password !== password) {
      return res.status(401).json({ error: "Napačno uporabniško ime ali geslo" });
    }

    // 4) Uspešna prijava
    res.status(200).json({ 
      message: "Prijava uspešna!",
      user: {
        username: user.username,
        verified: user.verified,
        moderator: user.moderator
      }
    });
  } catch (err) {
    console.error("Napaka v login kontrolerju:", err);
    res.status(500).json({ error: "Napaka pri prijavi" });
  }
}