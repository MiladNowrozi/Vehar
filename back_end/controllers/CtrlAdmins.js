import { Admin } from "../models/Admins.js";
import { EmailAdmin } from "../models/Admins.js";
import bcrypt from "bcryptjs";
import { News } from "../models/News.js";
import { Op } from "@sequelize/core";

// CREATE Admin
export default class AdminControllers {
	static CreateAdmin = async (req, res) => {
		try {
			const Admin_FirstName = req.body.Admin_FirstName.replace(/\s+/g, " ");
			const Admin_LastName = req.body.Admin_LastName.replace(/\s+/g, " ");
			const Admin_UserName = req.body.Admin_UserName.replace(/\s+/g, "");
			const Admin_Password = req.body.Admin_Password.replace(/\s+/g, "");
			const Admin_Email = req.body.Admin_Email.replace(/\s+/g, "");

			// CHECK EXISTING USER
			try {
				const UserExist = await Admin.findOne({
					where: { Admin_UserName: Admin_UserName },
				});
				const getEmail = await EmailAdmin.findOne({ where: { EmailAdmin: Admin_Email } });

				if (UserExist === null && getEmail === null) {
					try {
						const salt = bcrypt.genSaltSync(10);
						const HashPassword = bcrypt.hashSync(Admin_Password, salt);

						// Hash the password and create a user
						const CreatedAdmin = await Admin.create({
							Admin_FirstName: Admin_FirstName,
							Admin_LastName: Admin_LastName,
							Admin_UserName: Admin_UserName,
							Admin_Password: HashPassword,
						});

						await EmailAdmin.create({ EmailAdmin: Admin_Email, adminId: CreatedAdmin.id });
						const ShowAllAdmin = await Admin.findAll({
							include: [
								{
									model: EmailAdmin,
								},
							],
						});

						res.status(200).json({
							success: true,
							body: ShowAllAdmin,
							message: `نویسنده ${CreatedAdmin.Admin_FirstName + " " + CreatedAdmin.Admin_LastName} با موفقیت اضافه شد!`,
						});
					} catch (error) {
						res.status(412).json({
							success: false,
							message: error.message,
						});
						console.log(error);
					}
				} else {
					res.status(412).json({
						success: false,
						message: "این نویسنده در سیستم موجود است!",
					});
				}
			} catch (error) {
				res.status(500).json({
					success: false,
					message: "متاسفانه عملیات بررسی کاربر موجود ناموفق بود، لطفاً با پشتیبانی تماس بگیرید!",
				});
			}
		} catch (error) {
			res.status(500).json({
				success: false,
				message: "عملیات ساخت دیتابیس ناموفق بود لطفاً با پشتیبانی تماس بگیرید!",
			});
		}
	};

	// CANCEL
	static DismissalAdmin = async (req, res) => {
		if (req.query.id) {
			const GetAdmin = await Admin.findByPk(req.query.id);
			if (GetAdmin.Role === "Admin") {
				await Admin.update(
					{
						Role: "!Admin",
					},
					{
						where: { id: req.query.id },
					}
				);
				const ShowAllAdmin = await Admin.findAll({
					include: [
						{
							model: EmailAdmin,
						},
					],
				});

				res.status(200).json({
					success: true,
					body: ShowAllAdmin,
					message: `مدیریت ${GetAdmin.Admin_FirstName + " " + GetAdmin.Admin_LastName} با موفقیت لغو شد!`,
				});
			} else {
				await Admin.update(
					{
						Role: "Admin",
					},
					{
						where: { id: req.query.id },
					}
				);
				const ShowAllAdmin = await Admin.findAll({
					include: [
						{
							model: EmailAdmin,
						},
					],
				});
				res.status(200).json({
					success: true,
					body: ShowAllAdmin,
					message: `مدیریت ${GetAdmin.Admin_FirstName + " " + GetAdmin.Admin_LastName} با موفقیت فعال شد!`,
				});
			}
		} else {
			res.status(412).json({
				success: false,
				message: "invalid server!",
			});
		}
	};

