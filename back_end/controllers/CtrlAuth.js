import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//
import { EmailUser, User } from "../models/User.js";
import { sendEmail } from "../utils/sendEmail.js";
import { Admin, EmailAdmin } from "../models/Admins.js";

//
export const sendEmailVerify = async (req, res, next) => {
	const accessToken = req.headers["authorization"]?.split(" ")[1];

	if (req.query.status === "false") {
		jwt.verify(accessToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
			if (err) {
				return res.status(401).json({
					success: false,
					message: "invalid server AuthToken",
				});
			}
			if (req.query.email) {
				if (user.Role === "Admin") {
					try {
						const ExistEmail = await EmailAdmin.findOne({ where: { EmailAdmin: req.query.email }, include: [{ model: Admin }] });
						if (ExistEmail) {
							const url = `http://localhost:5000/auth/verify-email?email=${ExistEmail.EmailAdmin}&status=true`;
							await sendEmail(
								ExistEmail.EmailAdmin,
								"تایید ایمیل",
								"لطفا برای تایید ایمیل خود روی دکمه (تایید ایمیل) کلیک کنید",
								`<a href=${url}>
								<button>تایید ایمیل</button>
							</a>
							`
							);
							res.status(200).json({
								success: true,
								message: "ما یک پیامکی را برای ایمیل شما ارسال کردیم، لطفاً آن را تایید کنید .",
							});
						} else {
							res.status(404).json({
								success: false,
								message: "not exist admin with this email !",
							});
						}
					} catch (error) {
						res.status(404).json({
							success: false,
							message: error,
						});
					}
				} else {
					try {
						const ExistEmail = await EmailUser.findOne({ where: { EmailUser: req.query.email }, include: [{ model: User }] });
						if (ExistEmail) {
							const url = `http://localhost:5000/auth/verify-email?email=${ExistEmail.EmailUser}&status=true`;
							await sendEmail(
								ExistEmail.EmailUser,
								"تایید ایمیل",
								"لطفا برای تایید ایمیل خود روی دکمه (تایید ایمیل) کلیک کنید",
								`<a href=${url}>
								<button>تایید ایمیل</button>
							</a>
							`
							);
							res.status(200).json({
								success: true,
								message: "ما یک پیامکی را برای ایمیل شما ارسال کردیم، لطفاً آن را تایید کنید .",
							});
						} else {
							res.status(404).json({
								success: false,
								message: "not exist users with this email !",
							});
						}
					} catch (error) {
						res.status(404).json({
							success: false,
							message: error,
						});
					}
				}
			} else {
				res.status(404).json({
					success: false,
					message: "pleas send a email!",
				});
			}
		});
	} else {
		next();
	}
};

