import fs, { createReadStream } from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import { Files } from "../models/Files.js";
import { Op } from "@sequelize/core";

const __dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), "../../../");

export default class DownloadControllers {
	//  ######## NEWS
	static FilesNews = async (req, res) => {
		const checkFile = req.query.name.split(".")[1];

		if (checkFile === "png" || checkFile === "jpeg" || checkFile === "gif" || checkFile === "jpg") {
			const imagePath = __dirname + "/uploads/news" + req.query.name;
			if (!fs.existsSync(imagePath)) {
				return res.status(404).json({ error: "Image not found" });
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
				message: "The file extension is unknown .",
			});
		}
	};

	//  ######## VIDEOS
	static FilesVideo = async (req, res) => {
		const VideoPath = __dirname + "/uploads/news/videos" + req.query.name;

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
	};

	//  ######## AllThumbnailVideo
	static ThumbnailVideo = async (req, res) => {
		const name = req.query.name;
		const ThumbnailPath = __dirname + "/uploads/news/videos/thumbnails/" + name;

		// Basic security: Avoid suspicious paths

		if (!name || name.includes("..") || name.includes("//")) {
			return res.status(400).json({ error: "Invalid thumbnail name." });
		}

		if (!fs.existsSync(ThumbnailPath)) {
			return res.status(404).json({ error: "Thumbnail not found." });
		}

		const stat = fs.statSync(ThumbnailPath);
		const etag = crypto
			.createHash("md5")
			.update(stat.size + "-" + stat.mtimeMs)
			.digest("hex");

		if (req.headers["if-none-match"] === etag) {
			return res.status(304).end();
		}

		res.setHeader("Content-Type", "image/jpeg");
		res.setHeader("Content-Length", stat.size);
		res.setHeader("Cache-Control", "public, max-age=86400, immutable");
		res.setHeader("ETag", etag);
		res.setHeader("X-Content-Type-Options", "nosniff");
		res.setHeader("Referrer-Policy", "no-referrer");
		res.setHeader("Access-Control-Allow-Origin", "*");

		fs.createReadStream(ThumbnailPath).pipe(res);
	};

	//  ######## OTHER

	static FileOther = async (req, res) => {
		console.log(req.query.name);

		const OtherPath = __dirname + "/uploads/news/other" + req.query.name;
		if (!fs.existsSync(OtherPath)) {
			return res.status(404).json({ error: "this file is not found!" });
		}

		const stat = fs.statSync(OtherPath);
		const fileSize = stat.size;
		const range = req.headers.range;
		if (!range) {
			res.writeHead(200, {
				"Content-Length": fileSize,
				// "Content-Type": "video/mp4",
			});

			fs.createReadStream(OtherPath).pipe(res);
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
				// "Content-Type": "video/mp4",
			});

			videoStream.pipe(res);
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
		try {
			const images = await Files.findAndCountAll({
				where: {
					FileName: {
						[Op.or]: [{ [Op.like]: "%.jpg" }],
					},
				},
				order: [["createdAt", "DESC"]],
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
		try {
			const video = await Files.findAndCountAll({
				where: {
					FileName: {
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
				message: "all videos were receive successfully!",
			});
		} catch (error) {
			console.error("Error reading files:", error);
			res.status(500).json({ error: "Failed to read files" });
		}
	};

	// RECEIVE URL AllThumbnailVideoUrl
	static AllThumbnailVideoUrl = async (req, res) => {
		try {
			const ThumbnailVideo = await Files.findAndCountAll({
				where: {
					MimeType: {
						[Op.like]: "video/%",
					},
				},
				order: [["createdAt", "DESC"]],
				limit: parseInt(req.query.limit),
				offset: 0,
			});

			res.status(200).json({
				success: true,
				body: {
					total: ThumbnailVideo.count,
					video: ThumbnailVideo.rows,
				},
				message: "all ThumbnailVideo were receive successfully!",
			});
		} catch (error) {
			console.error("Error reading files:", error);
			res.status(500).json({ error: "Failed to read files" });
		}
	};
	// RECEIVE URL OTHER
	static AllOtherUrl = async (req, res) => {
		try {
			const count = await Files.findAndCountAll({
				where: {
					[Op.not]: {
						[Op.or]: [
							{ MimeType: { [Op.like]: "image/%" } },
							{ MimeType: { [Op.like]: "video/%" } },
						],
					},
				},
			});
			const other = await Files.findAndCountAll({
				where: {
					[Op.not]: {
						[Op.or]: [
							{ MimeType: { [Op.like]: "image/%" } },
							{ MimeType: { [Op.like]: "video/%" } },
						],
					},
				},
				order: [["id", "ASC"]],
				limit: count.count >= parseInt(req.query.limit) ? parseInt(req.query.limit) : count.count,
				offset: 0,
			});

			res.status(200).json({
				success: true,
				body: {
					total: other.count,
					other: other.rows,
				},
				message: "all other were receive successfully!",
			});
		} catch (error) {
			console.error("Error reading files:", error);
			res.status(500).json({ error: "Failed to read files" });
		}
	};
}
