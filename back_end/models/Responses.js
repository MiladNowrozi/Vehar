import { DataTypes } from "@sequelize/core";
import db from "../db.js";

export const Responses = db.define("Responses", {
	Responses_Content: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	ResponsesToRes: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
});
