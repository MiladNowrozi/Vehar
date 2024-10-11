import { SubCategory } from "../models/SubCategory.js";

export default class SubCategoryControllers {
	// *******   { CREATE ONE CATEGORY }  ********

	static CreateSubCategory = async (req, res) => {
		try {
			const ExistSubCategory = await SubCategory.findOne({
				where: {
					SubCategory: req.params.subcategory,
					categoryId: req.params.ParentCategory,
				},
			});
			if (!ExistSubCategory) {
				await SubCategory.create({
					SubCategory: req.params.subcategory,
					categoryId: req.params.ParentCategory,
				});
				const ShowAllSubCategory = await SubCategory.findAll();
				if (ShowAllSubCategory.length !== 0) {
					res.status(200).json({
						success: true,
						body: ShowAllSubCategory,
						message: "all Subcategory received successfully!",
					});
				} else {
					res.status(403).json({
						success: false,
						message: "دسته ای وجود ندارد.",
					});
				}
			} else {
				res.status(404).json({
					success: false,
					message: `زیر دسته ${req.params.subcategory} قبلا ساخته شده است!`,
				});
			}
		} catch (er) {
			res.status(404).json({
				success: false,
				message: `${er.message}پیکربندی ساخت ناموفق!`,
			});
		}
	};

	// GET ONE NEWS
	// static get= async (req, res) => {};

	// GET ALL NEWS
	static GetAllSubCategory = async (req, res) => {
		const ShowAllSubCategory = await SubCategory.findAll();
		if (ShowAllSubCategory.length !== 0) {
			res.status(200).json({
				success: true,
				body: ShowAllSubCategory,
				message: "all Subcategory received successfully!",
			});
		} else {
			res.status(403).json({
				success: false,
				message: "زیر دسته ای وجود ندارد.",
			});
		}
	};

	// UPDATE ONE NEWS
	// static upd = async (req, res) => {};

	// DELETE ONE NEWS
	static DeleteSubCategory = async (req, res) => {
		const Tables = await queryInterface.showAllTables();
		console.log(Tables);

		// db.queryInterface.dropTable(req.params.name);
		res.status(200).json({
			success: true,
			message: "دسته با موفقیت حذف شد!",
		});
	};
}
