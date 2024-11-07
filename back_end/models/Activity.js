import { DataTypes } from "@sequelize/core";
import db from "../db.js";
import { News } from "./News.js";

export const Activity = db.define("Activity", {
	Active_Like: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
	},
	Active_Comment: {
		type: DataTypes.STRING(255),
		allowNull: false,
	},
});

News.hasMany(Activity, {
	foreignKey: {
		unique: true,
		allowNull: true,
		onDelete: "SET NULL",
		onUpdate: "SET NULL",
	},
});
