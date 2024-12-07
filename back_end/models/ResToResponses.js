import { DataTypes } from "@sequelize/core";
import db from "../db.js";

export const ResToResponses = db.define("ResToResponses", {
	ResToResponses_Content: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
});
