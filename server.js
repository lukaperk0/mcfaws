import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";  // <- najprej import

dotenv.config();
const app = express();
app.use(express.json());
app.use("/auth", authRoutes);

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
const PORT = 5500;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
