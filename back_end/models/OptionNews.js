import { DataTypes } from "@sequelize/core";
import db from "../db.js";
import { News } from "./News.js";

export const OptionNews = db.define("OptionNews", {
	Option: {
		type: DataTypes.STRING(50),
		allowNull: false,
		unique: true,
		validate: {
			notEmpty: {
				msg: "news OptionNews should not be empty! ",
			},
			notNull: {
				msg: "news OptionNews should not be null!",
			},
			len: {
				args: [1, 50],
				msg: "news OptionNews should not be than more than 50!",
			},
		},
	},
});

OptionNews.hasMany(News, {
	foreignKey: {
		unique: false,
		allowNull: true,
		onDelete: "SET NULL",
		onUpdate: "SET NULL",
	},
});

db.queryInterface.tableExists("OptionNews").then(async (e) => {
	if (!e) {
		try {
			await OptionNews.sync({ alter: true });
			await OptionNews.bulkCreate([
				{ Option: "پربیننده ها" },
				{ Option: "منتخب" },
				{ Option: "اخبار ویژه" },
				{ Option: "یادداشت" },
				{ Option: "آخرین اخبار" },
				{ Option: "برای مطالعه" },
			]);
		} catch (error) {
			console.log(`table OptionNews not created! : ${error}`);
		}
	}
	return;
});

// ADD A OPTION NEWS

// try {
// 	await OptionNews.create({
// 		Option: "",
// 	});
// } catch (error) {
// 	console.log(`from line 57 in back_end/models/OptionNews.js:${error.message}`);
// }
