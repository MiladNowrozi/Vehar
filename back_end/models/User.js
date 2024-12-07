import { DataTypes } from "@sequelize/core";
import db from "../db.js";
import { Activity } from "./Activity.js";
import { Comment } from "./Comment.js";
import { Like } from "./Like.js";
import { Responses } from "./Responses.js";
import { ResToResponses } from "./ResToResponses.js";
import { ResToRes } from "./ResToRes.js";

export const User = db.define("User", {
	User_FirstName: {
		type: DataTypes.STRING(45),
		allowNull: false,
		validate: {
			notEmpty: {
				msg: "نام، نباید خالی باشد!",
			},
			notNull: {
				msg: "نام، نباید null باشد!",
			},
			len: {
				args: [1, 25],
				msg: "حداکثر طول نام 25 کاراکتر است!",
			},
		},
	},
	User_LastName: {
		type: DataTypes.STRING(45),
		allowNull: false,
		validate: {
			notEmpty: {
				msg: "نام خانوادگی، نباید خالی باشد!",
			},
			notNull: {
				msg: "نام خانوادگی، نباید null باشد!",
			},
			len: {
				args: [1, 25],
				msg: "حداکثر طول نام خانوادگی 25 کاراکتر است!",
			},
		},
	},
	User_UserName: {
		type: DataTypes.STRING(45),
		allowNull: false,
		validate: {
			notEmpty: {
				msg: "نام کاربری، نباید خالی باشد!",
			},
			notNull: {
				msg: "نام کاربری، نباید null باشد!",
			},
			len: {
				args: [1, 30],
				msg: "حداکثر طول نام کاربری 30 کاراکتر است!",
			},
		},
	},
	User_Password: {
		type: DataTypes.STRING(255),
		allowNull: false,
		validate: {
			notEmpty: {
				msg: "رمز عبور، نباید خالی باشد!",
			},
			notNull: {
				msg: "رمز عبور، نباید null باشد!",
			},
			len: {
				args: [1, 255],
				msg: "حداکثر طول نام کاربری 255 کاراکتر است!",
			},
		},
	},
	User_Img: {
		type: DataTypes.STRING(255),
		allowNull: true,
	},
	User_remember: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
	Verify_Email: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
	Role: {
		type: DataTypes.STRING(10),
		defaultValue: "OnUser",
	},
});

export const EmailUser = db.define("EmailUser", {
	EmailUser: {
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

User.hasOne(EmailUser, {
	foreignKey: {
		unique: true,
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
		allowNull: true,
	},
});
User.hasMany(Comment, {
	foreignKey: {
		unique: false,
		allowNull: true,
		onDelete: "SET NULL",
		onUpdate: "SET NULL",
	},
});
User.hasMany(Activity, {
	foreignKey: {
		unique: false,
		allowNull: true,
		onDelete: "SET NULL",
		onUpdate: "SET NULL",
	},
});
User.hasMany(Like, {
	foreignKey: {
		unique: false,
		allowNull: true,
		onDelete: "SET NULL",
		onUpdate: "SET NULL",
	},
});

User.hasMany(Responses, {
	foreignKey: {
		unique: false,
		allowNull: true,
		onDelete: "SET NULL",
		onUpdate: "SET NULL",
	},
});

User.hasMany(ResToResponses, {
	foreignKey: {
		unique: false,
		allowNull: true,
		onDelete: "SET NULL",
		onUpdate: "SET NULL",
	},
});
User.hasMany(ResToRes, {
	foreignKey: {
		unique: false,
		allowNull: true,
		onDelete: "SET NULL",
		onUpdate: "SET NULL",
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
