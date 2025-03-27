import express from "express";
import DeleteControllers from "../controllers/CtrlDelete.js";

const router = express.Router();

router.get("/images", DeleteControllers.Image);

router.get("/video", DeleteControllers.Video);

router.get("/other", DeleteControllers.Other);

export default router;
