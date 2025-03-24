import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
//
import multer from "multer";
const __dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), "../../../");

//  ################ NEWS

const StorageNews = multer.diskStorage({
	destination: function (req, file, cb) {
		const now = new Date();
		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, "0");

		const dir = path.join(__dirname, "/uploads/news/", year.toString(), month);

		fs.mkdirSync(dir, { recursive: true });
		cb(null, dir);
	},

	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, uniqueSuffix + file.originalname);
	},
});

const UploadFile = multer({ storage: StorageNews });
export const uploadFiles = UploadFile.array("files", 100);

//  ################ USER

const StorageUser = multer.diskStorage({
	destination: function (req, file, cb) {
		const dir = path.join(__dirname, "/uploads/user");
		fs.mkdirSync(dir, { recursive: true });
		cb(null, dir);
	},

	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, uniqueSuffix + file.originalname);
	},
});

const UploadUser = multer({ storage: StorageUser });
export const uploadFileUser = UploadUser.single("file");

//  ################ ADMIN

const StorageAdmin = multer.diskStorage({
	destination: function (req, file, cb) {
		const dir = path.join(__dirname, "uploads/admin");
		fs.mkdirSync(dir, { recursive: true });
		cb(null, dir);
	},

	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, uniqueSuffix + file.originalname);
	},
});

const UploadAdmin = multer({ storage: StorageAdmin });
export const uploadFileAdmin = UploadAdmin.single("file");
