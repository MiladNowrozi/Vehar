import { EmailUser, User } from "../models/User.js";

export default class UserControllers {
	static GteUser = async (req, res) => {
		try {
			const existUser = await User.findByPk(req.params.id);
			const { password, username, ...other } = existUser.dataValues;

			if (existUser) {
				res.status(200).json({
					success: true,
					body: other,
					message: "this user is exist!",
				});
			} else {
				res.status(404).json({
					success: false,
					message: "this user not exist!",
				});
			}
		} catch (error) {
			res.status(404).json({
				success: false,
				message: error,
			});
		}
	};

	// CANCEL
	static CancelUser = async (req, res) => {
		if (req.params.id) {
			const GetUser = await User.findByPk(req.params.id);
			if (GetUser.Role === "OnUser") {
				await User.update(
					{
						Role: "OffUser",
					},
					{
						where: { id: req.params.id },
					}
				);
				const ShowAllUser = await User.findAll({
					include: [
						{
							model: EmailUser,
							required: false, // This will include users even if they have no emails
						},
					],
				});
				const AllUser = ShowAllUser.map((e) => {
					console.log();
					return {
						id: e.id,
						User_FirstName: e.User_FirstName,
						User_LastName: e.User_LastName,
						emailUser: e.emailUser.EmailUser,
						Role: e.Role,
						Verify_Email: e.Verify_Email,
						createdAt: e.createdAt,
						updatedAt: e.updatedAt,
						User_Img: e.User_Img,
					};
				});
				res.status(200).json({
					success: true,
					body: AllUser,
					message: `مدیریت ${GetUser.User_FirstName + " " + GetUser.User_LastName} با موفقیت لغو شد!`,
				});
			} else {
				await User.update(
					{
						Role: "OnUser",
					},
					{
						where: { id: req.params.id },
					}
				);
				const ShowAllUser = await User.findAll({
					include: [
						{
							model: EmailUser,
							required: false, // This will include users even if they have no emails
						},
					],
				});
				const AllUser = ShowAllUser.map((e) => {
					return {
						id: e.id,
						User_FirstName: e.User_FirstName,
						User_LastName: e.User_LastName,
						emailUser: e.emailUser.EmailUser,
						Role: e.Role,
						Verify_Email: e.Verify_Email,
						createdAt: e.createdAt,
						updatedAt: e.updatedAt,
						User_Img: e.User_Img,
					};
				});
				res.status(200).json({
					success: true,
					body: AllUser,
					message: `مدیریت ${GetUser.User_FirstName + " " + GetUser.User_LastName} با موفقیت فعال شد!`,
				});
			}
		} else {
			res.status(412).json({
				success: false,
				message: "invalid server!",
			});
		}
	};

	// GET ALL
	static GetAllUser = async (req, res) => {
		const ShowAllUser = await User.findAll({
			include: [
				{
					model: EmailUser,
					required: false, // This will include users even if they have no emails
				},
			],
		});
		const AllUser = ShowAllUser.map((e) => {
			return {
				id: e.id,
				User_FirstName: e.User_FirstName,
				User_LastName: e.User_LastName,
				emailUser: e.emailUser.EmailUser,
				Role: e.Role,
				Verify_Email: e.Verify_Email,
				createdAt: e.createdAt,
				updatedAt: e.updatedAt,
				User_Img: e.User_Img,
			};
		});
		res.status(200).json({
			success: true,
			body: AllUser.length !== 0 ? AllUser : AllUser,
			message: `${AllUser.length === 0 ? "شما هیچ نویسنده ای ندارید !" : ""}`,
		});
	};

	// DELETE
	static DeleteUser = async (req, res) => {
		if (req.params.id) {
			try {
				await User.destroy({ where: { id: req.params.id } });
				const ShowAllUser = await User.findAll({
					include: [
						{
							model: EmailUser,
							required: false, // This will include users even if they have no emails
						},
					],
				});
				const AllUser = ShowAllUser.map((e) => {
					return {
						id: e.id,
						User_FirstName: e.User_FirstName,
						User_LastName: e.User_LastName,
						emailUser: e.emailUser?.EmailUser,
						Role: e.Role,
						Verify_Email: e.Verify_Email,
						createdAt: e.createdAt,
						updatedAt: e.updatedAt,
						User_Img: e.User_Img,
					};
				});
				res.status(200).json({
					success: true,
					body: AllUser.length !== 0 ? AllUser : AllUser,
					message: `${AllUser.length === 0 ? "شما هیچ کاربری ندارید !" : ""}`,
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
