import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//
import { EmailUser, User } from "../models/User.js";
import { sendEmail } from "../utils/sendEmail.js";
import { Token } from "../models/Token.js";
import { Author, EmailAuthor } from "../models/Author.js";
import { Lord } from "../models/Lord.js";

//
export const RegisterToken = async (req, res) => {
	try {
		if (req.query.Role === "User") {
			const TokenExist = await Token.findOne({ where: { Token: req.query.verify_token } });
			const HeckVerifyUser = await User.findByPk(req.query.Id);
			if (TokenExist !== null && !HeckVerifyUser.Verify_Email) {
				await Token.destroy({ where: { Token: req.query.verify_token }, force: true });
				await User.update(
					{ Verify_Email: true },
					{
						where: { id: HeckVerifyUser.id },
					}
				);
				res.send("ایمیل شما با موفقیت تایید شد، لطفاً به صفحه ورود مراجعه کنید!");
			} else {
				res.send("لینک اعتبار سنجی ایمیل کاربر، نامعتبر است!");
			}
		}
		if (req.query.Role === "Author") {
			const TokenExist = await Token.findOne({ where: { Token: req.query.verify_token } });
			const HeckVerifyAuthor = await Author.findByPk(req.query.Id);
			if (TokenExist !== null && !HeckVerifyAuthor.Verify_Email) {
				await Token.destroy({ where: { Token: req.query.verify_token }, force: true });
				await Author.update(
					{ Verify_Email: true },
					{
						where: { id: HeckVerifyAuthor.id },
					}
				);
				res.send("ایمیل شما با موفقیت تایید شد، لطفاً به صفحه ورود مراجعه کنید!");
			} else {
				res.send("لینک اعتبار سنجی ایمیل نویسنده، نامعتبر است!");
			}
		}
	} catch (error) {
		res.send("لینک نامعتبر است!");
	}
};

export const PasswordForgot = async (req, res) => {
	const username_forgot = req.body.username_forgot.replace(/\s+/g, " ");
	const password_forgot = req.body.password_forgot.replace(/\s+/g, "");
	try {
		const existEmail = await EmailUser.findOne({ where: { Email: req.body.email_forgot } });
		if (existEmail) {
			const user = await existEmail.getUser();
			const salt = bcrypt.genSaltSync(10);
			const HashPassword = bcrypt.hashSync(password_forgot, salt);
			await user.update({
				username: username_forgot,
				password: HashPassword,
			});
			res.status(200).json({
				success: true,
				message: "نام کاربری و رمز عبور شما با موفقیت تغییر کرد لطفاً به صفحه ورود مراجعه کنید!",
			});
		} else {
			res.status(404).json({
				success: false,
				message: "ایمیل نامعتبر است!",
			});
		}
	} catch (error) {
		res.status(404).json({
			success: false,
			message: error.message,
		});
	}
};

export const AuthToken = async (req, res, next) => {
	const accessToken = req.headers["authorization"]?.split(" ")[1];
	if (!accessToken || accessToken === undefined) {
		return res.sendStatus(401);
	}
	jwt.verify(accessToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
		if (err) {
			return res.status(401).json({
				success: false,
				message: "invalid server AuthToken",
			});
		}
		req.user = user;
		next();
	});
};

export const RefreshToken = async (req, res) => {
	const { refreshToken, Role } = req.body;
	if (!refreshToken || refreshToken === undefined) {
		return res.sendStatus(401);
	}

	try {
		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
			if (err) {
				return res.status(401).json({
					success: false,
					message: "invalid server RefreshToken",
				});
			}

			if (Role === "OnUser") {
				const refreshToken = jwt.sign(
					{ id: user.id, Role: user.Role, User_UserName: user.User_UserName },
					process.env.REFRESH_TOKEN_SECRET,
					{
						expiresIn: "1h",
					}
				);
				const accessToken = jwt.sign(
					{ id: user.id, Role: user.Role, User_UserName: user.User_UserName },
					process.env.REFRESH_TOKEN_SECRET,
					{
						expiresIn: "5s",
					}
				);
				res.status(200).json({
					success: true,
					body: {
						Role: "OnUser",
						refreshToken: refreshToken,
						accessToken: accessToken,
					},
				});
			}
			if (Role === "OnAuthor") {
				const refreshToken = jwt.sign(
					{ id: user.id, Role: user.Role, Author_UserName: user.Author_UserName },
					process.env.REFRESH_TOKEN_SECRET,
					{
						expiresIn: "1h",
					}
				);
				const accessToken = jwt.sign(
					{ id: user.id, Role: user.Role, Author_UserName: user.Author_UserName },
					process.env.REFRESH_TOKEN_SECRET,
					{
						expiresIn: "5s",
					}
				);
				res.status(200).json({
					success: true,
					body: {
						Role: "OnAuthor",
						refreshToken: refreshToken,
						accessToken: accessToken,
					},
				});
			}
			if (Role === "Lord") {
				const refreshToken = jwt.sign(
					{ id: user.id, Role: user.Role, Lord_UserName: user.Lord_UserName },
					process.env.REFRESH_TOKEN_SECRET,
					{
						expiresIn: "1h",
					}
				);
				const accessToken = jwt.sign(
					{ id: user.id, Role: user.Role, Lord_UserName: user.Lord_UserName },
					process.env.REFRESH_TOKEN_SECRET,
					{
						expiresIn: "5s",
					}
				);
				res.status(200).json({
					success: true,
					body: {
						Role: "Lord",
						refreshToken: refreshToken,
						accessToken: accessToken,
					},
				});
			}
		});
	} catch (error) {
		res.status(404).json({
			success: false,
			message: error,
		});
	}
};

