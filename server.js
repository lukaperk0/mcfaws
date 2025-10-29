import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "public/User.js";

dotenv.config();

const app = express();
app.use(express.json());

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1); // ustavi app, če povezava ne uspe
  }
}

connectDB();

// testna pot
app.get('/', (req, res) => {
  res.send('Minecraft info backend is running!');
});

// zagon strežnika
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // preveri, če uporabnik že obstaja
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ error: "Uporabnik že obstaja" });
  }

  // ustvari novega uporabnika
  const newUser = new User({ username, password });
  await newUser.save(); // shrani v bazo

  res.status(201).json({ message: "Uporabnik uspešno registriran!" });
});
