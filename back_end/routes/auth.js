import express from "express";
import { Login, Logout, PasswordForgot, Register, RegisterToken } from "../controllers/CtrlAuth.js";

const router = express.Router();

router.post("/register", Register);

router.get("/register/?", RegisterToken);

router.post("/email_password_forgot", PasswordForgot);

router.post("/login", Login);

router.post("/logout", Logout);

export default router;
