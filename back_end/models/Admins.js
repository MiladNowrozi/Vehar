import { DataTypes } from "@sequelize/core";
import db from "../db.js";
import { News } from "./News.js";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
const HashPassword = bcrypt.hashSync("123", salt);
export const Admin = db.define("Admin", {
	Admin_FirstName: {
		type: DataTypes.STRING(45),
		allowNull: false,
	},
	Admin_LastName: {
		type: DataTypes.STRING(45),
		allowNull: false,
	},
	Admin_UserName: {
		type: DataTypes.STRING(45),
		allowNull: false,
	},
	Admin_Password: {
		type: DataTypes.STRING(255),
		allowNull: false,
	},
	Default_Image: {
		type: DataTypes.STRING(255),
		allowNull: true,
		defaultValue: "http://87.107.105.139/api/download/user?name=avatar-1577909_1920.png",
	},
	Role: {
		type: DataTypes.STRING(100),
		defaultValue: "Admin", // vs !Admin
	},
	Admin_Remember: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
	Verify_Email: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
});
export const EmailAdmin = db.define("EmailAdmin", {
	EmailAdmin: {
		type: DataTypes.STRING(255),
		allowNull: false,
		unique: true,
		validate: {
			isEmail: {
				msg: "ایمیل نامعتبر است!",
			},
		},
	},
});

Admin.hasOne(EmailAdmin, {
	foreignKey: {
		unique: true,
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
		allowNull: true,
	},
});
Admin.hasMany(News, {
	foreignKey: {
		name: "authorId",
		unique: false,
		allowNull: true,
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	},
});

db.queryInterface.tableExists("Admins").then(async (e) => {
	if (!e) {
		try {
			await Admin.sync({ alter: true });
			const CreatedAdmin = await Admin.create({
				Admin_FirstName: "حسین",
				Admin_LastName: "ناصری",
				Admin_UserName: "Milad@2009",
				Admin_Password: HashPassword,
				Role: "Lord",
				Admin_remember: false,
				Verify_Email: true,
				Default_Image: "http://87.107.105.139/api/download/user?name=avatar-1577909_1920.png",
			});
			db.queryInterface.tableExists("EmailAdmins").then(async (e) => {
				if (!e) {
					try {
						await EmailAdmin.sync({ alter: true });
						await EmailAdmin.create({ EmailAdmin: "vahdatvjod@gmail.com", adminId: CreatedAdmin.id });
					} catch (error) {
						console.log(`table EmailAdmin not created! : ${error}`);
					}
				}
				return;
			});
		} catch (error) {
			console.log(`table Admin not created! : ${error}`);
		}
	}
});
