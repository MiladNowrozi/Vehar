import db from "../db.js";
import { DataTypes } from "@sequelize/core";
import { SubCategory } from "./SubCategory.js";

export const Category = db.define("Category", {
	Category: {
		type: DataTypes.STRING(100),
		allowNull: false,
		validate: {
			notEmpty: {
				msg: "لطفاً دسته مربوطه را انتخاب کنید!",
			},
			notNull: {
				msg: "دسته مربوطه، نباید null باشد!",
			},
		},
	},
});

Category.hasMany(SubCategory, {
	foreignKey: {
		unique: false,
		allowNull: true,
		onDelete: "SET NULL",
		onUpdate: "SET NULL",
	},
});

db.queryInterface.tableExists("Categories").then(async (e) => {
	if (!e) {
		try {
			await Category.sync({ alter: true });
		} catch (error) {
			console.log(`table Category not created! : ${error}`);
		}
	}
	return;
});
