import { DataTypes } from "@sequelize/core";
import db from "../db.js";
import { News } from "./News.js";

export const Comment = db.define(
	"Comment",
	{
		Comment_Content: {
			type: DataTypes.TEXT,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "متن نظر، نباید خالی باشد!",
				},
				notNull: {
					msg: "متن نظر، نباید null باشد!",
				},
			},
		},
		Comment_Status: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		Like_Comment: {
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

News.hasMany(Comment, {
	foreignKey: {
		unique: false,
		allowNull: true,
		onDelete: "SET NULL",
		onUpdate: "SET NULL",
	},
});