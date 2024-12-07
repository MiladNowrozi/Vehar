import { DataTypes } from "@sequelize/core";
import db from "../db.js";
import { SubCategory } from "./SubCategory.js";

export const News = db.define(
	"News",
	{
		News_Titre: {
			type: DataTypes.STRING(100),
		},
		News_Title: {
			type: DataTypes.STRING(255),
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
		Category: {
			type: DataTypes.STRING(50),
			allowNull: true,
		},
		Comment_Status: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		MainPageSlider: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		MainPageColumn: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		SubPageSlider: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		SubPageColumn: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		MainNote: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		SubNote: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		Visit_Count: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		Like_Count: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
	},

	{
		paranoid: true,
		indexes: [
			{
				fields: ["News_Title"],
				type: "FULLTEXT",
			},
		],
		validate: {
			None() {
				if (this.News_Title == "" && this.News_Describe == "" && this.News_Content == "") {
					throw new Error("لطفاً فیلد ها را پر کنید!");
				}
			},
		},
	}
);

SubCategory.hasMany(News, {
	foreignKey: {
		unique: false,
		onDelete: "SET NULL",
		onUpdate: "SET NULL",
	},
});
