import express from "express";
import DeleteControllers from "../controllers/CtrlDelete.js";

const router = express.Router();

router.post("/images", DeleteControllers.Image);

router.post("/videos", DeleteControllers.Video);

router.post("/others", DeleteControllers.Other);

export default router;
