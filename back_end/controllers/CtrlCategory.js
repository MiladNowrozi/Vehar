import { News } from "../models/News.js";
import db from "../db.js";
import { Category } from "../models/Category.js";

export default class CategoryControllers {
	// *******   { CREATE ONE CATEGORY }  ********

	static CreateCategory = async (req, res) => {
		try {
			if (req.params.CategoryName) {
				const ExistCategory = await Category.findOne({
					where: {
						Category: req.params.CategoryName,
					},
				});
				if (!ExistCategory) {
					await Category.create({
						Category: req.params.CategoryName,
					});
					const ShowAllCategory = await Category.findAll();
					if (ShowAllCategory.length !== 0) {
						res.status(200).json({
							success: true,
							body: ShowAllCategory,
							message: "all category received successfully!",
						});
					} else {
						res.status(403).json({
							success: false,
							message: "دسته ای وجود ندارد.",
						});
					}
				} else {
					res.status(403).json({
						success: false,
						message: `دسته ${req.params.CategoryName} موجود است.`,
					});
				}
			} else {
				res.status(403).json({
					success: false,
					message: "category name is not valid!",
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	// GET ONE CATEGORY
	// static get= async (req, res) => {};

	// GET ALL CATEGORY
	static GetallCategory = async (req, res) => {
		const ShowAllCategory = await Category.findAll();
		if (ShowAllCategory.length !== 0) {
			res.status(200).json({
				success: true,
				body: ShowAllCategory,
				message: "all category received successfully!",
			});
		} else {
			res.status(403).json({
				success: false,
				message: "دسته ای وجود ندارد.",
			});
		}
	};

	// UPDATE ONE CATEGORY
	// static upd = async (req, res) => {};

	// DELETE ONE CATEGORY
	//  static delete = async (req, res) => {}
}
