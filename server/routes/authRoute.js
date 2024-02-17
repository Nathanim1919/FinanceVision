import { Router } from "express";
import {registerUser, verifyEmail} from "../controllers/authController.js";

const router = Router();
router.post("/register", registerUser);
router.get("/verify-email/:unHashedToken", verifyEmail);

export default router;