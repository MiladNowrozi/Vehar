import { DataTypes } from "@sequelize/core";
import db from "../db.js";

export const SubCategory = db.define("SubCategory", {
	SubCategory: {
		type: DataTypes.STRING(50),
	},
	Category: {
		type: DataTypes.STRING(50),
	},
});

// db.queryInterface.tableExists("SubCategory").then(async (e) => {
// 	if (!e) {
// 		try {
// 			await SubCategory.sync({ alter: true });
// 		} catch (error) {
// 			console.log(`table SubCategory not created! : ${error}`);
// 		}
// 	}
// 	return;
// });
