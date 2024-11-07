import { OptionNews } from "../models/OptionNews.js";

export default class OptionNewsControllers {
	// GET ALL NEWS
	static GetAllOptionNews = async (req, res) => {
		try {
			const ShowAllSubCategory = await OptionNews.findAll();
			if (ShowAllSubCategory.length !== 0) {
				res.status(200).json({
					success: true,
					body: ShowAllSubCategory,
					message: "all Subcategory received successfully!",
				});
			} else {
				res.status(403).json({
					success: false,
					message: "گزینه ای برای دسته ها وجود ندارد.",
				});
			}
		} catch (error) {
			res.status(403).json({
				success: false,
				message: error.message,
			});
		}
	};
}
