import { DataTypes } from "@sequelize/core";
import db from "../db.js";
import { Category } from "./Category.js";

export const News = db.define(
	"News",
	{
		News_Title: {
			type: DataTypes.STRING(255),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "عنوان خبر، نباید خالی باشد!",
				},
				notNull: {
					msg: "عنوان خبر، نباید null باشد!",
				},
				len: {
					args: [8, 50],
					msg: "عنوان خبر، باید حداقل 8 و حداکثر 50 کاراکتر باشد!",
				},
			},
		},
		News_Describe: {
			type: DataTypes.STRING(255),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "توضیح کوتاه، نباید خالی باشد!",
				},
				notNull: {
					msg: "توضیح کوتاه، نباید null باشد!",
				},
				len: {
					args: [50, 100],
					msg: "توضیح کوتاه، باید حداقل 50 و حداکثر 100 کاراکتر باشد!",
				},
			},
		},
		News_Content: {
			type: DataTypes.TEXT("long"),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "متن خبر، نباید خالی باشد!",
				},
				notNull: {
					msg: "متن خبر، نباید null باشد!",
				},
			},
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
		Like_News: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	},

	{
		paranoid: true,
		validate: {
			None() {
				if (this.Title == "" && this.Describe == "" && this.Content == "" && this.category == "") {
					throw new Error("لطفاً فیلد ها را پر کنید!");
				}
			},
		},
	}
);
Category.hasMany(News, {
	foreignKey: {
		unique: false,
		allowNull: true,
		onDelete: "SET NULL",
		onUpdate: "SET NULL",
	},
});

db.queryInterface.tableExists("News").then(async (e) => {
	if (!e) {
		try {
			await News.sync({ alter: true });
		} catch (error) {
			console.log(`table News not created! : ${error}`);
		}
	}
	return;
});
