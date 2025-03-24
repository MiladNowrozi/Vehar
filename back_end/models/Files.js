import { DataTypes } from "@sequelize/core";
import db from "../db.js";
import { Admin } from "./Admins.js";
export const Files = db.define("Files", {
	OriginalName: {
		type: DataTypes.STRING(255),
	},
	FileName: {
		type: DataTypes.STRING(255),
	},
	FilePath: {
		type: DataTypes.STRING(255),
	},
	MimeType: {
		type: DataTypes.STRING(15),
	},
});

Admin.hasMany(Files, {
	foreignKey: {
		unique: false,
		allowNull: true,
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	},
});
