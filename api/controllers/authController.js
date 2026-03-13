import User from "../models/User.js";
import jwt from "jsonwebtoken";

const MAX_USERS = 100; // lahko prilagodiš

export async function register(req, res) {
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
    newUser.setPassword(password);
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    console.log("Token ustvarjen:", token);


    res.status(201).json({ success: true,message: "Uporabnik uspešno registriran!", token });
  } catch (err) {
    console.error("Napaka v register kontrolerju:", err);
    res.status(500).json({ error: "Napaka pri registraciji" });
  }
}
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Uporabnik ne obstaja" });
    }

    const isMatch = user.validatePassword(password); // zaenkrat plain text, kasneje bcrypt
    if (!isMatch) {
      return res.status(401).json({ message: "Geslo napačno" });
    }
    console.log(user._id, user.username);
    // ustvari JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    console.log("Token ustvarjen:", token);
    

    res.json({
      message: "Prijava uspešna",
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Napaka strežnika" });
  }
};

export async function getAllUsers(req, res) {
  try {
    // Prikaži samo verified uporabnike
    const users = await User.find({ verified: true }, 'username verified moderator');
    
    res.status(200).json({
      total: users.length,
      users: users
    });
  } catch (err) {
    console.error("Napaka pri branju uporabnikov:", err);
    res.status(500).json({ error: "Napaka pri branju uporabnikov" });
  }
}

export async function getAllUsersSorted(req, res) {
  try {
    const users = await User.find().select("username role");
    const role_order = ['admin', 'moderator', 'member', 'user'];
    users.sort((a, b) => {
      return role_order.indexOf(a.role) - role_order.indexOf(b.role);
    });
    res.status(200).json({
      total: users.length,
      users: users
    });
  } catch (err) {
    console.error("Napaka pri branju uporabnikov:", err);
    res.status(500).json({ error: "Napaka pri branju uporabnikov" });
  }
}

export async function fetchUser(req, res) {
  try {
    const userId = req.user.id; // pridobi ID iz JWT (middleware)
    const user = await User.findById(userId, 'username role');  
    if (!user) {
      return res.status(404).json({ error: "Uporabnik ni najden" });
    }

    res.status(200).json({
      username: user.username,
      role: user.role
    });
  } catch (err) {
    console.error("Napaka pri branju uporabnika:", err);
    res.status(500).json({ error: "Napaka pri branju uporabnika" });
  }
}