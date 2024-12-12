import { DataTypes } from "@sequelize/core";
import db from "../db.js";
import { News } from "./News.js";
import { Like } from "./Like.js";
import { Responses } from "./Responses.js";

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
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		UnLike_Comment: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
	},
	{
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
Comment.hasMany(Like, {
	foreignKey: {
		unique: false,
		allowNull: true,
		onDelete: "SET NULL",
		onUpdate: "SET NULL",
	},
});
Comment.hasMany(Responses, {
	foreignKey: {
		unique: false,
		allowNull: true,
		onDelete: "SET NULL",
		onUpdate: "SET NULL",
	},
});

