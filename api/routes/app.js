import express from "express";
import { register, login, getAllUsers, fetchUser } from "../controllers/authController.js";
import { 
  getAllCountries, 
  getCountryById,
  createCountry,
  deleteCountry,
  addSegment, 
  addStavba 
} from "../controllers/countryController.js";
import {
  getAllRules,
  getRuleById,
  createRule,
  updateRule,
  deleteRule
} from "../controllers/ruleController.js";
import authMiddleware from "../middleware/authMiddleware.js";
//import { authenticate, requireModerator } from "../middleware/auth.js"; --- za dodati

const router = express.Router();

//========= MIDDLEWARE (za dodati) ==========
function authenticate(req, res, next) {
  authMiddleware(req, res, next);
}

function requireModerator(req, res, next) {
  const user = req.user;
  if (user && user.role === "moderator") {
    next();
  } else {
    res.status(403).json({ error: "Ni dovoljenja za dostop" });
  }
}

// ========== AUTH ROUTES ==========
router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/users", getAllUsers);
router.get("/auth/profile", authenticate, fetchUser); // GET podatke o prijavljenem uporabniku (prijavljeni)

// ========== COUNTRY ROUTES ==========
router.get("/countries", getAllCountries);                                    // GET vseh držav (public)
router.get("/countries/:id", getCountryById);                                 // GET ene države (public)
router.post("/countries", authenticate, createCountry);                       // POST nova država (prijavljeni)
router.delete("/countries/:id", authenticate, deleteCountry);                 // DELETE država (prijavljeni)
router.post("/countries/add-segment", authenticate, addSegment);              // POST dodaj segment (prijavljeni)
router.post("/countries/add-stavba", authenticate, addStavba);                // POST dodaj stavbo (prijavljeni)

// ========== RULE ROUTES ==========
router.get("/rules", getAllRules);                                            // GET vsa pravila (public)
router.get("/rules/:id", getRuleById);                                        // GET eno pravilo (public)
router.post("/rules", authenticate, requireModerator, createRule);            // POST novo pravilo (moderatorji)
router.put("/rules/:id", authenticate, requireModerator, updateRule);         // PUT posodobi pravilo (moderatorji)
router.delete("/rules/:id", authenticate, requireModerator, deleteRule);      // DELETE pravilo (moderatorji)

export default router;
