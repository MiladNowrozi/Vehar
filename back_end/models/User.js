import { DataTypes } from "@sequelize/core";
import db from "../db.js";
import { Activity } from "./Activity.js";
import { Comment } from "./Comment.js";
import { Like } from "./Like.js";
import { Responses } from "./Responses.js";

export const User = db.define("User", {
	User_FirstName: {
		type: DataTypes.STRING(45),
	},
	User_LastName: {
		type: DataTypes.STRING(45),
	},
	User_UserName: {
		type: DataTypes.STRING(45),
	},
	User_Password: {
		type: DataTypes.STRING(255),
	},
	Default_Image: {
		type: DataTypes.STRING(255),
		allowNull: true,
		defaultValue: "https://vehar.ir/api/download/user?name=default-profile.jpg",
	},
	User_Remember: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
	Verify_Email: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
	Role: {
		type: DataTypes.STRING(10),
		defaultValue: "User",
	},
});

export const EmailUser = db.define("EmailUser", {
	EmailUser: {
		type: DataTypes.STRING(255),
	},
});

User.hasOne(EmailUser, {
	foreignKey: {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
		allowNull: true,
	},
});
User.hasMany(Comment, {
	foreignKey: {
		unique: false,
		allowNull: true,
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	},
});
User.hasMany(Activity, {
	foreignKey: {
		unique: false,
		allowNull: true,
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	},
});
User.hasMany(Like, {
	foreignKey: {
		unique: false,
		allowNull: true,
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	},
});

User.hasMany(Responses, {
	foreignKey: {
		unique: false,
		allowNull: true,
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	},
});

// db.queryInterface.tableExists("Users").then(async (e) => {
// 	if (!e) {
// 		try {
// 			await User.sync({ alter: true });
// 		} catch (error) {
// 			console.log(`table user not created! : ${error}`);
// 		}
// 	}
// });

// db.queryInterface.tableExists("EmailUsers").then(async (e) => {
// 	if (!e) {
// 		try {
// 			await EmailUser.sync({ alter: true });
// 		} catch (error) {
// 			console.log(`table email not created! : ${error}`);
// 		}
// 	}
// });
