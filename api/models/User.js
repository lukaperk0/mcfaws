import mongoose from "mongoose";

// definiramo shemo za uporabnika
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "member", "moderator", "admin"], default: "user" },
});

// model, ki ga uporabimo za shranjevanje v bazo
const User = mongoose.model("User", userSchema);

export default User;
