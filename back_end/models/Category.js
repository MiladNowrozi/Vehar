import db from "../db.js";
import { DataTypes } from "@sequelize/core";
import { SubCategory } from "./SubCategory.js";

export const Category = db.define("Category", {
	Category: {
		type: DataTypes.STRING(50),
		allowNull: false,
		validate: {
			notEmpty: {
				msg: "news OptionNews should not be empty!",
			},
			notNull: {
				msg: "news OptionNews should not be null!",
			},
			len: {
				args: [1, 50],
				msg: "news OptionNews should not be than more than 50!",
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
