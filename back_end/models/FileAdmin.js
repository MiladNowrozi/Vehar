import { DataTypes } from "@sequelize/core";
import db from "../db.js";
import { Admin } from "./Admins.js";
export const FileAdmin = db.define("FileAdmin", {
	FilePath: {
		type: DataTypes.STRING,
	},
});

Admin.hasMany(FileAdmin, {
	foreignKey: {
		unique: false,
		allowNull: true,
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	},
});
