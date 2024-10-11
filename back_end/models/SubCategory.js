import { DataTypes } from "@sequelize/core";
import db from "../db.js";

export const SubCategory = db.define("SubCategory", {
	SubCategory: {
		type: DataTypes.STRING(255),
		allowNull: false,
		validate: {
			notEmpty: {
				msg: "news SubCategory should not be empty! ",
			},
			notNull: {
				msg: "news SubCategory should not be null!",
			},
			len: {
				args: [1, 50],
				msg: "news SubCategory should not be than more than 50!",
			},
		},
	},
});

db.queryInterface.tableExists("SubCategory").then(async (e) => {
	if (!e) {
		try {
			await SubCategory.sync({ alter: true });
		} catch (error) {
			console.log(`table SubCategory not created! : ${error}`);
		}
	}
	return;
});
