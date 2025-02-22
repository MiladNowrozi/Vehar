import { Op } from "@sequelize/core";
import { News } from "../models/News.js";
// import axios from "axios";
import fs from "fs";
import { Like } from "../models/Like.js";
import { Comment } from "../models/Comment.js";
import { User } from "../models/User.js";
import { Files } from "../models/Files.js";
import { Responses } from "../models/Responses.js";
import { Admin } from "../models/Admins.js";
import { SubCategory } from "../models/SubCategory.js";
import jwt from "jsonwebtoken";
import { Activity } from "../models/Activity.js";

// fs.readFile("News.json", "utf8", (err, data) => {
// 	if (err) {
// 		console.error(err);
// 		return;
// 	}
// 	const users = JSON.parse(data);

// 	http:[\/]{2,2}localhost:5000[\/A-z-?=0-9۰-۹]+.jpg
// 	// Access the data
// 	users.slice(80, 100).forEach(async (user) => {
// 		const imgRegex = /http:[\/]{2,2}localhost:5000[\/A-z-?=0-9۰-۹][^x<>]+.jpg/gi;
// 		const imageUrls = [];
// 		let match;
// 		while ((match = imgRegex.exec(user.content.rendered)) !== null) {
// 			imageUrls.push(match[0]);
// 		}
// 		try {
// 			const k = await News.create({
// 				News_Titre: "به گزارش پایگاه اطلاع رسانی وهار؛",
// 				News_Title: user.title.rendered,
// 				News_Describe: user.excerpt.rendered,
// 				News_Content: user.content.rendered,
// 				Default_Image: imageUrls[0].toString(),
// 				createdAt: new Date(user.date),
// 				Category: "local",
// 				subCategoryId: 5,
// 				authorId: 1,
// 			});

// 			console.log("yes");
// 		} catch (error) {
// 			console.log(error.message);
// 		}
// 	});
// });

