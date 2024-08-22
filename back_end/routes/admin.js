import express from "express";
import { CreateAdmin } from "../controllers/CtrlAdmins.js";

const router = express.Router();

// CREATE
router.post("/create-admin", CreateAdmin);

// GET ADMIN
router.post("/admin:id", CreateAdmin);

// GET ALL ADMIN
router.post("/get-all-admin", CreateAdmin);

// UPDATE ADMIN
router.put("/update-admin", CreateAdmin);

// DELETE ADMIN
router.delete("/delete-admin", CreateAdmin);

export default router;
