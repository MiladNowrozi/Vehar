import { Author } from "../models/Author.js";
import { Token } from "../models/Token.js";
import { EmailAuthor } from "../models/Author.js";
import bcrypt from "bcryptjs";

// CREATE Author

export default class AuthorControllers {
	static CreateAuthor = async (req, res) => {
		try {
			const Author_FirstName = req.body.Author_FirstName.replace(/\s+/g, " ");
			const Author_LastName = req.body.Author_LastName.replace(/\s+/g, " ");
			const Author_UserName = req.body.Author_UserName.replace(/\s+/g, "");
			const Author_Password = req.body.Author_Password.replace(/\s+/g, "");
			const Author_Email = req.body.Author_Email.replace(/\s+/g, "");

			// CHECK EXISTING USER
			try {
				const UserExist = await Author.findOne({
					where: { Author_UserName: Author_UserName },
				});
				const getEmail = await EmailAuthor.findOne({ where: { EmailAuthor: Author_Email } });
				const countRequestUser = await Token.findAll({ where: { Email: Author_Email } });
				if (countRequestUser.length === 0) {
					if (UserExist === null && getEmail === null) {
						try {
							const salt = bcrypt.genSaltSync(10);
							const HashPassword = bcrypt.hashSync(Author_Password, salt);

							// Hash the password and create a user
							const CreatedAuthor = await Author.create({
								Author_FirstName: Author_FirstName,
								Author_LastName: Author_LastName,
								Author_UserName: Author_UserName,
								Author_Password: HashPassword,
							});
							await EmailAuthor.create({ EmailAuthor: Author_Email, authorId: CreatedAuthor.id });
							const ShowAllAuthor = await Author.findAll({
								include: [
									{
										model: EmailAuthor,
										required: false, // This will include users even if they have no emails
									},
								],
							});
							const AllAuthor = ShowAllAuthor.map((e) => {
								return {
									id: e.id,
									Author_FirstName: e.Author_FirstName,
									Author_LastName: e.Author_LastName,
									emailAuthor: e.emailAuthor.EmailAuthor,
									Role: e.Role,
									Verify_Email: e.Verify_Email,
									createdAt: e.createdAt,
									updatedAt: e.updatedAt,
								};
							});
							res.status(200).json({
								success: true,
								body: AllAuthor,
								message: `نویسنده ${CreatedAuthor.Author_FirstName + " " + CreatedAuthor.Author_LastName} با موفقیت اضافه شد!`,
							});
						} catch (error) {
							res.status(412).json({
								success: false,
								message: error.message,
							});
						}
					} else {
						if (UserExist !== null && !UserExist.verify_email) {
							if (countRequestUser.length === 0) {
								res.status(200).json({
									success: true,
									message: `پیامکی جهت تایید ایمیل، به ایمیل ${Author_Email} ارسال شد(اعتبار پیامک 5 دقیقه) !`,
								});
							} else {
								res.status(412).json({
									success: false,
									message: "درخواست قبلی شما در حال بررسی است لطفاً صبور باشید!",
								});
							}
						} else {
							res.status(412).json({
								success: false,
								message: "این نویسنده در سیستم موجود است!",
							});
						}
					}
				} else {
					res.status(412).json({
						success: false,
						message: "درخواست قبلی شما در حال بررسی است لطفاً صبور باشید!",
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
	static CancelAuthor = async (req, res) => {
		if (req.params.id) {
			const GetAuthor = await Author.findByPk(req.params.id);
			if (GetAuthor.Role === "OnAuthor") {
				await Author.update(
					{
						Role: "OffAuthor",
					},
					{
						where: { id: req.params.id },
					}
				);
				const ShowAllAuthor = await Author.findAll({
					include: [
						{
							model: EmailAuthor,
							required: false, // This will include users even if they have no emails
						},
					],
				});
				const AllAuthor = ShowAllAuthor.map((e) => {
					console.log();
					return {
						id: e.id,
						Author_FirstName: e.Author_FirstName,
						Author_LastName: e.Author_LastName,
						emailAuthor: e.emailAuthor.EmailAuthor,
						Role: e.Role,
						Verify_Email: e.Verify_Email,
						createdAt: e.createdAt,
						updatedAt: e.updatedAt,
					};
				});
				res.status(200).json({
					success: true,
					body: AllAuthor,
					message: `مدیریت ${GetAuthor.Author_FirstName + " " + GetAuthor.Author_LastName} با موفقیت لغو شد!`,
				});
			} else {
				await Author.update(
					{
						Role: "OnAuthor",
					},
					{
						where: { id: req.params.id },
					}
				);
				const ShowAllAuthor = await Author.findAll({
					include: [
						{
							model: EmailAuthor,
							required: false, // This will include users even if they have no emails
						},
					],
				});
				const AllAuthor = ShowAllAuthor.map((e) => {
					return {
						id: e.id,
						Author_FirstName: e.Author_FirstName,
						Author_LastName: e.Author_LastName,
						emailAuthor: e.emailAuthor.EmailAuthor,
						Role: e.Role,
						Verify_Email: e.Verify_Email,
						createdAt: e.createdAt,
						updatedAt: e.updatedAt,
					};
				});
				res.status(200).json({
					success: true,
					body: AllAuthor,
					message: `مدیریت ${GetAuthor.Author_FirstName + " " + GetAuthor.Author_LastName} با موفقیت فعال شد!`,
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
	static GetAuthor = async (req, res) => {};

	// GET ALL
	static GetAllAuthor = async (req, res) => {
		const ShowAllAuthor = await Author.findAll({
			include: [
				{
					model: EmailAuthor,
					required: false, // This will include users even if they have no emails
				},
			],
		});
		const AllAuthor = ShowAllAuthor.map((e) => {
			return {
				id: e.id,
				Author_FirstName: e.Author_FirstName,
				Author_LastName: e.Author_LastName,
				emailAuthor: e.emailAuthor.EmailAuthor,
				Role: e.Role,
				Verify_Email: e.Verify_Email,
				createdAt: e.createdAt,
				updatedAt: e.updatedAt,
			};
		});
		if (ShowAllAuthor.length !== 0) {
			res.status(200).json({
				success: true,
				body: AllAuthor,
				message: "all Author received successfully!",
			});
		} else {
			res.status(403).json({
				success: false,
				message: "شما هیچ نویسنده ای ندارید !",
			});
		}
	};

	// UPDATE
	static UpdateAuthor = async (req, res) => {};

	// DELETE
	static DeleteAuthor = async (req, res) => {
		if (req.params.id) {
			try {
				await Author.destroy({ where: { id: req.params.id } });
				const ShowAllAuthor = await Author.findAll({
					include: [
						{
							model: EmailAuthor,
							required: false, // This will include users even if they have no emails
						},
					],
				});
				const AllAuthor = ShowAllAuthor.map((e) => {
					return {
						id: e.id,
						Author_FirstName: e.Author_FirstName,
						Author_LastName: e.Author_LastName,
						emailAuthor: e.emailAuthor.EmailAuthor,
						Role: e.Role,
						Verify_Email: e.Verify_Email,
						createdAt: e.createdAt,
						updatedAt: e.updatedAt,
					};
				});
				if (AllAuthor.length !== 0) {
					res.status(200).json({
						success: true,
						body: AllAuthor,
						message: "نویسنده با موفقیت حذف شد!",
					});
				} else {
					res.status(200).json({
						success: true,
						body: AllAuthor,
						message: "شما هیچ نویسنده ای ندارید !",
					});
				}
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
