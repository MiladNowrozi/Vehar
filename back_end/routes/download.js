import express from "express";
import DownloadControllers from "../controllers/CtrlDownload.js";

const router = express.Router();

router.get("/news", DownloadControllers.FilesNews);

router.get("/user", DownloadControllers.FilesUser);

router.get("/admin", DownloadControllers.FilesAdmin);

router.get("/all-images", DownloadControllers.AllImagesUrl);

router.get("/all-videos", DownloadControllers.AllVideoUrl);

// router.get("/all-sound", DownloadControllers.AllSound);

export default router;
