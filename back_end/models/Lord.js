import { DataTypes } from "@sequelize/core";
import db from "../db.js";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
const HashPassword = bcrypt.hashSync("123", salt);

import { News } from "./News.js";
export const Lord = db.define("Lord", {
	Lord_FirstName: {
		type: DataTypes.STRING(45),
	},
	Lord_LastName: {
		type: DataTypes.STRING(45),
	},
	Lord_UserName: {
		type: DataTypes.STRING(45),
	},
	Lord_Describe: {
		type: DataTypes.STRING(45),
	},
	Lord_Content: {
		type: DataTypes.STRING(45),
	},
	Lord_Password: {
		type: DataTypes.STRING(255),
	},
	Role: {
		type: DataTypes.STRING(100),
		defaultValue: "Lord", // or OffLord
	},
	Lord_Img: {
		type: DataTypes.STRING(255),
		allowNull: true,
	},
	Lord_remember: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
	Verify_Email: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
});
export const EmailLord = db.define("EmailLord", {
	EmailLord: {
		type: DataTypes.STRING(255),
		unique: true,
	},
});

Lord.hasOne(EmailLord, {
	foreignKey: {
		unique: true,
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
		allowNull: true,
	},
});

db.queryInterface.tableExists("Lords").then(async (e) => {
	if (!e) {
		try {
			await Lord.sync({ alter: true });
			const CreatedLordLord = await Lord.create({
				Lord_FirstName: "حسین",
				Lord_LastName: "ناصری",
				Lord_UserName: "Milad@2009",
				Lord_Describe: "مالک پایگاه خبری وهار",
				Lord_Content: "فراموش نشود",
				Lord_Password: HashPassword,
				Lord_Img: "http://localhost:5000/get-images?name=vehar.irunnamed.jpg",
			});
			db.queryInterface.tableExists("EmailLords").then(async (e) => {
				if (!e) {
					try {
						await EmailLord.sync({ alter: true });
						await EmailLord.create({
							EmailLord: "vahdatvjod@gmail.com",
							lordId: CreatedLordLord.id,
						});
					} catch (error) {
						console.log(`table EmailLord not created! : ${error}`);
					}
				}
				return;
			});
		} catch (error) {
			console.log(`table Lord not created! : ${error}`);
		}
	}
	return;
});
