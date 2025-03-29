import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Files } from "../models/Files.js";

const __dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), "../../../");

export default class DeleteControllers {
	//  ######## Image
	static Image = async (req, res) => {
		if (!req.user) {
			return res.sendStatus(401);
		}

		if (req.body.length > 0) {
			try {
				const FindImages = await Files.findAll({ where: { id: req.body } });
				for (const FilesImage of FindImages) {
					const ImagesForDelete = path.join(__dirname, "/uploads/news/", FilesImage.FilePath);
					if (fs.existsSync(ImagesForDelete)) {
						fs.unlinkSync(ImagesForDelete);
						await Files.destroy({ where: { id: FilesImage.id } });
					} else {
						res.status(403).json({
							success: false,
							message: `not finding some of images:${ImagesForDelete} for deleting !`,
						});
					}
				}
				const ResultDeleting = await Files.findAndCountAll();
				res.status(200).json({
					success: true,
					body: {
						total: ResultDeleting.count,
						images: ResultDeleting.rows,
					},
					message: "all images were receive successfully!",
				});
			} catch (error) {
				res.status(500).json({
					message: error.message,
					success: false,
				});
			}
		} else {
			res.status(403).json({
				message: "not images sending !",
				success: false,
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
