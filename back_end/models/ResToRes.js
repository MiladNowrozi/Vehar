import { DataTypes } from "@sequelize/core";
import db from "../db.js";
import { ResToResponses } from "./ResToResponses.js";

export const ResToRes = db.define("ResToRes", {
	ResToRes_Content: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
});

ResToResponses.hasMany(ResToRes, {
	foreignKey: {
		unique: false,
		allowNull: true,
		onDelete: "SET NULL",
		onUpdate: "SET NULL",
	},
});
