import express from "express";
import { AuthToken, Login, Logout, PasswordForgot, RefreshToken, Register, sendEmailVerify, VerifyEmail } from "../controllers/CtrlAuth.js";

const router = express.Router();

router.post("/register", Register);

router.get("/verify-email", sendEmailVerify, VerifyEmail);

router.post("/email_password_forgot", PasswordForgot);

router.post("/refresh-token", RefreshToken);

router.post("/login", Login);

router.post("/logout", Logout);

export default router;