	// GET
	static GetAdmin = async (req, res) => {
		if (req.query.id) {
			try {
				const existUser = await Admin.findOne({
					where: { id: req.query.id },
					include: [
						{
							model: EmailAdmin,
						},
					],
				});
				if (existUser) {
					res.status(200).json({
						success: true,
						body: existUser,
					});
				} else {
					res.status(404).json({
						success: false,
						message: "this admin not exist!",
					});
				}
			} catch (error) {
				res.status(404).json({
					success: false,
					message: error,
				});
			}
		} else {
			res.status(404).json({
				success: false,
				message: "id is empty!",
			});
		}
	};

	// GET ALL
	static GetAllAdmin = async (req, res) => {
		const ShowAllAdmin = await Admin.findAll({
			include: [
				{
					model: EmailAdmin,
				},
			],
		});
		res.status(200).json({
			success: true,
			body: ShowAllAdmin.length !== 0 ? ShowAllAdmin : ShowAllAdmin,
			message: `${ShowAllAdmin.length === 0 ? "شما هیچ نویسنده ای ندارید !" : ""}`,
		});
	};

	// HISTORY
	static History = async (req, res) => {
		const ShowAllAdmin = await News.findAll({
			where: {
				createdAt: {
					[Op.gte]: new Date() - 3 * 24 * 60 * 60 * 1000,
				},
				authorId: req.user.id,
			},

			attributes: ["id", "News_Titre", "News_Title", "createdAt", "Visit_Count", "Like_Count", "Default_Image", "Category"],
			include: [
				{
					model: Admin,
					attributes: ["Admin_FirstName", "Admin_LastName", "Default_Image"],
				},
			],
		});

		res.status(200).json({
			success: true,
			body: ShowAllAdmin.length > 0 ? ShowAllAdmin : [],
		});
	};

	// UPDATE
	static EditAdmin = async (req, res) => {
		const { firstname, lastname, username, password, email } = req.query;
		try {
			const getAdmin = await Admin.findByPk(req.user.id);
			const getEmailUser = await EmailAdmin.findOne({ where: { adminId: req.user.id } });

			if (firstname || lastname || username || password || email) {
				const salt = bcrypt.genSaltSync(10);
				const HashPassword = bcrypt.hashSync(password, salt);
				await Admin.update(
					{
						Admin_FirstName: firstname ? firstname : getAdmin.Admin_FirstName,
						Admin_LastName: lastname ? lastname : getAdmin.Admin_LastName,
						Admin_Password: password ? HashPassword : getAdmin.Admin_Password,
					},
					{ where: { id: req.user.id } }
				);

				await EmailAdmin.update({ EmailUser: email ? email : getEmailUser.EmailUser }, { where: { adminId: req.user.id } });

				const BackData = await Admin.findOne({
					where: { id: req.user.id },
					include: [
						{
							model: EmailAdmin,
						},
					],
				});
				res.status(200).json({
					success: true,
					body: BackData,
					message: "Admin as ben updated successfully!",
				});
			} else {
				res.status(403).json({
					success: false,
				});
			}
		} catch (error) {
			console.log(error);

			res.status(403).json({
				success: false,
				message: error,
			});
		}
	};

	// DELETE
	static DeleteAdmin = async (req, res) => {
		if (req.query.id) {
			try {
				await Admin.destroy({ where: { id: req.query.id } });
				const ShowAllAdmin = await Admin.findAll({
					include: [
						{
							model: EmailAdmin,
						},
					],
				});
				res.status(200).json({
					success: true,
					body: ShowAllAdmin.length !== 0 ? ShowAllAdmin : ShowAllAdmin,
					message: `${ShowAllAdmin.length === 0 ? "شما هیچ نویسنده ای ندارید !" : ""}`,
				});
			} catch (error) {
				res.status(403).json({
					success: false,
					message: "invalid server!",
				});
			}
		} else {
			res.status(403).json({
				success: false,
				message: "invalid server!",
			});
		}
	};
}
