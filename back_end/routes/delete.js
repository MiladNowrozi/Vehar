import express from "express";
import DeleteControllers from "../controllers/CtrlDelete.js";

const router = express.Router();

router.post("/images", DeleteControllers.Image);

router.post("/video", DeleteControllers.Video);

router.post("/other", DeleteControllers.Other);

export default router;
