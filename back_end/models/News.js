import { DataTypes } from "@sequelize/core";
import db from "../db.js";
import { Category } from "./Category.js";
import { SubCategory } from "./SubCategory.js";

export const News = db.define(
	"News",
	{
		News_Title: {
			type: DataTypes.STRING(255),
			indexes: [
				{
					unique: false,
					fields: ["title", "content"],
					type: "FULLTEXT",
				},
			],
		},
		News_Describe: {
			type: DataTypes.TEXT("long"), // STRING(255)
		},
		News_Content: {
			type: DataTypes.TEXT("long"),
		},
		News_Images: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		News_Status: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		Comment_Status: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		Column: {
			type: DataTypes.STRING(15),
		},
	},

	{
		paranoid: true,
		validate: {
			None() {
				if (this.News_Title == "" && this.News_Describe == "" && this.News_Content == "") {
					throw new Error("لطفاً فیلد ها را پر کنید!");
				}
			},
		},
	}
);

Category.hasMany(News, {
	foreignKey: {
		unique: false,
		onDelete: "SET NULL",
		onUpdate: "SET NULL",
	},
});

SubCategory.hasMany(News, {
	foreignKey: {
		unique: false,
		onDelete: "SET NULL",
		onUpdate: "SET NULL",
	},
});
