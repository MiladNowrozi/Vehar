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
		try {
			const FindVideo = await Files.findAll({ where: { id: req.body } });
			await Promise.all(
				FindVideo.map(async (video) => {
					const filePath = path.join(__dirname, "/uploads/news/videos/", video.FilePath);
					try {
						await fs.promises.unlink(filePath);
						await Files.destroy({ where: { id: video.id } });
					} catch (error) {
						console.error(`Error deleting ${filePath}: ${error.message}`);
						throw new Error(`Failed to delete ${video.FilePath}`);
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
				message: "all videos were receive successfully!",
			});
		} catch (error) {
			res.status(500).json({
				message: error.message,
				success: false,
			});
		}
	};

	//  ######## OTHER
	static Other = async (req, res) => {
		try {
			const FindVideo = await Files.findAll({ where: { id: req.body } });
			await Promise.all(
				FindVideo.map(async (other) => {
					const filePath = path.join(__dirname, "/uploads/news/other/", other.FilePath);
					try {
						await fs.promises.unlink(filePath);
						await Files.destroy({ where: { id: other.id } });
					} catch (error) {
						console.error(`Error deleting ${filePath}: ${error.message}`);
						throw new Error(`Failed to delete ${other.FilePath}`);
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
				message: "all other-files were receive successfully!",
			});
		} catch (error) {
			res.status(500).json({
				message: error.message,
				success: false,
			});
		}
	};
}
