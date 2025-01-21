import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

export default class DownloadControllers {
	//  ######## NEWS
	static FilesNews = async (req, res) => {
		const imagePath = __dirname + "/uploads/news" + req.query.name;

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
}
