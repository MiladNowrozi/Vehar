import { DataTypes } from "@sequelize/core";
import db from "../db.js";
import { News } from "./News.js";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
const HashPassword = bcrypt.hashSync("123", salt);
export const Author = db.define("Author", {
	Author_FirstName: {
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
	Author_LastName: {
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
	Author_UserName: {
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
	Author_Password: {
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
	Role: {
		type: DataTypes.STRING(100),
		defaultValue: "OnAuthor", // or OffAuthor
	},
	Author_Img: {
		type: DataTypes.STRING(255),
		allowNull: true,
	},
	Author_remember: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
	Verify_Email: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
});
export const EmailAuthor = db.define("EmailAuthor", {
	EmailAuthor: {
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

Author.hasOne(EmailAuthor, {
	foreignKey: {
		unique: true,
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
		allowNull: true,
	},
});
Author.hasMany(News, {
	foreignKey: {
		unique: false,
		allowNull: true,
		onDelete: "SET NULL",
		onUpdate: "SET NULL",
	},
});

// db.queryInterface.tableExists("EmailAuthors").then(async (e) => {
// 	if (!e) {
// 		try {
// 			await EmailAuthor.sync({ alter: true });
// 		} catch (error) {
// 			console.log(`table EmailAuthor not created! : ${error}`);
// 		}
// 	}
// 	return;
// });
// db.queryInterface.tableExists("Authors").then(async (e) => {
// 	if (!e) {
// 		try {
// 			await Author.sync({ alter: true });
// 		} catch (error) {
// 			console.log(`table Author not created! : ${error}`);
// 		}
// 	}
// 	return;
// });

db.queryInterface.tableExists("Authors").then(async (e) => {
	if (!e) {
		try {
			await Author.sync({ alter: true });
			const CreatedLordAuthor = await Author.create({
				Author_FirstName: "حسین",
				Author_LastName: "ناصری",
				Author_UserName: "Milad@2009",
				Author_Password: HashPassword,
				Role: "Lord",
				Author_Img: "http://localhost:5000/get-images?name=vehar.irunnamed.jpg",
				Author_remember: false,
				Verify_Email: false,
			});
			db.queryInterface.tableExists("EmailAuthors").then(async (e) => {
				if (!e) {
					try {
						await EmailAuthor.sync({ alter: true });
						await EmailAuthor.create({ EmailAuthor: "vahdatvjod@gmail.com", authorId: CreatedLordAuthor.id });
					} catch (error) {
						console.log(`table EmailAuthor not created! : ${error}`);
					}
				}
				return;
			});
		} catch (error) {
			console.log(`table Author not created! : ${error}`);
		}
	}
});
