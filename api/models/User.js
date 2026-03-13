import crypto from 'crypto';
import mongoose from "mongoose";

// definiramo shemo za uporabnika
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  hash: { type: String, required: true },
  salt: { type: String, required: true },
  role: { type: String, enum: ["user", "member", "moderator", "admin"], default: "user" },
});

// Metoda za nastavitev gesla (kreira salt in hash)
userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 64, "sha512")
    .toString("hex");
};

// Metoda za validacijo gesla
userSchema.methods.validatePassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 64, "sha512")
    .toString("hex");
  return this.hash === hash;
};

// model, ki ga uporabimo za shranjevanje v bazo
const User = mongoose.model("User", userSchema);

export default User;
