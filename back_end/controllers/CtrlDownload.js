import fs, { createReadStream } from "fs";
import path from "path";
import { glob } from "glob";
import { fileURLToPath } from "url";
import { Files } from "../models/Files.js";
import { Op } from "@sequelize/core";

const __dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

export default class DownloadControllers {
	//  ######## NEWS
	static FilesNews = async (req, res) => {
		const checkFile = req.query.name.split(".")[1];

		if (checkFile === "png" || checkFile === "jpeg" || checkFile === "gif" || checkFile === "jpg") {
			const imagePath = __dirname + "/uploads/news" + req.query.name;
			if (!fs.existsSync(imagePath)) {
				return res.status(404).json({ error: "Image not found .....1" });
			}
			const contentType = imagePath.endsWith(".png")
				? "image/png"
				: imagePath.endsWith(".jpg") || imagePath.endsWith(".jpeg")
				? "image/jpeg"
				: imagePath.endsWith(".gif")
				? "image/gif"
				: "application/octet-stream";

			res.setHeader("Content-Type", contentType);
			const readStream = fs.createReadStream(imagePath);
			readStream.pipe(res);
		} else if (checkFile === "mp4") {
			const VideoPath = __dirname + "/uploads/news" + req.query.name;
			if (!fs.existsSync(VideoPath)) {
				return res.status(404).json({ error: "Video not found" });
			}

			const stat = fs.statSync(VideoPath);
			const fileSize = stat.size;
			const range = req.headers.range;

			if (!range) {
				res.writeHead(200, {
					"Content-Length": fileSize,
					"Content-Type": "video/mp4",
				});

				fs.createReadStream(VideoPath).pipe(res);
			} else {
				const parts = range.replace(/bytes=/, "").split("-");
				const start = parseInt(parts[0], 10);
				const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
				const chunkSize = end - start + 1;

				const videoStream = fs.createReadStream(VideoPath, { start, end });

				res.writeHead(206, {
					"Content-Range": `bytes ${start}-${end}/${fileSize}`,
					"Accept-Ranges": "bytes",
					"Content-Length": chunkSize,
					"Content-Type": "video/mp4",
				});

				videoStream.pipe(res);
			}
		} else {
			res.status(403).json({
				success: false,
				message: "please in you'r request select type of a file images/video .",
			});
		}
	};

	//  ######## USER
	static FilesUser = async (req, res) => {
		const imagePath = __dirname + "/uploads/user/" + req.query.name;

		fs.readFile(imagePath, (err, data) => {
			if (err) {
				res.writeHead(404, { "Content-Type": "text/plain" });
				res.end("Image not found");
				return;
			}
			res.writeHead(200, { "Content-Type": "text/plain" });
			res.end(data);
		});
	};

	//  ######## ADMIN
	static FilesAdmin = async (req, res) => {
		const imagePath = __dirname + "/uploads/admin/" + req.query.name;

		fs.readFile(imagePath, (err, data) => {
			if (err) {
				res.writeHead(404, { "Content-Type": "text/plain" });
				res.end("Image not found");
				return;
			}
			res.writeHead(200, { "Content-Type": "text/plain" });
			res.end(data);
		});
	};

	// RECEIVE URL IMAGES
	static AllImagesUrl = async (req, res) => {
		// try {
		// 	const uploadsDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "../uploads/news");
		// 	const files = await glob(uploadsDir + "/**/*.*");
		// 	if (images.length === 0) {
		// 		return res.status(404).json({ error: "No files found!" });
		// 	}
		// 	const fileLinks = files.slice(0, 3).map((file) => ({
		// 		name: path.basename(file),
		// 		url: `http://localhost:5000/download/news?name=/${file.split("\\")[2] + "/" + file.split("\\")[3] + "/" + file.split("\\")[4]}`,
		// 	}));
		// } catch (error) {
		// 	console.error("Error reading files:", error);
		// 	res.status(500).json({ error: "Failed to read files" });
		// }
		try {
			const images = await Files.findAndCountAll({
				where: {
					FilePath: {
						[Op.or]: [{ [Op.like]: "%.jpg" }],
					},
				},
				order: [["id", "ASC"]],
				limit: parseInt(req.query.limit),
				offset: 0,
			});

			res.status(200).json({
				success: true,
				body: {
					total: images.count,
					images: images.rows,
				},
				message: "all images were receive successfully!",
			});
		} catch (error) {
			console.error("Error reading files:", error);
			res.status(500).json({ error: "Failed to read files" });
		}
	};

	// RECEIVE URL VIDEO
	static AllVideoUrl = async (req, res) => {
		// try {
		// 	const uploadsDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "../uploads/news");
		// 	const files = await glob(uploadsDir + "/**/*.*");
		// 	if (images.length === 0) {
		// 		return res.status(404).json({ error: "No files found!" });
		// 	}
		// 	const fileLinks = files.slice(0, 3).map((file) => ({
		// 		name: path.basename(file),
		// 		url: `http://localhost:5000/download/news?name=/${file.split("\\")[2] + "/" + file.split("\\")[3] + "/" + file.split("\\")[4]}`,
		// 	}));
		// } catch (error) {
		// 	console.error("Error reading files:", error);
		// 	res.status(500).json({ error: "Failed to read files" });
		// }

		try {
			const video = await Files.findAndCountAll({
				where: {
					FilePath: {
						[Op.or]: [{ [Op.like]: "%.mp4" }],
					},
				},
				order: [["id", "ASC"]],
				limit: parseInt(req.query.limit),
				offset: 0,
			});

			res.status(200).json({
				success: true,
				body: {
					total: video.count,
					video: video.rows,
				},
				message: "all images were receive successfully!",
			});
		} catch (error) {
			console.error("Error reading files:", error);
			res.status(500).json({ error: "Failed to read files" });
		}
	};

	// static AllSound = async (req, res) => {
	// 	try {
	// 		const images = await Files.findAndCountAll({
	// 			where: {
	// 				FilePath: {
	// 					[Op.or]: [{ [Op.like]: "%.mp4" }],
	// 				},
	// 			},
	// 			order: [["id", "ASC"]],
	// 			limit: parseInt(req.query.limit),
	// 			offset: 0,
	// 		});

	// 		res.status(200).json({
	// 			success: true,
	// 			body: {
	// 				total: images.count,
	// 				images: images.rows,
	// 			},
	// 			message: "all images were receive successfully!",
	// 		});
	// 	} catch (error) {
	// 		console.error("Error reading files:", error);
	// 		res.status(500).json({ error: "Failed to read files" });
	// 	}
	// };
}
