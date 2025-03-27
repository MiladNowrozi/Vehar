import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Files } from "../models/Files.js";

const __dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), "../../../");

export default class DeleteControllers {
	//  ######## Image
	static Image = async (req, res) => {

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

	//  ######## Video
	static Video = async (req, res) => {
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

	//  ######## Other
	static Other = async (req, res) => {
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
}
