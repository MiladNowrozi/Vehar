import express from "express";
import DownloadControllers from "../controllers/CtrlDownload.js";

const router = express.Router();

router.get("/news", DownloadControllers.FilesNews);

router.get("/videos", DownloadControllers.FilesVideo);

router.get("/video-thumbnail", DownloadControllers.ThumbnailVideo);

router.get("/other", DownloadControllers.FileOther);

router.get("/user", DownloadControllers.FilesUser);

router.get("/admin", DownloadControllers.FilesAdmin);

router.get("/all-images", DownloadControllers.AllImagesUrl);

router.get("/all-videos", DownloadControllers.AllVideoUrl);

router.get("/all-video-thumbnail", DownloadControllers.AllThumbnailVideoUrl);

router.get("/all-others", DownloadControllers.AllOtherUrl);

export default router;
