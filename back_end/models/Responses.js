import { DataTypes } from "@sequelize/core";
import db from "../db.js";

export const Responses = db.define("Responses", {
	Responses_Content: {
		type: DataTypes.TEXT,
	},
	ResponsesToRes: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
	Role_Responses: {
		type: DataTypes.STRING(20),
	},
});
