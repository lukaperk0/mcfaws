import express from "express";
import { register, login, getAllUsers, fetchUser, getAllUsersSorted } from "../controllers/authController.js";
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
import { createPosition, getPositions, getPositionById, addUserToPosition } from "../controllers/positionController.js";
import {authenticate, requireModerator} from "../middleware/authMiddleware.js";
//import { authenticate, requireModerator } from "../middleware/auth.js"; --- za dodati

const router = express.Router();

// ========== AUTH ROUTES ==========
router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/users", getAllUsers);
router.get("/auth/get-users", getAllUsersSorted); // GET vseh uporabnikov, urejenih po vlogi
router.get("/auth/profile", authenticate, fetchUser); // GET podatke o prijavljenem uporabniku (prijavljeni)

// ========== COUNTRY ROUTES ==========
router.get("/countries", getAllCountries);                                    // GET vseh držav (public)
router.get("/countries/:id", getCountryById);                                 // GET ene države (public)
router.post("/countries", authenticate, createCountry);                       // POST nova država (prijavljeni)
router.delete("/countries/:id", authenticate, deleteCountry);                 // DELETE država (prijavljeni)
router.post("/countries/add-segment", authenticate, addSegment);              // POST dodaj segment (prijavljeni)
router.post("/countries/add-stavba", authenticate, addStavba);                // POST dodaj stavbo (prijavljeni)

// ========== RULE ROUTES ==========
router.get("/rules/list", getAllRules);                                            // GET vsa pravila (public)
router.get("/rules/:id", getRuleById);                                        // GET eno pravilo (public)
router.post("/rules/create", authenticate, requireModerator, createRule);            // POST novo pravilo (moderatorji)
router.put("/rules/update", authenticate, requireModerator, updateRule);         // PUT posodobi pravilo (moderatorji)
router.delete("/rules/delete", authenticate, requireModerator, deleteRule);      // DELETE pravilo (moderatorji)

// ========== POSITION ROUTES ==========
router.post("/positions/create", authenticate, requireModerator, createPosition);                       // POST nova pozicija (prijavljeni)
router.get("/positions/getAll", getPositions);                                        // GET vse pozicije (public)
router.get("/positions/:id", getPositionById);                                 // GET ena pozicija (public)
router.post("/positions/addUser", authenticate, requireModerator, addUserToPosition);          // POST dodaj uporabnika k poziciji (prijavljeni)

export default router;
