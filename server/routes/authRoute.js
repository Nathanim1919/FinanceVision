import { Router } from "express";
import {registerUser,loginUser, verifyEmail,getCurrentUser, forgotPasswordRequest, logoutUser} from "../controllers/authController.js";
import {verifyJWT} from "../middlewares/auth.middlewares.js";

const router = Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout",verifyJWT, logoutUser);
router.post("/forgotPasswordRequest", forgotPasswordRequest);
router.get("/verify-email/:unHashedToken", verifyEmail);
router.get("/getUser",verifyJWT, getCurrentUser);

export default router;