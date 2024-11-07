import express from "express";
import LordControllers from "../controllers/CtrlLord.js";

const router = express.Router();

// GET Lord
router.get("/get", LordControllers.GetLord);

// UPDATE Lord
router.put("/update-lord", LordControllers.UpdateLord);

export default router;
