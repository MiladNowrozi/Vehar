import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
const router = express.Router();
//
import { uploadFiles, uploadFileUser, uploadFileAdmin } from "../controllers/CtrlUploads.js";

import { User } from "../models/User.js";
import { Admin } from "../models/Admins.js";

const __dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

// ################# NEWS

router.post("/news", uploadFiles, (req, res) => {
	if (req.file) {
		res.status(200).json({
			success: true,
			message: "File uploaded successfully!",
			file: {
				AbsolutePath: req.file.originalname,
				path: req.file.path,
			},
		});
	} else {
		res.status(400).json({ message: "File upload failed." });
	}
});

// ################# USER
const deleteOldImageUser = async (req, res, next) => {
	const ChangeImg = await User.findByPk(req.user.id);

	if (ChangeImg) {
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
	const FilePath = "http://localhost:5000/download/user?name=" + req.file.path.split("\\")[5];
	try {
		const SaveFilePath = await User.update({
			Default_Image: FilePath,
		});
		res.status(200).json({
			success: true,
			message: "File uploaded successfully!",
			FilePath: SaveFilePath.FilePath,
		});
	} catch (error) {
		res.status(403).json({
			success: true,
			message: error,
		});
	}
});

// ################# ADMIN
const deleteOldImageAdmin = async (req, res, next) => {
	const ChangeImg = await Admin.findByPk(req.user.id);

	if (ChangeImg) {
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
	const FilePath = "http://localhost:5000/download/admin?name=" + req.file.path.split("\\")[5];
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
