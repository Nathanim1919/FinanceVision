import { Router } from "express";
import {registerUser,loginUser, verifyEmail} from "../controllers/authController.js";

const router = Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify-email/:unHashedToken", verifyEmail);

export default router;