export const VerifyEmail = async (req, res) => {
	try {
		const ExistEmailUser = await EmailUser.findOne({ where: { EmailUser: req.query.email }, include: [{ model: User }] });
		const ExistEmailAdmin = await EmailAdmin.findOne({ where: { EmailAdmin: req.query.email }, include: [{ model: Admin }] });
		if (ExistEmailUser) {
			if (!ExistEmail.user.Verify_Email) {
				await User.update(
					{ Verify_Email: true },
					{
						where: { id: ExistEmailUser.user.id },
					}
				);
				res.status(200).json({
					success: true,
					message: "ایمیل شما با موفقت تایید شد.",
				});
			} else {
				res.status(401).json({
					success: false,
					message: "this is email is verify !",
				});
			}
		} else if (ExistEmailAdmin) {
			if (!ExistEmailAdmin.admin.Verify_Email) {
				await Admin.update(
					{ Verify_Email: true },
					{
						where: { id: ExistEmailAdmin.admin.id },
					}
				);
				res.status(200).json({
					success: true,
					message: "ایمیل شما با موفقت تایید شد.",
				});
			} else {
				res.status(401).json({
					success: false,
					message: "this is email is verify !",
				});
			}
		} else {
			res.status(404).json({
				success: false,
				message: "not exist users with this email !",
			});
		}
	} catch (error) {
		res.status(401).json({
			success: false,
			message: error,
		});
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

	if (!accessToken) {
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
	const { refreshToken } = req.body;
	if (!refreshToken) {
		return res.sendStatus(401);
	}
	try {
		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
			if (err || req.query.Role !== user.Role) {
				return res.status(401).json({
					success: false,
					message: "invalid server RefreshToken",
				});
			}

			if (req.query.Role === "User") {
				const refreshToken = jwt.sign(
					{ id: user.id, Role: user.Role, FirstName: user.User_FirstName, LastName: user.User_LastName, User_UserName: user.User_UserName },
					process.env.REFRESH_TOKEN_SECRET,
					{
						expiresIn: "72h",
					}
				);
				const accessToken = jwt.sign(
					{ id: user.id, Role: user.Role, FirstName: user.User_FirstName, LastName: user.User_LastName, User_UserName: user.User_UserName },
					process.env.REFRESH_TOKEN_SECRET,
					{
						expiresIn: "60s",
					}
				);
				const UserInfo = await User.findByPk(user.id);
				res.status(200).json({
					success: true,
					body: {
						refreshToken: refreshToken,
						accessToken: accessToken,
						Info: {
							Id: UserInfo?.id,
							Role: UserInfo?.Role,
							Img: UserInfo?.Default_Image,
							FirstName: UserInfo?.User_FirstName,
							LastName: UserInfo?.User_LastName,
						},
					},
				});
			}
			if (req.query.Role === "Admin") {
				const refreshToken = jwt.sign(
					{ id: user.id, Role: user.Role, FirstName: user.Admin_FirstName, LastName: user.Admin_LastName, Admin_UserName: user.Admin_UserName },
					process.env.REFRESH_TOKEN_SECRET,
					{
						expiresIn: "1h",
					}
				);
				const accessToken = jwt.sign(
					{ id: user.id, Role: user.Role, FirstName: user.Admin_FirstName, LastName: user.Admin_LastName, Admin_UserName: user.Admin_UserName },
					process.env.REFRESH_TOKEN_SECRET,
					{
						expiresIn: "5s",
					}
				);
				const AuthorInfo = await Admin.findByPk(user.id);
				res.status(200).json({
					success: true,
					body: {
						refreshToken: refreshToken,
						accessToken: accessToken,
						Info: {
							Role: AuthorInfo.Role,
							Id: AuthorInfo.id,
							FirstName: AuthorInfo.Admin_FirstName,
							LastName: AuthorInfo.Admin_LastName,
						},
					},
				});
			}
			if (req.query.Role === "Lord") {
				const refreshToken = jwt.sign(
					{ id: user.id, Role: user.Role, FirstName: user.Admin_FirstName, LastName: user.Admin_LastName, Admin_UserName: user.Admin_UserName },
					process.env.REFRESH_TOKEN_SECRET,
					{
						expiresIn: "1h",
					}
				);
				const accessToken = jwt.sign(
					{ id: user.id, Role: user.Role, FirstName: user.Admin_FirstName, LastName: user.Admin_LastName, Admin_UserName: user.Admin_UserName },
					process.env.REFRESH_TOKEN_SECRET,
					{
						expiresIn: "5s",
					}
				);
				const LordInfo = await Admin.findByPk(user.id);
				res.status(200).json({
					success: true,
					body: {
						refreshToken: refreshToken,
						accessToken: accessToken,
						Info: {
							Id: LordInfo.id,
							Role: LordInfo.Role,
							Img: LordInfo.Admin_Img,
							FirstName: LordInfo.Admin_FirstName,
							LastName: LordInfo.Admin_LastName,
						},
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
				include: [
					{
						model: EmailUser,
						where: { EmailUser: email_register },
					},
				],
			});

			const CheckInAdmin = await Admin.findOne({
				where: { Admin_UserName: username_register },
				include: [
					{
						model: EmailAdmin,
						where: { EmailAdmin: email_register },
					},
				],
			});
			if (!UserExist && !CheckInAdmin) {
				try {
					const salt = bcrypt.genSaltSync(10);
					const HashPassword = bcrypt.hashSync(password_register, salt);
					const CreatedUser = await User.create({
						User_FirstName: firstName_register,
						User_LastName: lastName_register,
						User_UserName: username_register,
						User_Password: HashPassword,
						Default_Image: "http://87.107.105.139/api/download/user?name=default-profile.jpg",
					});
					await EmailUser.create({ EmailUser: email_register, userId: CreatedUser.id });
					res.status(200).json({
						success: true,
						message: "حساب شما با موفقیت ساخته شد، لطفاٌ به صفحه ورود مراجعه کنید .",
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
					message: "لطفاً از نام کاربری قوی تری استفاده کنید .",
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
			const ExistAdmin = await Admin.findOne({
				where: { Admin_UserName: username_login },
			});

			// CHECK USER FULL INFO
			if (ExistUser !== null && ExistUser.Role === "User") {
				const GetUserByPk = await User.findByPk(ExistUser.id);
				const isPasswordCurrent = bcrypt.compareSync(password_login, GetUserByPk.User_Password);
				if (isPasswordCurrent) {
					const refreshToken = jwt.sign(
						{
							id: ExistUser.id,
							Role: ExistUser.Role,
							UserName: ExistUser.User_UserName,
						},
						process.env.REFRESH_TOKEN_SECRET,
						{
							expiresIn: "72h",
						}
					);
					const accessToken = jwt.sign(
						{
							id: ExistUser.id,
							Role: ExistUser.Role,
							UserName: ExistUser.User_UserName,
						},
						process.env.REFRESH_TOKEN_SECRET,
						{
							expiresIn: "60s",
						}
					);
					// Store refresh token with expiration time

					res.status(200).json({
						body: {
							accessToken: accessToken,
							refreshToken: refreshToken,
							Info: {
								Id: ExistUser.id,
								Role: ExistUser.Role,
								Img: ExistUser.Default_Image,
								FirstName: ExistUser.User_FirstName,
								LastName: ExistUser.User_LastName,
							},
						},
						success: true,
					});
				} else {
					res.status(404).json({
						success: false,
						message: "رمز عبور اشتباه است!",
					});
				}
			}
			// CHECK Author FULL INFO
			else if (ExistAdmin !== null && ExistAdmin.Role === "Admin") {
				const isPasswordCurrent = bcrypt.compareSync(password_login, ExistAdmin.Admin_Password);

				if (isPasswordCurrent) {
					const refreshToken = jwt.sign(
						{
							id: ExistAdmin.id,
							Role: ExistAdmin.Role,
							UserName: ExistAdmin.Admin_UserName,
						},
						process.env.REFRESH_TOKEN_SECRET,
						{
							expiresIn: "1h",
						}
					);
					const accessToken = jwt.sign(
						{
							id: ExistAdmin.id,
							Role: ExistAdmin.Role,
							UserName: ExistAdmin.Admin_UserName,
						},
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
							Info: {
								Id: ExistAdmin.id,
								Role: ExistAdmin.Role,
								Img: ExistAdmin.Default_Image,
								FirstName: ExistAdmin.Admin_FirstName,
								LastName: ExistAdmin.Admin_LastName,
							},
						},
						success: true,
					});
				} else {
					res.status(404).json({
						success: false,
						message: "رمز عبور اشتباه است!",
					});
				}
			}

			// CHECK Lord  FULL INFO
			else if (ExistAdmin !== null && ExistAdmin.Role === "Lord") {
				// Asynchronous run 👇
				// const buf = randomBytes(256).toString("hex");
				const isPasswordCurrent = bcrypt.compareSync(password_login, ExistAdmin.Admin_Password);
				if (isPasswordCurrent) {
					// full time: Date.now() + 7 * 24 * 60 * 60 * 1000  // days
					const refreshToken = jwt.sign(
						{
							id: ExistAdmin.id,
							Role: ExistAdmin.Role,
							UserName: ExistAdmin.Admin_UserName,
						},
						process.env.REFRESH_TOKEN_SECRET,
						{
							expiresIn: "1h",
						}
					);
					const accessToken = jwt.sign(
						{
							id: ExistAdmin.id,
							Role: ExistAdmin.Role,
							UserName: ExistAdmin.Admin_UserName,
						},
						process.env.REFRESH_TOKEN_SECRET,
						{
							expiresIn: "5s",
						}
					);
					// Store refresh token with expiration time
					res.status(200).json({
						success: true,
						body: {
							accessToken: accessToken,
							refreshToken: refreshToken,
							Info: {
								Id: ExistAdmin.id,
								Role: ExistAdmin.Role,
								Img: ExistAdmin.Default_Image,
								FirstName: ExistAdmin.Admin_FirstName,
								LastName: ExistAdmin.Admin_LastName,
							},
						},
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
