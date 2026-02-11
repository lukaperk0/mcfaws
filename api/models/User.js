import mongoose from "mongoose";

// definiramo shemo za uporabnika
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  moderator: { type: Boolean, default: false },
});

// model, ki ga uporabimo za shranjevanje v bazo
const User = mongoose.model("User", userSchema);

export default User;
