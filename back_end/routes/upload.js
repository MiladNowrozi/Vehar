import fs from "fs";
import path from "path";
import ffmpeg from "fluent-ffmpeg";
import { fileURLToPath } from "url";
import express from "express";
const router = express.Router();
//
import { uploadFiles, uploadFileUser, uploadFileAdmin } from "../controllers/CtrlUploads.js";

import { User } from "../models/User.js";
import { Admin } from "../models/Admins.js";
import { Files } from "../models/Files.js";

const __dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), "../../../");

// ################# NEWS

const getVideoMiddleSecond = (videoPath) => {
	return new Promise((resolve, reject) => {
		ffmpeg.ffprobe(videoPath, (err, metadata) => {
			if (err) return reject(err);
			const duration = metadata.format.duration || 10;
			resolve(Math.floor(duration / 2));
		});
	});
};

// create thumbnail
const generateThumbnail = (videoPath, outputPath, second) => {
	return new Promise((resolve, reject) => {
		ffmpeg(videoPath)
			.on("end", () => resolve(outputPath))
			.on("error", reject)
			.screenshots({
				count: 1,
				timemarks: [second.toString()],
				filename: path.basename(outputPath),
				folder: path.dirname(outputPath),
			});
	});
};

router.post("/file", uploadFiles, async (req, res) => {
	const now = new Date();
	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, "0");

	if (!req.files || req.files.length === 0) {
		return res.status(400).json({ message: "File upload failed !" });
	}

	try {
		for (const DataFile of req.files) {
			const videoDir = path.join(__dirname, "/uploads/news/videos/", year.toString(), month);
			const absVideoPath = path.join(videoDir, DataFile.filename);

			const thumbDir = path.join(
				__dirname,
				"/uploads/news/videos/thumbnails/",
				year.toString(),
				month
			);
			const fileNameWithoutExt = path.parse(DataFile.filename).name;
			const thumbnailFileName = `${fileNameWithoutExt}-thumb.jpg`;
			const absThumbnailPath = path.join(thumbDir, thumbnailFileName);

			fs.mkdirSync(thumbDir, { recursive: true });

			let finalThumbnailRelativePath = null;

			if (DataFile.mimetype.startsWith("video/")) {
				const middleSecond = await getVideoMiddleSecond(absVideoPath);
				await generateThumbnail(absVideoPath, absThumbnailPath, middleSecond);
				finalThumbnailRelativePath = path.join(year.toString(), month, thumbnailFileName);
			}
			// console.log(DataFile.originalname);
			// console.log(DataFile.filename);
			// console.log(path.join(year.toString(), month, DataFile.filename));
			// console.log(DataFile.mimetype);
			// console.log(finalThumbnailRelativePath);

			await Files.create({
				OriginalName: DataFile.originalname,
				FileName: DataFile.filename,
				FilePath: path.join(year.toString(), month, DataFile.filename),
				MimeType: DataFile.mimetype,
				adminId: req.user.id,
				ThumbnailUrl: finalThumbnailRelativePath,
			});
		}

		res.status(200).json({
			success: true,
			message: "Files uploaded successfully ✔",
		});
	} catch (error) {
		console.error("Upload error:", error);
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
});

// ################# USER

const Default_Image_User = "https://vehar.ir/api/download/user?name=default-profile.jpg";

const deleteOldImageUser = async (req, res, next) => {
	const ChangeImg = await User.findByPk(req.user.id);

	if (ChangeImg && ChangeImg.Default_Image !== Default_Image_User) {
		const SplitNameFromUrl = ChangeImg.Default_Image.split("=")[1];
		const oldImage = path.join(__dirname, "/uploads/user/", SplitNameFromUrl);
		if (fs.existsSync(oldImage)) {
			try {
				fs.unlinkSync(oldImage);
				await ChangeImg.update(
					{ Default_Image: null },
					{
						where: {
							id: ChangeImg.id,
						},
					}
				);
				next();
			} catch (error) {
				res.status(401).json({
					success: false,
					message: error,
				});
			}
		} else {
			res.status(401).json({
				success: false,
				message: "invalid server upload user!",
			});
		}
	} else {
		next();
	}
};

router.post("/user", deleteOldImageUser, uploadFileUser, async (req, res) => {
	const FilePath = process.env.BASE_URL + "/download/user?name=" + req.file.path.split("/")[5];
	try {
		const SaveFilePath = await User.update(
			{
				Default_Image: FilePath,
			},
			{ where: { id: req.user.id } }
		);
		res.status(200).json({
			success: true,
			message: "File uploaded successfully!",
			FilePath: SaveFilePath.FileName,
		});
	} catch (error) {
		res.status(403).json({
			success: true,
			message: error,
		});
	}
});

// ################# ADMIN
const Default_Image_Admin = "https://vehar.ir/api/download/admin?name=default-profile.jpg";

const deleteOldImageAdmin = async (req, res, next) => {
	const ChangeImg = await Admin.findByPk(req.user.id);
	if (ChangeImg && ChangeImg.Default_Image !== Default_Image_Admin) {
		const SplitNameFromUrl = ChangeImg.Default_Image.split("=")[1];
		const oldImage = path.join(__dirname, "/uploads/admin/", SplitNameFromUrl);
		if (fs.existsSync(oldImage)) {
			try {
				fs.unlinkSync(oldImage);
				await ChangeImg.update(
					{ Default_Image: null },
					{
						where: {
							id: req.user.id,
						},
					}
				);
				next();
			} catch (error) {
				res.status(401).json({
					success: false,
					message: error,
				});
			}
		} else {
			next();
		}
	} else {
		next();
	}
};

router.post("/admin", deleteOldImageAdmin, uploadFileAdmin, async (req, res) => {
	const FilePath = process.env.BASE_URL + "/download/admin?name=" + req.file.path.split("/")[5];
	try {
		const SaveFilePath = await Admin.update(
			{
				Default_Image: FilePath,
			},
			{ where: { id: req.user.id } }
		);
		res.status(200).json({
			success: true,
			message: "File uploaded successfully!",
			FilePath: SaveFilePath.Default_Image,
		});
	} catch (error) {
		res.status(403).json({
			success: true,
			message: error,
		});
	}
});

export default router;
