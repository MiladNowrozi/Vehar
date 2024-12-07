import { DataTypes } from "@sequelize/core";
import db from "../db.js";
import { News } from "./News.js";
export const Like = db.define("Like", {
	Like_News: {
		type: DataTypes.BOOLEAN,
	},
	Like_Comment: {
		type: DataTypes.BOOLEAN,
	},
	UnLike_Comment: {
		type: DataTypes.BOOLEAN,
	},
});

News.hasMany(Like, {
	foreignKey: {
		unique: false,
		allowNull: true,
		onDelete: "SET NULL",
		onUpdate: "SET NULL",
	},
});
