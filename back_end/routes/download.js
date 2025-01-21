import express from "express";
import DownloadControllers from "../controllers/CtrlDownload.js";

const router = express.Router();

router.get("/news", DownloadControllers.FilesNews);

router.get("/user", DownloadControllers.FilesUser);

router.get("/admin", DownloadControllers.FilesAdmin);

export default router;
