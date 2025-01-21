import { EmailUser, User } from "../models/User.js";
import { Comment } from "../models/Comment.js";
import { Responses } from "../models/Responses.js";
import { News } from "../models/News.js";
import { Admin } from "../models/Admins.js";
import { Like } from "../models/Like.js";
import { Activity } from "../models/Activity.js";
import bcrypt from "bcryptjs";
import { Login } from "./CtrlAuth.js";

export default class UserControllers {
	static GteUser = async (req, res) => {
		try {
			const existUser = await User.findOne({
				where: { id: req.query.id },
				include: [
					{
						model: EmailUser,
					},
				],
			});
			if (existUser && existUser.id === req.user.id && existUser.Role === req.user.Role) {
				res.status(200).json({
					success: true,
					body: existUser,
					message: "data user sended successfully!",
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
	// GRT COMMENTS
	static GteComment = async (req, res) => {
		try {
			const AllComment = await Comment.findAll({
				where: { userId: req.user.id },
				include: [
					{
						model: User,
					},
					{
						model: Responses,
					},
					{
						model: News,
						attributes: ["id", "News_Title", "createdAt", "Visit_Count"],
						include: [
							{
								model: Admin,
								attributes: ["Admin_FirstName", "Admin_LastName", "Default_Image"],
							},
						],
					},
				],
			});

			if (AllComment) {
				res.status(200).json({
					success: true,
					body: AllComment,
					message: "sended all comment for this user!",
				});
			} else {
				res.status(404).json({
					success: false,
					message: "not exist comment for this user !",
				});
			}
		} catch (error) {
			res.status(404).json({
				success: false,
				message: error,
			});
		}
	};
	// GRT Likes
	static GteLikes = async (req, res) => {
		try {
			const AllComment = await Like.findAll({
				where: { userId: req.user.id, Like_News: true },
				include: [
					{
						model: News,
						attributes: ["id", "News_Titre", "News_Title", "createdAt", "Visit_Count", "Like_Count"],
						include: [
							{
								model: Admin,
								attributes: ["Admin_FirstName", "Admin_LastName", "Default_Image"],
							},
						],
					},
				],
			});

			if (AllComment) {
				res.status(200).json({
					success: true,
					body: AllComment,
					message: "sended all comment for this user!",
				});
			} else {
				res.status(404).json({
					success: false,
					message: "not exist comment for this user !",
				});
			}
		} catch (error) {
			res.status(404).json({
				success: false,
				message: error,
			});
		}
	};
	// DISMISSAL
	static DismissalUser = async (req, res) => {
		if (req.query.id) {
			const GetUser = await User.findByPk(req.query.id);
			if (GetUser.Role === "User") {
				await User.update(
					{
						Role: "!User",
					},
					{
						where: { id: req.query.id },
					}
				);
				const ShowAllUser = await User.findAll({
					include: [
						{
							model: EmailUser,
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
						Default_Image: e.Default_Image,
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
						Role: "User",
					},
					{
						where: { id: req.query.id },
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
						emailUser: e.emailUser?.EmailUser,
						Role: e.Role,
						Verify_Email: e.Verify_Email,
						createdAt: e.createdAt,
						updatedAt: e.updatedAt,
						Default_Image: e.Default_Image,
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
	// Upload
	static Edit = async (req, res) => {
		const { firstname, lastname, username, password, email } = req.query;
		try {
			const getUser = await User.findByPk(req.user.id);
			const getEmailUser = await EmailUser.findOne({ where: { userId: req.user.id } });

			if (firstname || lastname || username || password || email) {
				const salt = bcrypt.genSaltSync(10);
				const HashPassword = bcrypt.hashSync(password, salt);
				await User.update(
					{
						User_FirstName: firstname ? firstname : getUser.User_FirstName,
						User_LastName: lastname ? lastname : getUser.User_LastName,
						User_Password: password ? HashPassword : getUser.User_Password,
					},
					{ where: { id: req.user.id } }
				);
				await EmailUser.update({ EmailUser: email ? email : getEmailUser.EmailUser }, { where: { userId: req.user.id } });

				const BackData = await User.findOne({
					where: { id: req.user.id },
					include: [
						{
							model: EmailUser,
						},
					],
				});
				res.status(200).json({
					success: true,
					body: BackData,
					message: "user as ben updated successfully!",
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
				emailUser: e.emailUser?.EmailUser,
				Role: e.Role,
				Verify_Email: e.Verify_Email,
				createdAt: e.createdAt,
				updatedAt: e.updatedAt,
				Default_Image: e.Default_Image,
			};
		});
		res.status(200).json({
			success: true,
			body: AllUser.length !== 0 ? AllUser : AllUser,
			message: `${AllUser.length === 0 ? "شما هیچ نویسنده ای ندارید !" : ""}`,
		});
	};
	// HISTORY
	static History = async (req, res) => {
		const ShowAllUser = await Activity.findAll({
			include: [
				{
					model: News,
					required: false,
					attributes: ["id", "News_Titre", "News_Title", "createdAt", "Visit_Count", "Like_Count"],
					include: [
						{
							model: Admin,
							attributes: ["Admin_FirstName", "Admin_LastName", "Default_Image"],
						},
					],
				},
			],
			where: { userId: req.user.id },
		});

		res.status(200).json({
			success: true,
			body: ShowAllUser.length > 0 ? ShowAllUser : [],
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
						Default_Image: e.Default_Image,
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