export default class NewsControllers {
	static CreateNews = async (req, res) => {
		try {
			const NewsExist = await News.findOne({
				where: {
					[Op.or]: [{ News_Titre: req.body.News_Titre }, { News_Title: req.body.News_Title }, { News_Describe: req.body.News_Describe }],
				},
			});
			if (NewsExist === null) {
				try {
					await News.create({
						News_Titre: req.body.News_Titre,
						News_Title: req.body.News_Title,
						News_Describe: req.body.News_Describe,
						News_Content: req.body.News_Content,
						Default_Image: req.body.Default_Image,
						Comment_Status: req.body.Comment_Status,
						MainPageColumn: req.body.MainPageColumn,
						MainPageSlider: req.body.MainPageSlider,
						SubPageSlider: req.body.SubPageSlider,
						SubPageColumn: req.body.SubPageColumn,
						MainNote: req.body.MainNote,
						SubNote: req.body.SubNote,
						MainTicker: req.body.MainTicker,
						SubTicker: req.body.SubTicker,
						Category: req.body.CategoryId,
						subCategoryId: req.body.SubCategoryId,
						authorId: req.body.AuthorId,
					});
					res.status(200).json({
						success: true,
						message: "خبر با موفقیت ذخیره شد!",
					});
				} catch (e) {
					res.status(412).json({
						success: false,
						message: e.errors[0].message,
					});
				}
			} else {
				res.status(412).json({
					success: false,
					message: "این خبر قبلاً منتشر شده است!",
				});
			}
		} catch (error) {
			// console.log(error);
			res.status(404).json({
				success: false,
				message: error.message,
			});
		}
	};
	// SEARCH NEWS BY ID OR TITLE
	static GetAllNews = async (req, res) => {
		try {
			const all = await News.findAndCountAll();
			const Result = await Promise.all(
				all.rows.map(async (item) => {
					const id = await item.getsubCategoryId({ raw: true });
					return {
						Category: {
							id: item.id,
							Category: item.Category,
							News: id.splice(id.length - 3, 3),
						},
					};
				})
			);
			res.status(200).json({
				success: true,
				body: Result,
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: error,
			});
		}
	};
	// SEARCH ADMIN
	static SearchAdmin = async (req, res) => {
		if (req.query.searchbyid !== "null") {
			try {
				const GetAllResult = await News.findAndCountAll({
					where: {
						id: req.query.searchbyid,
						authorId: req.user.id,
					},
					include: [
						{
							model: SubCategory,
						},
						{
							model: Admin,
						},
					],
				});

				// const ResultSearchId = await Promise.all(
				// 	GetAllResult.rows.map(async (i) => {
				// 		const author = await i.getAdmin({ raw: true });
				// 		const subCategory = await i.getSubCategory({ raw: true });
				// 		return {
				// 			id: i.id,
				// 			News_Titre: i.News_Titre,
				// 			News_Title: i.News_Title,
				// 			News_Describe: i.News_Describe,
				// 			News_Content: i.News_Content,
				// 			Default_Image: i.Default_Image,
				// 			News_Status: i.News_Status,
				// 			Comment_Status: i.Comment_Status,
				// 			Author: author.Admin_FirstName + " " + author.Admin_LastName,
				// 			Category: i.Category,
				// 			SubCategory: subCategory?.SubCategory,
				// 			createdAt: i.createdAt,
				// 		};
				// 	})
				// );
				res.status(200).json({
					success: true,
					body: {
						News: GetAllResult.count > 0 ? GetAllResult.rows : [],
						CurrentPage: parseInt(req.query.currentpage),
						TotalPages: Math.ceil(GetAllResult.count / parseInt(req.query.limit)),
						TotalNews: GetAllResult.count,
					},
					message: req.query.searchbyid === "null" ? "هیچ خبری موجود نیست" : `خبری با کد (${req.query.searchbyid}) وجود ندارد!`,
				});
			} catch (e) {
				res.status(500).json({
					success: false,
					body: null,
					message: "درخواست برای دریافت اخبار ناموفق بود!",
				});
			}
		} else if (req.query.search !== "null" && req.query.search.length > 3) {
			const SearchInNewsByTitle = await News.findAndCountAll({
				where: {
					[Op.or]: [
						{
							News_Titre: {
								[Op.like]: `%${req.query.search}%`,
							},
						},
						{
							News_Title: {
								[Op.like]: `%${req.query.search}%`,
							},
						},
					],
					authorId: req.user.id,
				},
				include: [
					{
						model: Admin,
					},
					{
						model: SubCategory,
					},
				],
			});

			res.status(200).json({
				success: true,
				body: {
					News: SearchInNewsByTitle.count > 0 ? SearchInNewsByTitle.rows : [],
					CurrentPage: parseInt(req.query.currentpage),
					TotalPages: Math.ceil(SearchInNewsByTitle.count / parseInt(req.query.limit)),
					TotalNews: SearchInNewsByTitle.count,
				},
				message: req.query.search === "null" ? "هیچ خبری موجود نیست" : `خبری با تیتر/عنوان (${req.query.search}) وجود ندارد !`,
			});
		} else {
			try {
				const findAndCountAll = await News.findAndCountAll({
					where: {
						authorId: req.user.id,
					},
					include: [
						{
							model: Admin,
						},
						{
							model: SubCategory,
						},
					],

					limit: parseInt(req.query.limit),
					offset: (parseInt(req.query.currentpage) - 1) * parseInt(req.query.limit),
				});

				res.status(200).json({
					success: true,
					body: {
						News: findAndCountAll.count > 0 ? findAndCountAll.rows : [],
						CurrentPage: parseInt(req.query.currentpage),
						TotalPages: Math.ceil(findAndCountAll.count / parseInt(req.query.limit)),
						TotalNews: findAndCountAll.count,
					},
					message: req.query.search === "null" ? "هیچ خبری موجود نیست" : `خبری با عنوان (${req.query.search}) وجود ندارد !`,
				});
			} catch (e) {
				res.status(500).json({
					success: false,
					body: null,
					message: "درخواست برای دریافت اخبار ناموفق بود!",
				});
			}
		}
	};
	// SEARCH USER
	static SearchUser = async (req, res) => {
		if (req.query.searchbyid !== "null") {
			try {
				const GetAllResult = await News.findAndCountAll({
					where: {
						id: req.query.searchbyid,
					},
				});

				const ResultSearchId = await Promise.all(
					GetAllResult.rows.map(async (i) => {
						const author = await i.getAdmin({ raw: true });
						const subCategory = await i.getSubCategory({ raw: true });
						return {
							id: i.id,
							News_Titre: i.News_Titre,
							News_Title: i.News_Title,
							News_Describe: i.News_Describe,
							News_Content: i.News_Content,
							Default_Image: i.Default_Image,
							News_Status: i.News_Status,
							Comment_Status: i.Comment_Status,
							Author: author.Admin_FirstName + " " + author.Admin_LastName,
							Category: i.Category,
							SubCategory: subCategory?.SubCategory,
							createdAt: i.createdAt,
						};
					})
				);
				res.status(200).json({
					success: true,
					body: {
						News: ResultSearchId,
						CurrentPage: parseInt(req.query.currentpage),
						TotalPages: Math.ceil(GetAllResult.count / parseInt(req.query.limit)),
						TotalNews: GetAllResult.count,
					},
					message: req.query.searchbyid === "null" ? "هیچ خبری موجود نیست" : `خبری با کد (${req.query.searchbyid}) وجود ندارد!`,
				});
			} catch (e) {
				res.status(500).json({
					success: false,
					body: null,
					message: "درخواست برای دریافت اخبار ناموفق بود!",
				});
			}
		} else if (req.query.search !== "null" && req.query.search.length > 3) {
			const SearchInNewsByTitle = await News.findAndCountAll({
				where: {
					[Op.or]: [
						{
							News_Titre: {
								[Op.like]: `%${req.query.search}%`,
							},
						},
						{
							News_Title: {
								[Op.like]: `%${req.query.search}%`,
							},
						},
					],
				},
				limit: parseInt(req.query.limit),
				offset: (parseInt(req.query.currentpage) - 1) * parseInt(req.query.limit),
			});

			const ResultSearchTitle = await Promise.all(
				SearchInNewsByTitle.rows.map(async (i) => {
					const author = await i.getAdmin({ raw: true });
					const subCategory = await i.getSubCategory({ raw: true });
					return {
						id: i.id,
						News_Titre: i.News_Titre,
						News_Title: i.News_Title,
						News_Describe: i.News_Describe,
						News_Content: i.News_Content,
						Default_Image: i.Default_Image,
						News_Status: i.News_Status,
						Comment_Status: i.Comment_Status,
						Author: author.Admin_FirstName + " " + author.Admin_LastName,
						Category: i.Category,
						SubCategory: subCategory?.SubCategory,
						createdAt: i.createdAt,
					};
				})
			);
			res.status(200).json({
				success: true,
				body: {
					News: ResultSearchTitle,
					CurrentPage: parseInt(req.query.currentpage),
					TotalPages: Math.ceil(SearchInNewsByTitle.count / parseInt(req.query.limit)),
					TotalNews: SearchInNewsByTitle.count,
				},
				message: req.query.search === "null" ? "هیچ خبری موجود نیست" : `خبری با تیتر/عنوان (${req.query.search}) وجود ندارد !`,
			});
		} else {
			res.status(200).json({
				success: true,
				body: {
					News: [],
					CurrentPage: 1,
					TotalPages: 0,
					TotalNews: 0,
				},
				message: req.query.search === "null" ? "هیچ خبری موجود نیست" : `خبری با عنوان (${req.query.search}) وجود ندارد !`,
			});
		}
	};
	// GET ONE NEWS
	static GteNews = async (req, res) => {
		try {
			const SelectedNews = await News.findByPk(req.query.id);
			if (SelectedNews !== null) {
				await SelectedNews.update({ Visit_Count: (SelectedNews.Visit_Count += 1) });

				if (req.query.userId && req.query.role === "User") {
					const CheckHistory = await Activity.findOne({ where: { newsId: req.query.id, userId: req.query.userId } });
					if (!CheckHistory) {
						await Activity.create({ newsId: req.query.id, userId: req.query.userId });
					}
				}

				//
				const CountSpecial = await News.findAndCountAll({ where: { Category: SelectedNews.Category, MainPageSlider: true } });
				const CountChosen = await News.findAndCountAll({ where: { Category: SelectedNews.Category, MainPageColumn: true } });

				const SelectedSpecial = await News.findAll({
					where: { Category: SelectedNews.Category, SubPageSlider: true },
					limit: CountSpecial.count <= 5 ? CountSpecial.count : 5,
					offset: CountSpecial.count <= 5 ? 0 : CountSpecial.count - 5,
				});
				const SelectedChosen = await News.findAll({
					where: { Category: SelectedNews.Category, SubPageSlider: true },
					limit: CountChosen.count <= 5 ? CountChosen.count : 5,
					offset: CountChosen.count <= 5 ? 0 : CountChosen.count - 5,
				});
				//
				console.log(SelectedChosen);

				const SelectNews = await News.findOne({
					where: { id: SelectedNews.id },
					include: [
						{
							model: Admin,
						},
						{
							model: SubCategory,
							required: false,
						},
						{
							model: Like,
							where: {
								userId: req.query.userId,
							},
							attributes: ["Like_News"],
							required: false,
						},
						{
							model: Comment,
							required: false,
							include: [
								{
									model: Like,
									where: {
										userId: req.query.userId,
									},
									attributes: ["Like_Comment", "UnLike_Comment"],
									required: false,
								},
								{
									model: User,
								},
								{
									model: Responses,
									required: false,
									include: [
										{
											model: User,
										},
									],
								},
							],
						},
					],
				});
				// ==========================================
				res.status(200).json({
					success: true,
					body: {
						GetSelectedSpecial: SelectedSpecial,
						GetSelectedNews: SelectNews,
						GetSelectedChosen: SelectedChosen,
					},
					message: "خبر با موفقیت دریافت شد!",
				});
			} else {
				res.status(404).json({
					success: false,
					body: null,
					message: "چنین خبری وجود ندارد!",
				});
			}
		} catch (e) {
			console.log(e);

			res.status(500).json({
				success: false,
				body: null,
				message: "درخواست دریافت خبر ناموفق بود!",
			});
		}
	};
	// UPDATE ONE NEWS
	static UpdNews = async (req, res) => {
		try {
			const GetOneNewsForUpd = await News.findByPk(req.body.id);
			if (GetOneNewsForUpd) {
				const NewsIsUpdate = GetOneNewsForUpd.update({
					News_Titre: req.body.News_Titre,
					News_Title: req.body.News_Title,
					News_Describe: req.body.News_Describe,
					News_Content: req.body.News_Content,
					Default_Image: req.body.Default_Image,
					Comment_Status: req.body.Comment_Status,
					MainPageSlider: req.body.MainPageSlider,
					MainPageColumn: req.body.MainPageColumn,
					SubPageSlider: req.body.SubPageSlider,
					SubPageColumn: req.body.SubPageColumn,
					MainNote: req.body.MainNote,
					SubNote: req.body.SubNote,
					MainTicker: req.body.MainTicker,
					SubTicker: req.body.SubTicker,
					Category: req.body.Category,
					subCategoryId: req.body.subCategoryId,
					authorId: req.body.AuthorId,
				});
				res.status(200).json({
					success: true,
					body: NewsIsUpdate,
					message: "خبر با موفقیت آپدیت شد!",
				});
			} else {
				res.status(412).json({
					success: false,
					body: null,
					message: "this is news not exist!",
				});
			}
		} catch (error) {
			res.status(404).json({
				success: false,
				body: null,
				message: "invalid server when updata news!",
			});
		}
	};
	// DELETE ONE NEWS
	static DeleNews = async (req, res) => {
		try {
			const GetOneNews = await News.findByPk(req.query.id);
			if (GetOneNews) {
				await News.destroy({ where: { id: req.query.id }, force: true });
				res.status(200).json({
					success: true,
					message: "خبر با موفقیت حذف شد!",
				});
			} else {
				res.status(404).json({
					success: false,
					body: null,
					message: "چنین خبری وجود ندارد!",
				});
			}
		} catch (e) {
			res.status(500).json({
				success: false,
				body: null,
				message: "متاسفانه درخواست شما برای حذف خبر ناموفق بود!",
			});
		}
	};
	// LIKE NEWS
	static LikeNews = async (req, res) => {
		const fa1 = "شما مدیر هستید .";
		if (req.user.Role === "Lord" || req.user.Role === "Admin") {
			res.status(403).json({
				success: false,
				message: fa1,
			});
		} else {
			try {
				const GetOneNews = await News.findByPk(req.query.id);
				if (GetOneNews) {
					const LikeCachk = await Like.findOne({ where: { newsId: GetOneNews.id, userId: req.user.id } });
					if (LikeCachk) {
						if (LikeCachk.Like_News) {
							await LikeCachk.update({ Like_News: false });
							await GetOneNews.update({ Like_Count: (GetOneNews.Like_Count -= 1) });
							const ResultLike = await Like.findOne({
								where: { newsId: GetOneNews.id, userId: req.user.id },
								attributes: ["Like_News"],
								include: [{ model: News, attributes: ["Like_Count"] }],
							});
							res.status(200).json({
								body: ResultLike,
							});
						} else {
							await LikeCachk.update({ Like_News: true });
							await GetOneNews.update({ Like_Count: (GetOneNews.Like_Count += 1) });
							const ResultLike = await Like.findOne({
								where: { newsId: GetOneNews.id, userId: req.user.id },
								attributes: ["Like_News"],
								include: [{ model: News, attributes: ["Like_Count"] }],
							});
							res.status(200).json({
								body: ResultLike,
							});
						}
					} else {
						await Like.create({ Like_News: true, userId: req.user.id, newsId: GetOneNews.id });
						await GetOneNews.update({ Like_Count: (GetOneNews.Like_Count += 1) });
						const ResultLike = await Like.findOne({
							where: { newsId: GetOneNews.id, userId: req.user.id },
							attributes: ["Like_News"],
							include: [{ model: News, attributes: ["Like_Count"] }],
						});
						res.status(200).json({
							body: ResultLike,
						});
					}
				} else {
					res.status(403).json({
						success: false,
						message: "News not find!",
					});
				}
			} catch (error) {
				res.status(403).json({
					success: false,
					message: error.message,
				});
			}
		}
	};
	// LIKE COMMENT
	static LikeComment = async (req, res) => {
		const fa1 = "شما مدیر هستید .";
		if (req.user.Role === "Lord" || req.user.Role === "Admin") {
			res.status(403).json({
				success: false,
				message: fa1,
			});
		} else {
			try {
				const GetOneComment = await Comment.findByPk(req.query.id);
				if (GetOneComment) {
					if (req.query.status === "like") {
						const LikeCachk = await Like.findOne({ where: { userId: req.user.id, commentId: GetOneComment.id } });
						if (LikeCachk) {
							if (LikeCachk.Like_Comment) {
								if (LikeCachk.UnLike_Comment) {
									await LikeCachk.update({ UnLike_Comment: false });
									await GetOneComment.update({ UnLike_Comment: (GetOneComment.UnLike_Comment -= 1) });
									const ResultLike = await Like.findOne({
										where: { commentId: GetOneComment.id, userId: req.user.id },
										attributes: ["UnLike_Comment", "Like_Comment"],
										include: [
											{ model: Comment, required: false, include: [{ Like, required: false }], attributes: ["UnLike_Comment", "Like_Comment"] },
										],
									});
									res.status(200).json({
										body: ResultLike,
										CommentId: GetOneComment.id,
									});
								} else {
									await LikeCachk.update({ Like_Comment: false });
									await GetOneComment.update({ Like_Comment: (GetOneComment.Like_Comment -= 1) });
									const ResultLike = await Like.findOne({
										where: { commentId: GetOneComment.id, userId: req.user.id },
										attributes: ["Like_Comment", "UnLike_Comment"],
										include: [{ model: Comment, attributes: ["Like_Comment", "UnLike_Comment"] }],
									});
									res.status(200).json({
										body: ResultLike,
										CommentId: GetOneComment.id,
									});
								}
							} else {
								if (LikeCachk.UnLike_Comment) {
									await LikeCachk.update({ UnLike_Comment: false });
									await GetOneComment.update({ UnLike_Comment: (GetOneComment.UnLike_Comment -= 1) });
									const ResultLike = await Like.findOne({
										where: { commentId: GetOneComment.id, userId: req.user.id },
										attributes: ["UnLike_Comment", "Like_Comment"],
										include: [{ model: Comment, attributes: ["UnLike_Comment", "Like_Comment"] }],
									});
									res.status(200).json({
										body: ResultLike,
										CommentId: GetOneComment.id,
									});
								} else {
									await LikeCachk.update({ Like_Comment: true });
									await GetOneComment.update({ Like_Comment: (GetOneComment.Like_Comment += 1) });
									const ResultLike = await Like.findOne({
										where: { commentId: GetOneComment.id, userId: req.user.id },
										attributes: ["Like_Comment", "UnLike_Comment"],
										include: [{ model: Comment, attributes: ["Like_Comment", "UnLike_Comment"] }],
									});
									res.status(200).json({
										body: ResultLike,
										CommentId: GetOneComment.id,
									});
								}
							}
						} else {
							await Like.create({ Like_Comment: true, userId: req.user.id, commentId: GetOneComment.id });
							await GetOneComment.update({ Like_Comment: (GetOneComment.Like_Comment += 1) });
							const ResultLike = await Like.findOne({
								where: { commentId: GetOneComment.id, userId: req.user.id },
								attributes: ["Like_Comment", "UnLike_Comment"],
								include: [{ model: Comment, attributes: ["Like_Comment", "UnLike_Comment"] }],
							});
							res.status(200).json({
								body: ResultLike,
								CommentId: GetOneComment.id,
							});
						}
					} else if (req.query.status === "unlike") {
						const LikeCachk = await Like.findOne({ where: { userId: req.user.id, commentId: GetOneComment.id } });
						if (LikeCachk) {
							if (LikeCachk.UnLike_Comment) {
								if (LikeCachk.Like_Comment) {
									await LikeCachk.update({ Like_Comment: false });
									await GetOneComment.update({ Like_Comment: (GetOneComment.Like_Comment -= 1) });
									const ResultLike = await Like.findOne({
										where: { commentId: GetOneComment.id, userId: req.user.id },
										attributes: ["Like_Comment", "UnLike_Comments"],
										include: [{ model: Comment, attributes: ["Like_Comment", "UnLike_Comments"] }],
									});
									res.status(200).json({
										body: ResultLike,
										CommentId: GetOneComment.id,
									});
								} else {
									await LikeCachk.update({ UnLike_Comment: false });
									await GetOneComment.update({ UnLike_Comment: (GetOneComment.UnLike_Comment -= 1) });
									const ResultLike = await Like.findOne({
										where: { commentId: GetOneComment.id, userId: req.user.id },
										attributes: ["UnLike_Comment", "Like_Comment"],
										include: [{ model: Comment, attributes: ["UnLike_Comment", "Like_Comment"] }],
									});
									res.status(200).json({
										body: ResultLike,
										CommentId: GetOneComment.id,
									});
								}
							} else {
								if (LikeCachk.Like_Comment) {
									await LikeCachk.update({ Like_Comment: false });
									await GetOneComment.update({ Like_Comment: (GetOneComment.Like_Comment -= 1) });
									const ResultLike = await Like.findOne({
										where: { commentId: GetOneComment.id, userId: req.user.id },
										attributes: ["Like_Comment", "UnLike_Comment"],
										include: [{ model: Comment, attributes: ["Like_Comment", "UnLike_Comment"] }],
									});
									res.status(200).json({
										body: ResultLike,
										CommentId: GetOneComment.id,
									});
								} else {
									await LikeCachk.update({ UnLike_Comment: true });
									await GetOneComment.update({ UnLike_Comment: (GetOneComment.UnLike_Comment += 1) });
									const ResultLike = await Like.findOne({
										where: { commentId: GetOneComment.id, userId: req.user.id },
										attributes: ["UnLike_Comment", "Like_Comment"],
										include: [{ model: Comment, attributes: ["UnLike_Comment", "Like_Comment"] }],
									});
									res.status(200).json({
										body: ResultLike,
										CommentId: GetOneComment.id,
									});
								}
							}
						} else {
							await Like.create({ UnLike_Comment: true, userId: req.user.id, commentId: GetOneComment.id });
							await GetOneComment.update({ UnLike_Comment: (GetOneComment.UnLike_Comment += 1) });
							const ResultLike = await Like.findOne({
								where: { commentId: GetOneComment.id, userId: req.user.id },
								attributes: ["Like_Comment", "UnLike_Comment"],
								include: [{ model: Comment, attributes: ["Like_Comment", "UnLike_Comment"] }],
							});
							res.status(200).json({
								body: ResultLike,
								CommentId: GetOneComment.id,
							});
						}
					} else {
						res.status(403).json({
							success: false,
							message: "Comment not find!",
						});
					}
				}
			} catch (error) {
				res.status(403).json({
					success: false,
					message: error.message,
				});
			}
		}
	};
	// MOST VISITED
	static MostVisited = async (req, res) => {
		try {
			if (req.query.cat === "politic") {
				const MostVisitedNews = await News.findAll({
					where: { Category: req.query.cat },
					order: [["Visit_Count", "DESC"]], // Order by visitCount in descending order
					limit: 15,
				});
				res.status(200).json({
					success: true,
					body: MostVisitedNews,
				});
			} else if (req.query.cat === "economy") {
				const MostVisitedNews = await News.findAll({
					where: { Category: req.query.cat },
					order: [["Visit_Count", "DESC"]], // Order by visitCount in descending order
					limit: 15,
				});
				res.status(200).json({
					success: true,
					body: MostVisitedNews,
				});
			} else if (req.query.cat === "social") {
				const MostVisitedNews = await News.findAll({
					where: { Category: req.query.cat },
					order: [["Visit_Count", "DESC"]], // Order by visitCount in descending order
					limit: 15,
				});
				res.status(200).json({
					success: true,
					body: MostVisitedNews,
				});
			} else if (req.query.cat === "sport") {
				const MostVisitedNews = await News.findAll({
					where: { Category: req.query.cat },
					order: [["Visit_Count", "DESC"]], // Order by visitCount in descending order
					limit: 15,
				});
				res.status(200).json({
					success: true,
					body: MostVisitedNews,
				});
			} else if (req.query.cat === "local") {
				const MostVisitedNews = await News.findAll({
					where: { Category: req.query.cat },
					order: [["Visit_Count", "DESC"]], // Order by visitCount in descending order
					limit: 15,
				});
				res.status(200).json({
					success: true,
					body: MostVisitedNews,
				});
			} else {
				const MostVisitedNews = await News.findAll({
					order: [["Visit_Count", "DESC"]], // Order by visitCount in descending order
					limit: 15,
				});
				res.status(200).json({
					success: true,
					body: MostVisitedNews,
				});
			}
		} catch (error) {
			res.status(401).json({
				success: false,
				message: error.message,
			});
		}
	};
	// MOST VISITED
	static MainPagSliderAndChoice = async (req, res) => {
		try {
			if (req.query.cat) {
				const SliderCount = await News.findAndCountAll({ where: { Category: req.query.cat, SubPageSlider: true } });
				const ChoiceCount = await News.findAndCountAll({ where: { Category: req.query.cat, SubPageColumn: true } });
				const SubNoteCount = await News.findAndCountAll({ where: { Category: req.query.cat, SubNote: true } });

				const SubNoteNews = await News.findAll({
					where: { Category: req.query.cat, SubNote: true },
					limit: SubNoteCount.count <= 1 ? SubNoteCount.count : 1,
					offset: SubNoteCount.count <= 1 ? 0 : SubNoteCount.count - 1,
				});
				const ChoiceNews = await News.findAll({
					where: { Category: req.query.cat, SubPageColumn: true },
					limit: ChoiceCount.count <= 6 ? ChoiceCount.count : 6,
					offset: ChoiceCount.count <= 6 ? 0 : ChoiceCount.count - 6,
				});
				const SliderNews = await News.findAll({
					where: { Category: req.query.cat, SubPageSlider: true },
					limit: SliderCount.count <= 3 ? SliderCount.count : 3,
					offset: SliderCount.count <= 3 ? 0 : SliderCount.count - 3,
				});
				const SpecialNews = await News.findAll({
					where: { Category: req.query.cat, SubPageSlider: true },
					limit: SliderCount.count <= 15 ? SliderCount.count : 15,
					offset: SliderCount.count <= 15 ? 0 : SliderCount.count - 15,
				});
				res.status(200).json({
					success: true,
					body: { SpecialNews: SpecialNews, SliderNews: SliderNews, ChoiceNews: ChoiceNews, SubNoteNews: SubNoteNews },
				});
			} else {
				const SliderCount = await News.findAndCountAll({ where: { SubPageSlider: true } });
				const ChoiceCount = await News.findAndCountAll({ where: { SubPageColumn: true } });
				const SubNoteCount = await News.findAndCountAll({ where: { SubNote: true } });
				const SubNoteNews = await News.findAll({
					where: { SubNote: true },
					limit: SubNoteCount.count <= 1 ? SubNoteCount.count : 1,
					offset: SubNoteCount.count <= 1 ? 0 : SubNoteCount.count - 1,
				});
				const ChoiceNews = await News.findAll({
					where: { SubPageColumn: true },
					limit: ChoiceCount.count <= 6 ? ChoiceCount.count : 6,
					offset: ChoiceCount.count <= 6 ? 0 : ChoiceCount.count - 6,
				});
				const SliderNews = await News.findAll({
					where: { SubPageSlider: true },
					limit: SliderCount.count <= 3 ? SliderCount.count : 3,
					offset: SliderCount.count <= 3 ? 0 : SliderCount.count - 3,
				});
				const SpecialNews = await News.findAll({
					where: { SubPageSlider: true },
					limit: SliderCount.count <= 15 ? SliderCount.count : 15,
					offset: SliderCount.count <= 15 ? 0 : SliderCount.count - 15,
				});
				res.status(200).json({
					success: true,
					body: { SpecialNews: SpecialNews, SliderNews: SliderNews, ChoiceNews: ChoiceNews, SubNoteNews: SubNoteNews },
				});
			}
		} catch (error) {
			res.status(401).json({
				success: false,
				message: error.message,
			});
			console.log(error);
		}
	};
	// COMMENT
	static Comment = async (req, res) => {
		const fa1 = "شما مدیر هستید .";
		if (req.user.Role === "Lord" || req.user.Role === "Admin") {
			res.status(403).json({
				success: false,
				message: fa1,
			});
		} else {
			try {
				const Comments = await Comment.findOne({
					where: { userId: req.user.id, newsId: req.query.newsId },
				});
				if (Comments !== null) {
					if (Comments.Comment_Status === true) {
						const newComment = await Comment.create({
							Comment_Content: req.query.text,
							newsId: req.query.newsId,
							userId: req.user.id,
							Comment_Status: true,
							Role_Comment: req.user.Role,
						});
						const Comments = await Comment.findAll({
							where: { newsId: newComment.newsId },
							include: [
								{
									model: User,
								},
								{
									model: Responses,
									include: [
										{
											model: User,
										},
									],
								},
							],
						});
						res.status(200).json({
							success: true,
							body: {
								Comments: Comments,
								newCommentId: newComment.id,
							},
							message: "نظر شما با موفقیت منتشر شد.",
						});
					} else {
						res.status(200).json({
							success: false,
							body: {
								Comments: [],
								newCommentId: null,
							},
							message: "نظر قبلی شما در انتظار تایید مدیر است لطفاً صبر کنید .",
						});
					}
				} else {
					await Comment.create({
						Comment_Content: req.query.text,
						newsId: req.query.newsId,
						userId: req.user.id,
						Comment_Status: false,
						Role_Comment: req.user.Role,
					});
					res.status(200).json({
						success: true,
						body: {
							Comment: [],
							newCommentId: null,
						},
						message: "نظر شما با موفقیت ارسال شد بعد از تایید مدیر منتشر خواهد شد .",
					});
				}
			} catch (error) {
				res.status(403).json({
					success: false,
					message: error.message,
				});
			}
		}
	};
	// EDIT COMMENT
	static CommentsEdit = async (req, res) => {
		//
		const fa1 = "شما قادر به ویرایش این نظر نیستید !";
		//
		if (req.query.type === "Comment") {
			try {
				const Comments = await Comment.findByPk(req.query.commentId);
				if (Comments !== null) {
					if (Comments.Role_Comment === req.user.Role && Comments.userId === req.user.id) {
						const UpdComment = await Comments.update({
							Comment_Content: req.query.text,
						});

						const SendComments = await Comment.findOne({
							where: { id: UpdComment.id },
							include: [
								{
									model: User,
								},
								{
									model: Responses,
									include: [
										{
											model: User,
										},
									],
								},
							],
						});
						res.status(200).json({
							success: true,
							body: {
								Comment: SendComments,
								UpdCommentId: UpdComment.id,
								Type: "Comment",
							},
							message: "نظر شما با موفقیت ویرایش شد.",
						});
					} else {
						res.status(403).json({
							success: false,
							message: fa1,
						});
					}
				}
			} catch (error) {
				res.status(403).json({
					success: false,
					message: error.message,
				});
			}
		} else if (req.query.type === "Response") {
			try {
				const GetResponse = await Responses.findByPk(req.query.commentId);
				if (GetResponse !== null) {
					if (GetResponse.Role_Responses === req.user.Role && GetResponse.userId === req.user.id) {
						const UpdResponse = await GetResponse.update({
							Responses_Content: req.query.text,
						});

						const SendResponse = await Responses.findOne({
							where: { id: UpdResponse.id },
							include: [
								{
									model: User,
								},
							],
						});
						res.status(200).json({
							success: true,
							body: {
								Response: SendResponse,
								UpdResponseId: UpdResponse.id,
								Type: "Response",
							},
							message: "نظر شما با موفقیت ویرایش شد.",
						});
					} else {
						res.status(403).json({
							success: false,
							message: fa1,
						});
					}
				}
			} catch (error) {
				res.status(403).json({
					success: false,
					message: error.message,
				});
			}
		} else {
			res.status(403).json({
				success: false,
				message: error.message,
			});
		}
	};
	// DELETE COMMENT
	static CommentsDelete = async (req, res) => {
		//
		const fa1 = "شما قادر به حذف این نظر نیستید !";
		//
		if (req.query.type === "Comment") {
			try {
				const Comments = await Comment.findByPk(req.query.id);
				if (Comments !== null) {
					if (Comments.Role_Comment === req.user.Role && Comments.userId === req.user.id) {
						await Comment.destroy({ where: { id: Comments.id }, force: true });
						await Responses.destroy({ where: { commentId: Comments.id }, force: true });
						const SendComments = await Comment.findAll({
							where: { newsId: req.query.newsId },
							include: [
								{
									model: User,
								},
								{
									model: Responses,
									include: [
										{
											model: User,
										},
									],
								},
							],
						});
						res.status(200).json({
							success: true,
							body: {
								Comments: SendComments,
								Type: "Comment",
							},
							message: "نظر شما با موفقیت حذف شد.",
						});
					} else if (req.user.Role === "Lord") {
						await Comment.destroy({ where: { id: Comments.id }, force: true });
						const SendComments = await Comment.findAll({
							include: [
								{
									model: User,
								},
								{
									model: Responses,
									include: [
										{
											model: User,
										},
									],
								},
							],
						});
						res.status(200).json({
							success: true,
							body: {
								Comments: SendComments,
								Type: "Comment",
							},
							message: "نظر شما با موفقیت حذف شد.",
						});
					} else {
						res.status(403).json({
							success: false,
							message: fa1,
						});
					}
				}
			} catch (error) {
				res.status(403).json({
					success: false,
					message: error.message,
				});
			}
		} else if (req.query.type === "Response") {
			try {
				const GetResponse = await Responses.findByPk(req.query.id);
				if (GetResponse !== null) {
					if (GetResponse.Role_Responses === req.user.Role && GetResponse.userId === req.user.id) {
						await Responses.destroy({ where: { id: GetResponse.id }, force: true });

						const SendComments = await Responses.findAll({
							where: { commentId: req.query.commentId },
							include: [
								{
									model: User,
								},
							],
						});
						res.status(200).json({
							success: true,
							body: {
								Response: SendComments,
								Type: "Response",
								CommentId: Number(req.query.commentId),
							},
							message: "نظر شما با موفقیت حذف شد.",
						});
					} else {
						res.status(403).json({
							success: false,
							message: fa1,
						});
					}
				}
			} catch (error) {
				res.status(403).json({
					success: false,
					message: error.message,
				});
			}
		} else {
			res.status(403).json({
				success: false,
				message: "invaled server!",
			});
		}
	};
	// Responses
	static Responses = async (req, res) => {
		if (req.query.type === "response") {
			try {
				if (req.query.text !== "") {
					const NewsResponse = await Responses.create({
						Responses_Content: req.query.text,
						commentId: req.query.commentId,
						userId: req.user.id,
						Role_Responses: req.user.Role,
					});
					const SelectdNews = await Responses.findAll({
						where: { commentId: NewsResponse.commentId },
						include: [
							{
								model: User,
							},
						],
					});

					res.status(200).json({
						success: true,
						body: {
							UpdateResponses: SelectdNews,
							currentResponses: NewsResponse.id,
							CommentId: NewsResponse.commentId,
						},
					});
				} else {
					res.status(403).json({
						success: false,
						message: "لطفاً نظر خود را پر کنید .",
					});
				}
			} catch (error) {
				res.status(403).json({
					success: false,
					message: error.message,
				});
			}
		} else if (req.query.type === "ResToResponse") {
			try {
				if (req.query.text !== "") {
					const CommentId = await Responses.findByPk(req.query.ResToResponseId);
					const NewsResToResponse = await Responses.create({
						Responses_Content: req.query.text,
						ResponsesToRes: req.query.ResToResponseId,
						commentId: CommentId.commentId,
						userId: req.user.id,
						Role_Responses: req.user.Role,
					});
					const SelectdNews = await Responses.findAll({
						where: { commentId: NewsResToResponse.commentId },
						include: [
							{
								model: User,
							},
						],
					});
					res.status(200).json({
						success: true,
						body: {
							UpdateResToResponse: SelectdNews,
							currentResToResponse: NewsResToResponse.id,
							CommentId: CommentId.commentId,
						},
					});
				} else {
					res.status(403).json({
						success: false,
						message: "لطفاً نظر خود را پر کنید .",
					});
				}
			} catch (error) {
				res.status(403).json({
					success: false,
					message: error.message,
				});
			}
		}
	};
	// COMMENT
	static GetStatusComment = async (req, res) => {
		try {
			const Comments = await Comment.findAndCountAll({
				where: { Comment_Status: false },
				include: [
					{ model: User, attributes: ["id", "User_FirstName", "User_LastName", "Default_Image"] },
					{ model: News, attributes: ["id", "News_Titre", "News_Title", "Category"] },
				],
			});
			if (Comments !== null) {
				res.status(200).json({
					success: true,
					body: {
						Comments: Comments.rows,
						Count: Comments.count,
					},
				});
			} else {
				res.status(200).json({
					success: true,
					message: "لیست نظرات منشر نشده خالی است",
				});
			}
		} catch (error) {
			res.status(403).json({
				success: true,
				message: error.message,
			});
		}
	};
	// VerificationComment
	static VerificationComment = async (req, res) => {
		try {
			const getComment = await Comment.findByPk(req.query.id);
			if (getComment) {
				await getComment.update({ Comment_Status: true });
				await Comment.findAndCountAll({ where: { Comment_Status: false } });
				res.status(200).json({
					success: true,

					message: "خبر با موفقیت منتشر شد .",
				});
			}
		} catch (error) {
			res.status(403).json({
				success: true,
				message: error.message,
			});
		}
	};
	//LAST NEWS
	static LastNews = async (req, res) => {
		try {
			if (req.query.cat) {
				const CountAllpolitic = await News.findAll({ where: { Category: req.query.cat } });
				const countPolitic = await News.findAndCountAll({
					where: { Category: req.query.cat },
					limit: CountAllpolitic.length <= 20 ? CountAllpolitic.length : 20,
					offset: CountAllpolitic.length <= 20 ? 0 : CountAllpolitic.length - 20,
				});
				res.status(200).json({
					success: true,
					body: countPolitic.rows,
				});
			} else {
				const CountAllpolitic = await News.findAll({ where: { Category: "politic" } });
				const countPolitic = await News.findAndCountAll({
					where: { Category: "politic" },
					limit: CountAllpolitic.length <= 10 ? CountAllpolitic.length : 10,
					offset: CountAllpolitic.length <= 10 ? 0 : CountAllpolitic.length - 10,
				});
				//
				const CountAlleconomy = await News.findAll({ where: { Category: "economy" } });
				const countEconomy = await News.findAndCountAll({
					where: { Category: "economy" },
					limit: CountAlleconomy.length <= 10 ? CountAlleconomy.length : 10,
					offset: CountAlleconomy.length <= 10 ? 0 : CountAlleconomy.length - 10,
				});
				//
				const CountAllsocial = await News.findAll({ where: { Category: "social" } });
				const countSocial = await News.findAndCountAll({
					where: { Category: "social" },
					limit: CountAllsocial.length <= 10 ? CountAllsocial.length : 10,
					offset: CountAllsocial.length <= 10 ? 0 : CountAllsocial.length - 10,
				});
				//
				const CountAllsport = await News.findAll({ where: { Category: "sport" } });
				const countSport = await News.findAndCountAll({
					where: { Category: "sport" },
					limit: CountAllsport.length <= 10 ? CountAllsport.length : 10,
					offset: CountAllsport.length <= 10 ? 0 : CountAllsport.length - 10,
				});
				//
				const CountAlllocal = await News.findAll({ where: { Category: "local" } });
				const countLocal = await News.findAndCountAll({
					where: { Category: "local" },
					limit: CountAlllocal.length <= 10 ? CountAlllocal.length : 10,
					offset: CountAlllocal.length <= 10 ? 0 : CountAlllocal.length - 10,
				});
				//
				const Result = [...countPolitic.rows, ...countEconomy.rows, ...countSocial.rows, ...countSport.rows, ...countLocal.rows];
				res.status(200).json({
					success: true,
					body: Result,
				});
			}
		} catch (error) {
			res.status(401).json({
				success: false,
				message: error.message,
			});
		}
	};
	// NewsTickers
	static NewsTickers = async (req, res) => {
		try {
			if (req.query.cat) {
				const CountAllpolitic = await News.findAll({ where: { Category: req.query.cat, MainTicker: true } });
				const countPolitic = await News.findAndCountAll({
					where: { Category: req.query.cat, MainTicker: true },
					limit: CountAllpolitic.length <= 5 ? CountAllpolitic.length : 5,
					offset: CountAllpolitic.length <= 5 ? 0 : CountAllpolitic.length - 5,
				});
				res.status(200).json({
					success: true,
					body: countPolitic.rows,
				});
			} else {
				const CountAllpolitic = await News.findAll({ where: { SubTicker: true } });
				const countPolitic = await News.findAndCountAll({
					where: { SubTicker: true },
					limit: CountAllpolitic.length <= 5 ? CountAllpolitic.length : 5,
					offset: CountAllpolitic.length <= 5 ? 0 : CountAllpolitic.length - 5,
				});
				res.status(200).json({
					success: true,
					body: countPolitic.rows,
				});
			}
		} catch (error) {
			res.status(401).json({
				success: false,
				message: error.message,
			});
		}
	};
}
