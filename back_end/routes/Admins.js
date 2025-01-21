import express from "express";
import AdminControllers from "../controllers/CtrlAdmins.js";

const router = express.Router();

// GET Admin
router.get("/", AdminControllers.GetAdmin);

// CREATE
router.post("/create", AdminControllers.CreateAdmin);

// GET ALL Admin
router.get("/get-all", AdminControllers.GetAllAdmin);

// HISTORY
router.get("/history", AdminControllers.History);

// CANCEL Admin
router.post("/dismissal", AdminControllers.DismissalAdmin);

// UPDATE Admin
router.post("/edit", AdminControllers.EditAdmin);

// DELETE Admin
router.delete("/delete", AdminControllers.DeleteAdmin);

export default router;