export const Register = async (req, res) => {
	try {
		const firstName_register = req.body.firstName_register.replace(/\s+/g, " ");
		const lastName_register = req.body.lastName_register.replace(/\s+/g, " ");
		const username_register = req.body.username_register.replace(/\s+/g, "");
		const password_register = req.body.password_register.replace(/\s+/g, "");
		const email_register = req.body.email_register.replace(/\s+/g, "");

		// CHECK EXISTING USER
		try {
			const UserExist = await User.findOne({
				where: { User_UserName: username_register },
			});
			const getEmail = await EmailUser.findOne({ where: { EmailUser: email_register } });
			const countRequestUser = await Token.findAll({ where: { Email: email_register } });

			if (countRequestUser.length === 0) {
				if (UserExist === null && getEmail === null) {
					const CheckInLord = await Lord.findOne({ where: { Lord_UserName: username_register } });
					const CheckInAuthor = await Author.findOne({ where: { Author_UserName: username_register } });
					if (CheckInLord === null && CheckInAuthor === null) {
						try {
							const token = jwt.sign({ email: email_register }, "secret");
							await Token.create({ Token: token, Email: email_register });
							const ResetToken = await Token.findOne({ where: { Token: token } });
							const salt = bcrypt.genSaltSync(10);
							const HashPassword = bcrypt.hashSync(password_register, salt);

							// Hash the password and create a user
							const CreatedUser = await User.create({
								User_FirstName: firstName_register,
								User_LastName: lastName_register,
								User_UserName: username_register,
								User_Password: HashPassword,
							});
							await EmailUser.create({ EmailUser: email_register, userId: CreatedUser.id });
							const url = `${process.env.BASE_URL}/auth/register/?verify_token=${token}&Id=${CreatedUser.id}&Role=User`;
							await sendEmail(
								email_register,
								"تایید ایمیل",
								"لطفا برای تایید ایمیل خود روی دکمه (تایید ایمیل) کلیک کنید",
								`<a href=${url}>
									<button>تایید ایمیل</button>
								</a>
								`
							);
							setTimeout(async () => {
								await Token.destroy({ where: { Token: ResetToken.Token } });
							}, 1000 * 60 * 1);
							res.status(200).json({
								success: true,
								message: "پیامکی جهت تایید ایمیل، به ایمیل شما ارسال شد(اعتبار پیامک 5 دقیقه) !",
							});
						} catch (error) {
							res.status(412).json({
								success: false,
								message: error.message,
							});
						}
					} else {
						res.status(403).json({
							success: false,
							message: "نام کاربری نامعتبر است!",
						});
					}
				} else {
					if (UserExist !== null && !UserExist.Verify_Email) {
						const countRequestUser = await Token.findAll({ where: { Email: email_register } });
						if (countRequestUser.length === 0) {
							const token = jwt.sign({ email: email_register }, "secret");
							await Token.create({ Token: token, Email: email_register });
							const ResetToken = await Token.findOne({ where: { Token: token } });
							const url = `${process.env.BASE_URL}/auth/register/?verify_token=${token}&Id=${UserExist.id}&Role=User`;

							await sendEmail(
								email_register,
								"تایید ایمیل",
								"لطفا برای تایید ایمیل خود روی دکمه (تایید ایمیل) کلیک کنید",
								`<a href=${url}>
                  <button>تایید ایمیل</button>
                 </a>
                `
							);
							setTimeout(async () => {
								await Token.destroy({ where: { Token: ResetToken.Token } });
							}, 1000 * 60 * 1);
							res.status(200).json({
								success: true,
								message: "پیامکی جهت تایید ایمیل، به ایمیل شما ارسال شد(اعتبار پیامک 5 دقیقه) !",
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
							message: "شما قبلاً ثبت نام کرده اید،لطفاً به صفحه ورود مراجعه کنید!",
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

export const Login = async (req, res) => {
	try {
		const username_login = req.body.username_login.replace(/\s+/g, "");
		const password_login = req.body.password_login.replace(/\s+/g, "");
		try {
			const ExistUser = await User.findOne({
				where: { User_UserName: username_login },
			});
			const ExistAuthor = await Author.findOne({
				where: { Author_UserName: username_login },
			});
			const ExistLord = await Lord.findOne({
				where: { Lord_UserName: username_login },
			});

			// CHECK USER FULL INFO
			if (ExistUser !== null && ExistUser.Role === "OnUser") {
				const GetUserByPk = await User.findByPk(ExistUser.id);
				const CheckUserFullInfo = await User.findOne({
					where: {
						id: GetUserByPk.id,
						User_UserName: username_login,
					},
				});
				const isPasswordCurrent = bcrypt.compareSync(password_login, CheckUserFullInfo.User_Password);
				if (isPasswordCurrent) {
					if (!CheckUserFullInfo.Verify_Email) {
						try {
							const getUser = await User.findOne({
								where: { User_UserName: CheckUserFullInfo.User_UserName },
							});
							const getEmail = await EmailUser.findOne({ where: { userId: getUser.id } });
							const countRequestUser = await Token.findAll({ where: { Email: getEmail.email } });

							if (countRequestUser.length === 0) {
								const TokenEmail = jwt.sign({ email: getEmail.email }, "secret");
								const url = `${process.env.BASE_URL}/auth/register/?verify_token=${TokenEmail}&Id=${getUser.id}&Role=user`;
								const ExistToken = await Token.create({
									Token: TokenEmail,
									Email: getEmail.email,
								});
								await sendEmail(
									getEmail.email,
									"تایید ایمیل",
									"لطفا برای تایید ایمیل خود روی دکمه (تایید ایمیل) کلیک کنید",
									`<a href=${url}>
			            <button>تایید ایمیل</button>
			            </a>
			            `
								);
								setTimeout(async () => {
									await Token.destroy({ where: { Token: ExistToken.Token } });
								}, 1000 * 60 * 5);
								res.status(200).json({
									success: false,
									message: "پیامکی جهت تایید ایمیل، به ایمیل شما ارسال شد(اعتبار پیامک 5 دقیقه) !",
								});
							} else {
								res.status(404).json({
									success: false,
									message: "درخواست قبلی شما در حال بررسی است لطفاً صبور باشید!",
								});
							}
						} catch (error) {
							res.status(404).json({
								success: false,
								message: "عملیات بررسی صحت ایمیل شما ناموفق بود، لطفاً دوباره تلاش کنید!",
							});
						}
					} else {
						// full time: Date.now() + 7 * 24 * 60 * 60 * 1000  // days
						const refreshToken = jwt.sign(
							{ id: ExistUser.id, Role: ExistUser.Role, User_UserName: ExistUser.User_UserName },
							process.env.REFRESH_TOKEN_SECRET,
							{
								expiresIn: "1h",
							}
						);
						const accessToken = jwt.sign(
							{ id: ExistUser.id, Role: ExistUser.Role, User_UserName: ExistUser.User_UserName },
							process.env.REFRESH_TOKEN_SECRET,
							{
								expiresIn: "5s",
							}
						);
						// Store refresh token with expiration time

						res.status(200).json({
							body: {
								accessToken: accessToken,
								refreshToken: refreshToken,
								Role: "OnUser",
							},
							success: true,
						});
					}
				} else {
					res.status(404).json({
						success: false,
						message: "رمز عبور اشتباه است!",
					});
				}
			}
			// CHECK Author FULL INFO
			else if (ExistAuthor !== null && ExistAuthor.Role === "OnAuthor") {
				const isPasswordCurrent = bcrypt.compareSync(password_login, ExistAuthor.Author_Password);
				if (isPasswordCurrent) {
					if (!ExistAuthor.Verify_Email) {
						try {
							const getEmail = await EmailAuthor.findOne({ where: { authorId: ExistAuthor.id } });
							const countRequestUser = await Token.findAll({ where: { Email: getEmail.EmailAuthor } });

							if (countRequestUser.length === 0) {
								const TokenEmail = jwt.sign({ email: getEmail.EmailAuthor }, "secret");
								const url = `${process.env.BASE_URL}/auth/register/?verify_token=${TokenEmail}&Id=${ExistAuthor.id}&Role=Author`;
								const ExistToken = await Token.create({
									Token: TokenEmail,
									Email: getEmail.EmailAuthor,
								});
								await sendEmail(
									getEmail.EmailAuthor,
									"تایید ایمیل",
									"لطفا برای تایید ایمیل خود روی دکمه (تایید ایمیل) کلیک کنید",
									`<a href=${url}>
			            <button>تایید ایمیل</button>
			            </a>
			            `
								);
								setTimeout(async () => {
									await Token.destroy({ where: { Token: ExistToken.Token } });
								}, 1000 * 60 * 1);
								res.status(200).json({
									success: false,
									message: "پیامکی جهت تایید ایمیل، به ایمیل شما ارسال شد(اعتبار پیامک 5 دقیقه) !",
								});
							} else {
								res.status(404).json({
									success: false,
									message: "درخواست قبلی شما در حال بررسی است لطفاً صبور باشید!",
								});
							}
						} catch (error) {
							res.status(404).json({
								success: false,
								message: "عملیات بررسی صحت ایمیل شما ناموفق بود، لطفاً دوباره تلاش کنید!",
							});
						}
					} else {
						// full time: Date.now() + 7 * 24 * 60 * 60 * 1000  // days
						const refreshToken = jwt.sign(
							{ id: ExistAuthor.id, Role: ExistAuthor.Role, Author_UserName: ExistAuthor.Author_UserName },
							process.env.REFRESH_TOKEN_SECRET,
							{
								expiresIn: "1h",
							}
						);
						const accessToken = jwt.sign(
							{ id: ExistAuthor.id, Role: ExistAuthor.Role, Author_UserName: ExistAuthor.Author_UserName },
							process.env.REFRESH_TOKEN_SECRET,
							{
								expiresIn: "5m",
							}
						);
						// Store refresh token with expiration time

						res.status(200).json({
							body: {
								accessToken: accessToken,
								refreshToken: refreshToken,
								Role: "OnAuthor",
							},
							success: true,
						});
					}
				} else {
					res.status(404).json({
						success: false,
						message: "رمز عبور اشتباه است!",
					});
				}
			}

			// CHECK Lord  FULL INFO
			else if (ExistLord !== null && ExistAuthor.Role === "Lord") {
				// Asynchronous run 👇
				// const buf = randomBytes(256).toString("hex");
				const isPasswordCurrent = bcrypt.compareSync(password_login, ExistLord.Lord_Password);
				if (isPasswordCurrent) {
					// full time: Date.now() + 7 * 24 * 60 * 60 * 1000  // days
					const refreshToken = jwt.sign(
						{ id: ExistLord.id, Role: ExistLord.Role, Lord_UserName: ExistLord.Lord_UserName },
						process.env.REFRESH_TOKEN_SECRET,
						{
							expiresIn: "1h",
						}
					);
					const accessToken = jwt.sign(
						{ id: ExistLord.id, Role: ExistLord.Role, Lord_UserName: ExistLord.Lord_UserName },
						process.env.REFRESH_TOKEN_SECRET,
						{
							expiresIn: "5m",
						}
					);
					// Store refresh token with expiration time

					res.status(200).json({
						body: {
							accessToken: accessToken,
							refreshToken: refreshToken,
							Role: "Lord",
						},
						success: true,
					});
				} else {
					res.status(404).json({
						success: false,
						message: "نام کاربری یا رمز عبور اشتباه است!",
					});
				}
			} else {
				res.status(404).json({
					success: false,
					message: "رمز عبور یا نام کاربری اشتباه است!",
				});
			}
		} catch (error) {
			res.status(500).json({
				success: false,
				message: "متاسفانه عملیات بررسی اطلاعات شما ناموفق بود، لطفاً با پشتیبانی تماس بگیرید!",
			});
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "عملیات ساخت دیتابیس ناموفق بود لطفاً با پشتیبانی تماس بگیرید!",
		});
	}
};

export const Logout = async (req, res) => {
	res
		.clearCookie("access_token", {
			sameSite: "none",
			secure: true,
		})
		.status(200)
		.json("user has been logged out.");
};
