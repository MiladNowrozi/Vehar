import { SubCategory } from "../models/SubCategory.js";

export default class SubCategoryControllers {
	// *******   { CREATE ONE CATEGORY }  ********

	static CreateSubCategory = async (req, res) => {
		try {
			const ExistSubCategory = await SubCategory.findOne({
				where: {
					SubCategory: req.query.subcategory,
					Category: req.query.Category,
				},
			});
			if (!ExistSubCategory) {
				if (req.query.subcategory && req.query.Category) {
					await SubCategory.create({
						SubCategory: req.query.subcategory,
						Category: req.query.Category,
					});
					const politic = await SubCategory.findAndCountAll({ where: { Category: "politic" } });
					const economy = await SubCategory.findAndCountAll({ where: { Category: "economy" } });
					const social = await SubCategory.findAndCountAll({ where: { Category: "social" } });
					const sport = await SubCategory.findAndCountAll({ where: { Category: "sport" } });
					const local = await SubCategory.findAndCountAll({ where: { Category: "local" } });
					const ShowAllSubCategory = await SubCategory.findAll();
					if (ShowAllSubCategory.length !== 0) {
						res.status(200).json({
							success: true,
							body: {
								ShowAllSubCategory,
								Count: {
									politic: politic.count,
									economy: economy.count,
									social: social.count,
									sport: sport.count,
									local: local.count,
								},
							},
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
						message: "لطفاً دسته و زیر دسته را تعیین کنید!",
					});
				}
			} else {
				res.status(404).json({
					success: false,
					message: `زیر دسته ${req.query.subcategory} قبلا ساخته شده است!`,
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
		const politic = await SubCategory.findAndCountAll({ where: { Category: "politic" } });
		const economy = await SubCategory.findAndCountAll({ where: { Category: "economy" } });
		const social = await SubCategory.findAndCountAll({ where: { Category: "social" } });
		const sport = await SubCategory.findAndCountAll({ where: { Category: "sport" } });
		const local = await SubCategory.findAndCountAll({ where: { Category: "local" } });
		const ShowAllSubCategory = await SubCategory.findAll();
		if (ShowAllSubCategory.length !== 0) {
			res.status(200).json({
				success: true,
				body: {
					ShowAllSubCategory,
					Count: {
						politic: politic.count,
						economy: economy.count,
						social: social.count,
						sport: sport.count,
						local: local.count,
					},
				},
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
		if (req.query.id) {
			await SubCategory.destroy({ where: { id: req.query.id } });
			const politic = await SubCategory.findAndCountAll({ where: { Category: "politic" } });
			const economy = await SubCategory.findAndCountAll({ where: { Category: "economy" } });
			const social = await SubCategory.findAndCountAll({ where: { Category: "social" } });
			const sport = await SubCategory.findAndCountAll({ where: { Category: "sport" } });
			const local = await SubCategory.findAndCountAll({ where: { Category: "local" } });
			const ShowAllSubCategory = await SubCategory.findAll();
			res.status(200).json({
				success: true,
				body:
					ShowAllSubCategory.length !== 0
						? {
								ShowAllSubCategory,
								Count: {
									politic: politic.count,
									economy: economy.count,
									social: social.count,
									sport: sport.count,
									local: local.count,
								},
						  }
						: {
								ShowAllSubCategory,
								Count: {
									politic: politic.count,
									economy: economy.count,
									social: social.count,
									sport: sport.count,
									local: local.count,
								},
						  },
			});
		} else {
			res.status(403).json({
				success: false,
				message: "invalid server!",
			});
		}
	};
}
