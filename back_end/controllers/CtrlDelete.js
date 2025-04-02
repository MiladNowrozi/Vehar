import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Files } from "../models/Files.js";

const __dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), "../../../");

export default class DeleteControllers {
	//  ######## Image
	static Image = async (req, res) => {
		try {
			const FindImages = await Files.findAll({ where: { id: req.body } });
			await Promise.all(
				FindImages.map(async (image) => {
					const filePath = path.join(__dirname, "/uploads/news/", image.FilePath);
					try {
						await fs.promises.unlink(filePath);
						await Files.destroy({ where: { id: image.id } });
					} catch (error) {
						console.error(`Error deleting ${filePath}: ${error.message}`);
						throw new Error(`Failed to delete ${image.FilePath}`);
					}
				})
			);
			const ResultDeleting = await Files.findAndCountAll();
			res.status(200).json({
				success: true,
				body: {
					total: ResultDeleting.count,
					ResultDeleting: req.body,
				},
				message: "all images were receive successfully!",
			});
		} catch (error) {
			res.status(500).json({
				message: error.message,
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
