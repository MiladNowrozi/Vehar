import { DataTypes } from "@sequelize/core";
import db from "../db.js";
import { ResToResponses } from "./ResToResponses.js";

export const Responses = db.define("Responses", {
	Responses_Content: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
});

Responses.hasMany(ResToResponses, {
	foreignKey: {
		unique: false,
		allowNull: true,
		onDelete: "SET NULL",
		onUpdate: "SET NULL",
	},
});
