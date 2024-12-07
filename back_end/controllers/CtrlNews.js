import { Op } from "@sequelize/core";
import { News } from "../models/News.js";
// import axios from "axios";
import fs from "fs";
import { Like } from "../models/Like.js";
import { Comment } from "../models/Comment.js";
import { User } from "../models/User.js";
import { Responses } from "../models/Responses.js";
import { ResToResponses } from "../models/ResToResponses.js";
import { ResToRes } from "../models/ResToRes.js";

// fs.readFile("News.json", "utf8", (err, data) => {
// 	if (err) {
// 		console.error(err);
// 		return;
// 	}
// 	const users = JSON.parse(data);

//  http:[\/]{2,2}localhost:5000[\/A-z-?=0-9۰-۹]+.jpg
// 	// Access the data
// 	users.slice(60, 75).forEach(async (user) => {
// 		const imgRegex = /http:[\/]{2,2}localhost:5000[\/A-z-?=0-9۰-۹][^x<>]+.jpg/gi;
// 		const imageUrls = [];
// 		let match;
// 		while ((match = imgRegex.exec(user.content.rendered)) !== null) {
// 			imageUrls.push(match[0]);
// 		}
// 		try {
// 			await News.create({
// 				News_Titre: "به گزارش پایگاه اطلاع رسانی وهار؛",
// 				News_Title: user.title.rendered,
// 				News_Describe: user.excerpt.rendered,
// 				News_Content: user.content.rendered,
// 				createdAt: new Date(user.date),
// 				News_Images: imageUrls[0].toString(),
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
					[Op.or]: [{ News_Titre: req.body.Titre }, { News_Title: req.body.Title }, { News_Describe: req.body.Description }],
				},
			});
			if (NewsExist === null) {
				try {
					await News.create({
						News_Titre: req.body.Titre,
						News_Title: req.body.Title,
						News_Describe: req.body.Description,
						News_Content: req.body.Editor,
						News_Images: req.body.Images,
						News_Status: req.body.NewsStatus,
						Comment_Status: req.body.Comment_Status,
						MainColumn: req.body.MainColumn,
						MainSubColumn: req.body.SubColumn,
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
		//  else if (req.body.Category === "cultural-and-artistic") {
		//   try {
		//     const NewsExist = await CulturalAndArtistic.findOne({
		//       where: {
		//         [Op.or]: [
		//           { title: req.body.Title },
		//           { Description: req.body.Description },
		//           { content: req.body.Editor },
		//         ],
		//       },
		//     });
		//     if (NewsExist === null) {
		//       try {
		//         await CulturalAndArtistic.create({
		//           title: req.body.Title,
		//           Description: req.body.Description,
		//           content: req.body.Editor,
		//           category: req.body.Category,
		//           images: req.body.Images,
		//           userId: req.body.UserId,
		//           subColumn: req.body.SubColumn,
		//         });
		//         res.status(200).json({
		//           success: true,
		//           message: "خبر با موفقیت ذخیره شد!",
		//         });
		//       } catch (e) {
		//         res.status(412).json({
		//           success: false,
		//           message: e.errors[0].message,
		//         });
		//       }
		//     } else {
		//       res.status(412).json({
		//         success: false,
		//         message: "این خبر قبلاً منتشر شده است!",
		//       });
		//     }
		//   } catch (error) {
		//     res.status(404).json({
		//       success: false,
		//       message: "متاسفانه عملیات بررسی خبر موجود ناموفق بود، لطفاً با پشتیبانی تماس بگیرید!",
		//     });
		//   }
		// } else if (req.body.Category === "political-and-social") {
		//   try {
		//     const NewsExist = await PoliticalAndSocial.findOne({
		//       where: {
		//         [Op.or]: [
		//           { title: req.body.Title },
		//           { Description: req.body.Description },
		//           { content: req.body.Editor },
		//         ],
		//       },
		//     });
		//     if (NewsExist === null) {
		//       try {
		//         await PoliticalAndSocial.create({
		//           title: req.body.Title,
		//           Description: req.body.Description,
		//           content: req.body.Editor,
		//           category: req.body.Category,
		//           images: req.body.Images,
		//           userId: req.body.UserId,
		//           subColumn: req.body.SubColumn,
		//         });
		//         res.status(200).json({
		//           success: true,
		//           message: "خبر با موفقیت ذخیره شد!",
		//         });
		//       } catch (e) {
		//         res.status(412).json({
		//           success: false,
		//           message: e.errors[0].message,
		//         });
		//       }
		//     } else {
		//       res.status(412).json({
		//         success: false,
		//         message: "این خبر قبلاً منتشر شده است!",
		//       });
		//     }
		//   } catch (error) {
		//     res.status(404).json({
		//       success: false,
		//       message: "متاسفانه عملیات بررسی خبر موجود ناموفق بود، لطفاً با پشتیبانی تماس بگیرید!",
		//     });
		//   }
		// } else if (req.body.Category === "special-news") {
		//   try {
		//     const NewsExist = await SpecialNews.findOne({
		//       where: {
		//         [Op.or]: [
		//           { title: req.body.Title },
		//           { Description: req.body.Description },
		//           { content: req.body.Editor },
		//         ],
		//       },
		//     });
		//     if (NewsExist === null) {
		//       try {
		//         await SpecialNews.create({
		//           title: req.body.Title,
		//           Description: req.body.Description,
		//           content: req.body.Editor,
		//           category: req.body.Category,
		//           images: req.body.Images,
		//           userId: req.body.UserId,
		//           subColumn: req.body.SubColumn,
		//         });
		//         res.status(200).json({
		//           success: true,
		//           message: "خبر با موفقیت ذخیره شد!",
		//         });
		//       } catch (e) {
		//         res.status(412).json({
		//           success: false,
		//           message: e.errors[0].message,
		//         });
		//       }
		//     } else {
		//       res.status(412).json({
		//         success: false,
		//         message: "این خبر قبلاً منتشر شده است!",
		//       });
		//     }
		//   } catch (error) {
		//     res.status(404).json({
		//       success: false,
		//       message: "متاسفانه عملیات بررسی خبر موجود ناموفق بود، لطفاً با پشتیبانی تماس بگیرید!",
		//     });
		//   }
		// } else if (req.body.Category === "full-viewers") {
		//   try {
		//     const NewsExist = await FullViewers.findOne({
		//       where: {
		//         [Op.or]: [
		//           { title: req.body.Title },
		//           { Description: req.body.Description },
		//           { content: req.body.Editor },
		//         ],
		//       },
		//     });
		//     if (NewsExist === null) {
		//       try {
		//         await FullViewers.create({
		//           title: req.body.Title,
		//           Description: req.body.Description,
		//           content: req.body.Editor,
		//           category: req.body.Category,
		//           images: req.body.Images,
		//           userId: req.body.UserId,
		//           subColumn: req.body.SubColumn,
		//         });
		//         res.status(200).json({
		//           success: true,
		//           message: "خبر با موفقیت ذخیره شد!",
		//         });
		//       } catch (e) {
		//         res.status(412).json({
		//           success: false,
		//           message: e.errors[0].message,
		//         });
		//       }
		//     } else {
		//       res.status(412).json({
		//         success: false,
		//         message: "این خبر قبلاً منتشر شده است!",
		//       });
		//     }
		//   } catch (error) {
		//     res.status(404).json({
		//       success: false,
		//       message: "متاسفانه عملیات بررسی خبر موجود ناموفق بود، لطفاً با پشتیبانی تماس بگیرید!",
		//     });
		//   }
		// } else if (req.body.Category === "important-news") {
		//   try {
		//     const NewsExist = await ImportantNews.findOne({
		//       where: {
		//         [Op.or]: [
		//           { title: req.body.Title },
		//           { Description: req.body.Description },
		//           { content: req.body.Editor },
		//         ],
		//       },
		//     });
		//     if (NewsExist === null) {
		//       try {
		//         await ImportantNews.create({
		//           title: req.body.Title,
		//           Description: req.body.Description,
		//           content: req.body.Editor,
		//           category: req.body.Category,
		//           images: req.body.Images,
		//           userId: req.body.UserId,
		//           subColumn: req.body.SubColumn,
		//         });
		//         res.status(200).json({
		//           success: true,
		//           message: "خبر با موفقیت ذخیره شد!",
		//         });
		//       } catch (e) {
		//         res.status(412).json({
		//           success: false,
		//           message: e.errors[0].message,
		//         });
		//       }
		//     } else {
		//       res.status(412).json({
		//         success: false,
		//         message: "این خبر قبلاً منتشر شده است!",
		//       });
		//     }
		//   } catch (error) {
		//     res.status(404).json({
		//       success: false,
		//       message: "متاسفانه عملیات بررسی خبر موجود ناموفق بود، لطفاً با پشتیبانی تماس بگیرید!",
		//     });
		//   }
		// } else if (req.body.Category === "dialogue") {
		//   try {
		//     const NewsExist = await Dialogue.findOne({
		//       where: {
		//         [Op.or]: [
		//           { title: req.body.Title },
		//           { Description: req.body.Description },
		//           { content: req.body.Editor },
		//         ],
		//       },
		//     });
		//     if (NewsExist === null) {
		//       try {
		//         await Dialogue.create({
		//           title: req.body.Title,
		//           Description: req.body.Description,
		//           content: req.body.Editor,
		//           category: req.body.Category,
		//           images: req.body.Images,
		//           userId: req.body.UserId,
		//           subColumn: req.body.SubColumn,
		//         });
		//         res.status(200).json({
		//           success: true,
		//           message: "خبر با موفقیت ذخیره شد!",
		//         });
		//       } catch (e) {
		//         res.status(412).json({
		//           success: false,
		//           message: e.errors[0].message,
		//         });
		//       }
		//     } else {
		//       res.status(412).json({
		//         success: false,
		//         message: "این خبر قبلاً منتشر شده است!",
		//       });
		//     }
		//   } catch (error) {
		//     res.status(404).json({
		//       success: false,
		//       message: "متاسفانه عملیات بررسی خبر موجود ناموفق بود، لطفاً با پشتیبانی تماس بگیرید!",
		//     });
		//   }
		// } else if (req.body.Category === "mahdism") {
		//   try {
		//     const NewsExist = await Mahdism.findOne({
		//       where: {
		//         [Op.or]: [
		//           { title: req.body.Title },
		//           { Description: req.body.Description },
		//           { content: req.body.Editor },
		//         ],
		//       },
		//     });
		//     if (NewsExist === null) {
		//       try {
		//         await Mahdism.create({
		//           title: req.body.Title,
		//           Description: req.body.Description,
		//           content: req.body.Editor,
		//           category: req.body.Category,
		//           images: req.body.Images,
		//           userId: req.body.UserId,
		//           subColumn: req.body.SubColumn,
		//         });
		//         res.status(200).json({
		//           success: true,
		//           message: "خبر با موفقیت ذخیره شد!",
		//         });
		//       } catch (e) {
		//         res.status(412).json({
		//           success: false,
		//           message: e.errors[0].message,
		//         });
		//       }
		//     } else {
		//       res.status(412).json({
		//         success: false,
		//         message: "این خبر قبلاً منتشر شده است!",
		//       });
		//     }
		//   } catch (error) {
		//     res.status(404).json({
		//       success: false,
		//       message: "متاسفانه عملیات بررسی خبر موجود ناموفق بود، لطفاً با پشتیبانی تماس بگیرید!",
		//     });
		//   }
		// } else if (req.body.Category === "notes") {
		//   try {
		//     const NewsExist = await Notes.findOne({
		//       where: {
		//         [Op.or]: [
		//           { title: req.body.Title },
		//           { Description: req.body.Description },
		//           { content: req.body.Editor },
		//         ],
		//       },
		//     });
		//     if (NewsExist === null) {
		//       try {
		//         await Notes.create({
		//           title: req.body.Title,
		//           Description: req.body.Description,
		//           content: req.body.Editor,
		//           category: req.body.Category,
		//           images: req.body.Images,
		//           userId: req.body.UserId,
		//           subColumn: req.body.SubColumn,
		//         });
		//         res.status(200).json({
		//           success: true,
		//           message: "خبر با موفقیت ذخیره شد!",
		//         });
		//       } catch (e) {
		//         res.status(412).json({
		//           success: false,
		//           message: e.errors[0].message,
		//         });
		//       }
		//     } else {
		//       res.status(412).json({
		//         success: false,
		//         message: "این خبر قبلاً منتشر شده است!",
		//       });
		//     }
		//   } catch (error) {
		//     res.status(404).json({
		//       success: false,
		//       message: "متاسفانه عملیات بررسی خبر موجود ناموفق بود، لطفاً با پشتیبانی تماس بگیرید!",
		//     });
		//   }
		// } else if (req.body.Category === "chosen") {
		//   try {
		//     const NewsExist = await Chosen.findOne({
		//       where: {
		//         [Op.or]: [
		//           { title: req.body.Title },
		//           { Description: req.body.Description },
		//           { content: req.body.Editor },
		//         ],
		//       },
		//     });
		//     if (NewsExist === null) {
		//       try {
		//         await Chosen.create({
		//           title: req.body.Title,
		//           Description: req.body.Description,
		//           content: req.body.Editor,
		//           category: req.body.Category,
		//           images: req.body.Images,
		//           userId: req.body.UserId,
		//           subColumn: req.body.SubColumn,
		//         });
		//         res.status(200).json({
		//           success: true,
		//           message: "خبر با موفقیت ذخیره شد!",
		//         });
		//       } catch (e) {
		//         res.status(412).json({
		//           success: false,
		//           message: e.errors[0].message,
		//         });
		//       }
		//     } else {
		//       res.status(412).json({
		//         success: false,
		//         message: "این خبر قبلاً منتشر شده است!",
		//       });
		//     }
		//   } catch (error) {
		//     res.status(404).json({
		//       success: false,
		//       message: "متاسفانه عملیات بررسی خبر موجود ناموفق بود، لطفاً با پشتیبانی تماس بگیرید!",
		//     });
		//   }
		// } else if (req.body.Category === "reading") {
		//   try {
		//     const NewsExist = await Reading.findOne({
		//       where: {
		//         [Op.or]: [
		//           { title: req.body.Title },
		//           { Description: req.body.Description },
		//           { content: req.body.Editor },
		//         ],
		//       },
		//     });
		//     if (NewsExist === null) {
		//       try {
		//         await Reading.create({
		//           title: req.body.Title,
		//           Description: req.body.Description,
		//           content: req.body.Editor,
		//           category: req.body.Category,
		//           images: req.body.Images,
		//           userId: req.body.UserId,
		//           subColumn: req.body.SubColumn,
		//         });
		//         res.status(200).json({
		//           success: true,
		//           message: "خبر با موفقیت ذخیره شد!",
		//         });
		//       } catch (e) {
		//         res.status(412).json({
		//           success: false,
		//           message: e.errors[0].message,
		//         });
		//       }
		//     } else {
		//       res.status(412).json({
		//         success: false,
		//         message: "این خبر قبلاً منتشر شده است!",
		//       });
		//     }
		//   } catch (error) {
		//     res.status(404).json({
		//       success: false,
		//       message: "متاسفانه عملیات بررسی خبر موجود ناموفق بود، لطفاً با پشتیبانی تماس بگیرید!",
		//     });
		//   }
		//   // try {
		//   //   await News.create({
		//   //     title: req.body.Title,
		//   //     Description: req.body.Description,
		//   //     content: req.body.Editor,
		//   //     category: req.body.Category,
		//   //     images: req.body.Images,
		//   //     userId: req.body.UserId,
		//   //     subColumn: req.body.SubColumn,
		//   //   });
		//   //   res.status(200).json({
		//   //     success: true,
		//   //     message: "خبر با موفقیت ذخیره شد!",
		//   //   });
		//   // } catch (e) {
		//   //   res.status(412).json({
		//   //     success: false,
		//   //     message: e.errors[0].message,
		//   //   });
		//   // }
		// }
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
	// GET ALL NEWS
	static SearchNewsByIdOrTitle = async (req, res) => {
		if (req.query.searchbyid !== "null") {
			try {
				const GetAllResult = await News.findAndCountAll({
					where: {
						id: req.query.searchbyid,
					},
				});

				const ResultSearchId = await Promise.all(
					GetAllResult.rows.map(async (i) => {
						const author = await i.getAuthor({ raw: true });
						const subCategory = await i.getSubCategory({ raw: true });
						return {
							id: i.id,
							News_Titre: i.News_Titre,
							News_Title: i.News_Title,
							News_Describe: i.News_Describe,
							News_Content: i.News_Content,
							News_Images: i.News_Images,
							News_Status: i.News_Status,
							Comment_Status: i.Comment_Status,
							Author: author.Author_FirstName + " " + author.Author_LastName,
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
					message:
						req.query.searchbyid === "null" ? "هیچ خبری موجود نیست" : `خبری با کد (${req.query.searchbyid}) وجود ندارد!`,
				});
			} catch (e) {
				res.status(500).json({
					success: false,
					body: null,
					message: "درخواست برای دریافت اخبار ناموفق بود!",
				});
			}
		} else if (req.query.search !== "null" && req.query.search.length >= 3) {
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
			});

			const ResultSearchTitle = await Promise.all(
				SearchInNewsByTitle.rows.map(async (i) => {
					const author = await i.getAuthor({ raw: true });
					const subCategory = await i.getSubCategory({ raw: true });
					return {
						id: i.id,
						News_Titre: i.News_Titre,
						News_Title: i.News_Title,
						News_Describe: i.News_Describe,
						News_Content: i.News_Content,
						News_Images: i.News_Images,
						News_Status: i.News_Status,
						Comment_Status: i.Comment_Status,
						Author: author.Author_FirstName + " " + author.Author_LastName,
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
				message:
					req.query.search === "null" ? "هیچ خبری موجود نیست" : `خبری با تیتر/عنوان (${req.query.search}) وجود ندارد !`,
			});
		} else {
			try {
				const findAndCountAll = await News.findAndCountAll({
					limit: parseInt(req.query.limit),
					offset: (parseInt(req.query.currentpage) - 1) * parseInt(req.query.limit),
				});
				const Result = await Promise.all(
					findAndCountAll.rows.map(async (i) => {
						const author = await i.getAuthor({ raw: true });
						const subCategory = await i.getSubCategory({ raw: true });

						return {
							id: i.id,
							News_Titre: i.News_Titre,
							News_Title: i.News_Title,
							News_Describe: i.News_Describe,
							News_Content: i.News_Content,
							News_Images: i.News_Images,
							News_Status: i.News_Status,
							Comment_Status: i.Comment_Status,
							Author: author.Author_FirstName + " " + author.Author_LastName,
							Category: i.Category,
							SubCategory: subCategory?.SubCategory,
							createdAt: i.createdAt,
						};
					})
				);
				res.status(200).json({
					success: true,
					body: {
						News: Result,
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
	// GET ONE NEWS
	static GteNews = async (req, res) => {
		try {
			const GetOneNews = await News.findByPk(req.query.id);
			const GetOneComment = await Comment.findOne({ newsId: GetOneNews.id });
			if (GetOneNews !== null) {
				await GetOneNews.update({ Visit_Count: (GetOneNews.Visit_Count += 1) });
				const author = await GetOneNews.getAuthor({ raw: true });
				const subCategory = await GetOneNews.getSubCategory({ raw: true });
				//
				const CountSpecial = await News.findAll({ where: { Category: GetOneNews.Category, SubPageSlider: true } });
				const SendSpecial = await News.findAll({
					where: { Category: GetOneNews.Category, SubPageSlider: true },
					limit: CountSpecial.length <= 5 ? CountSpecial.length : 5,
					offset: CountSpecial.length <= 5 ? 0 : CountSpecial.length - 5,
				});
				//
				const CountChosen = await News.findAll({ where: { Category: GetOneNews.Category, SubPageColumn: true } });
				const SendChosen = await News.findAll({
					where: { Category: GetOneNews.Category, SubPageColumn: true },
					limit: CountChosen.length <= 5 ? CountChosen.length : 5,
					offset: CountChosen.length <= 5 ? 0 : CountChosen.length - 5,
				});
				const Comments = await Comment.findAll({
					where: { newsId: req.query.id },
					include: [
						{
							model: User,
							attributes: ["id", "User_FirstName", "User_LastName", "User_Img"], // Specify the attributes you want from User
						},
						{
							model: Responses,
							attributes: ["id", "Responses_Content", "createdAt", "commentId"], // Specify the attributes you want from User
							include: [
								{
									model: User,
									attributes: ["id", "User_FirstName", "User_LastName", "User_Img"], // Specify the attributes you want from User
								},
								{
									model: ResToResponses,
									attributes: ["id", "ResToResponses_Content", "createdAt", "responsesId"], // Specify the attributes you want from User
									include: [
										{
											model: User,
											attributes: ["id", "User_FirstName", "User_LastName", "User_Img"], // Specify the attributes you want from User
										},
										{
											model: ResToRes,
											attributes: ["id", "ResToRes_Content", "createdAt", "resToResponsesId"], // Specify the attributes you want from User
											include: [
												{
													model: User,
													attributes: ["id", "User_FirstName", "User_LastName", "User_Img"], // Specify the attributes you want from User
												},
											],
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
						CurrentNews: {
							id: GetOneNews.id,
							News_Titre: GetOneNews.News_Titre,
							News_Title: GetOneNews.News_Title,
							News_Describe: GetOneNews.News_Describe,
							News_Content: GetOneNews.News_Content,
							News_Images: GetOneNews.News_Images,
							News_Status: GetOneNews.News_Status,
							Comment_Status: GetOneNews.Comment_Status,
							Author: author.Author_FirstName + " " + author.Author_LastName,
							Category: GetOneNews.Category,
							SubCategory: subCategory?.SubCategory,
							createdAt: GetOneNews.createdAt,
						},
						Likes: {
							Like_Count: GetOneNews.Like_Count,
							Like_Comment: GetOneComment ? GetOneComment.Like_Comment : 0,
							UnLike_Comment: GetOneComment ? GetOneComment.UnLike_Comment : 0,
						},
						SendSpecial: SendSpecial,
						SendChosen: SendChosen,
						Comments: Comments,
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
			res.status(500).json({
				success: true,
				body: null,
				message: "درخواست دریافت خبر ناموفق بود!",
			});
		}
	};
	// UPDATE ONE NEWS
	static UpdNews = async (req, res) => {
		try {
			const GetOneNewsForUpd = await News.findByPk(req.params.id);
			if (GetOneNewsForUpd.dataValues !== null) {
				const NewsExistCheck = await News.findOne({
					where: {
						[Op.or]: [{ title: req.params.Title }, { Description: req.params.Description }, { content: req.params.Editor }],
					},
				});
				// check that exist news by this content or not is and if is exist it is id matched by this id or not is
				if (NewsExistCheck === null || NewsExistCheck.id === req.params.id) {
					const NewsIsSame = await News.findOne({
						where: {
							title: req.params.Title,
							Description: req.params.Description,
							content: req.params.Editor,
							category: req.params.Category,
						},
					});
					// checked news content matched by this current content or not is
					if (NewsIsSame === null) {
						try {
							await News.update(
								{
									title: req.params.Title,
									Description: req.params.Description,
									content: req.params.Editor,
									category: req.params.Category,
								},
								{ where: { id: req.params.id } }
							);
							await GetOneNewsForUpd.reload();
							res.status(200).json({
								success: true,
								body: GetOneNewsForUpd,
								message: "خبر با موفقیت آپدیت شد!",
							});
						} catch (error) {
							res.status(412).json({
								success: false,
								body: null,
								message: "متاسفانه آپدیت خبر ناموفق بود!",
							});
						}
					} else {
						res.status(412).json({
							success: false,
							body: null,
							message: "لطفاً تغییری در محتوای خبر ایجاد کنید!",
						});
					}
				} else {
					res.status(412).json({
						success: false,
						body: null,
						message: "یک خبر با این محتوا موجود است!",
					});
				}
			} else {
				res.status(412).json({
					success: false,
					body: null,
					menubar: "چنین خبری موجود نیست!",
				});
			}
		} catch (error) {
			res.status(404).json({
				success: false,
				body: null,
				message: "متاسفانه دیتابیس شما با مشکل مواجه است!",
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
	static NewsLike = async (req, res) => {
		try {
			if (req.query.type === "news") {
				const GetOneNews = await News.findByPk(req.query.id);
				const GetOneComment = await Comment.findOne({ newsId: GetOneNews.id });
				if (GetOneNews !== null) {
					const LikeCachk = await Like.findOne({ where: { userId: req.user.id, newsId: GetOneNews.id } });
					if (LikeCachk === null) {
						await Like.create({ Like_News: true, userId: req.user.id, newsId: GetOneNews.id });
						await GetOneNews.update({ Like_Count: (GetOneNews.Like_Count += 1) });
					} else {
						if (LikeCachk.Like_News === true) {
							await LikeCachk.update({ Like_News: false });
							await GetOneNews.update({ Like_Count: (GetOneNews.Like_Count -= 1) });
						} else {
							await LikeCachk.update({ Like_News: true });
							await GetOneNews.update({ Like_Count: (GetOneNews.Like_Count += 1) });
						}
					}
					res.status(200).json({
						body: {
							Like_Count: GetOneNews.Like_Count,
							Like_Comment: GetOneComment && GetOneComment.Like_Comment,
							UnLike_Comment: GetOneComment && GetOneComment.UnLike_Comment,
						},
					});
				} else {
					res.status(403).json({
						success: false,
						message: "News not find!",
					});
				}
			} else if (req.query.type === "comment") {
				const GetOneComment = await Comment.findByPk(req.query.id);
				const GetOneNews = await News.findByPk(GetOneComment.newsId);
				if (GetOneComment !== null) {
					const LikeCachk = await Like.findOne({ where: { commentId: GetOneComment.id, userId: req.user.id } });
					if (LikeCachk === null) {
						await Like.create({
							Like_Comment: true,
							newsId: GetOneNews.id,
							userId: req.user.id,
							commentId: GetOneComment.id,
						});
						await GetOneComment.update({ Like_Comment: (GetOneComment.Like_Comment += 1) });
					} else {
						if (LikeCachk.Like_Comment === true) {
							if (LikeCachk.UnLike_Comment === true) {
								await LikeCachk.update({
									Like_Comment: false,
									UnLike_Comment: false,
									userId: req.user.id,
									commentId: GetOneComment.id,
								});
								await GetOneComment.update({
									Like_Comment: (GetOneComment.Like_Comment -= 1),
									UnLike_Comment: (GetOneComment.UnLike_Comment -= 1),
								});
							} else {
								await LikeCachk.update({
									Like_Comment: false,
									userId: req.user.id,
									commentId: GetOneComment.id,
								});
								await GetOneComment.update({
									Like_Comment: (GetOneComment.Like_Comment -= 1),
								});
							}
						} else {
							if (LikeCachk.UnLike_Comment === true) {
								await LikeCachk.update({
									UnLike_Comment: false,
									Like_Comment: true,
									userId: req.user.id,
									commentId: GetOneComment.id,
								});
								await GetOneComment.update({
									UnLike_Comment: (GetOneComment.UnLike_Comment -= 1),
									Like_Comment: (GetOneComment.Like_Comment += 1),
								});
							} else {
								await LikeCachk.update({
									Like_Comment: true,
									userId: req.user.id,
									commentId: GetOneComment.id,
								});
								await GetOneComment.update({
									Like_Comment: (GetOneComment.Like_Comment += 1),
								});
							}
						}
					}
					res.status(200).json({
						body: {
							Like_Count: GetOneNews.Like_Count,
							Like_Comment: GetOneComment.Like_Comment,
							UnLike_Comment: GetOneComment.UnLike_Comment,
						},
					});
				} else {
					res.status(403).json({
						success: false,
						message: "Comment not find!",
					});
				}
			} else if (req.query.type === "uncomment") {
				const GetOneComment = await Comment.findByPk(req.query.id);
				const GetOneNews = await News.findByPk(GetOneComment.newsId);
				if (GetOneComment !== null) {
					const LikeCachk = await Like.findOne({ where: { commentId: GetOneComment.id, userId: req.user.id } });
					if (LikeCachk === null) {
						await Like.create({
							UnLike_Comment: true,
							newsId: GetOneNews.id,
							userId: req.user.id,
							commentId: GetOneComment.id,
						});
						await GetOneComment.update({ UnLike_Comment: (GetOneComment.UnLike_Comment += 1) });
					} else {
						if (LikeCachk.UnLike_Comment === true) {
							if (LikeCachk.Like_Comment === true) {
								await LikeCachk.update({
									UnLike_Comment: false,
									Like_Comment: false,
									userId: req.user.id,
									commentId: GetOneComment.id,
								});
								await GetOneComment.update({
									UnLike_Comment: (GetOneComment.UnLike_Comment -= 1),
									Like_Comment: (GetOneComment.Like_Comment -= 1),
								});
							} else {
								await LikeCachk.update({
									UnLike_Comment: false,
									userId: req.user.id,
									commentId: GetOneComment.id,
								});
								await GetOneComment.update({
									UnLike_Comment: (GetOneComment.UnLike_Comment -= 1),
								});
							}
						} else {
							if (LikeCachk.Like_Comment === true) {
								await LikeCachk.update({
									Like_Comment: false,
									UnLike_Comment: true,
									userId: req.user.id,
									commentId: GetOneComment.id,
								});
								await GetOneComment.update({
									Like_Comment: (GetOneComment.Like_Comment -= 1),
									UnLike_Comment: (GetOneComment.UnLike_Comment += 1),
								});
							} else {
								await LikeCachk.update({
									UnLike_Comment: true,
									userId: req.user.id,
									commentId: GetOneComment.id,
								});
								await GetOneComment.update({
									UnLike_Comment: (GetOneComment.UnLike_Comment += 1),
								});
							}
						}
					}
					res.status(200).json({
						body: {
							Like_Count: GetOneNews.Like_Count,
							Like_Comment: GetOneComment.Like_Comment,
							UnLike_Comment: GetOneComment.UnLike_Comment,
						},
					});
				} else {
					res.status(403).json({
						success: false,
						message: "Comment not find!",
					});
				}
			} else {
				res.status(403).json({
					success: false,
					message: "invalid request server!",
				});
			}
		} catch (error) {
			res.status(403).json({
				success: false,
				message: error.message,
			});
		}
	};
	// MOST VISITED
	static MostVisited = async (req, res) => {
		try {
			if (req.query.cat === "politic") {
				const MostVisitedNews = await News.findAll({
					where: { Category: req.query.cat },
					order: [["Visit_Count", "DESC"]], // Order by visitCount in descending order
					limit: 15, // Limit to the top 10 most visited posts
				});
				res.status(200).json({
					success: true,
					body: MostVisitedNews,
				});
			} else if (req.query.cat === "economy") {
				const MostVisitedNews = await News.findAll({
					where: { Category: req.query.cat },
					order: [["Visit_Count", "DESC"]], // Order by visitCount in descending order
					limit: 15, // Limit to the top 10 most visited posts
				});
				res.status(200).json({
					success: true,
					body: MostVisitedNews,
				});
			} else if (req.query.cat === "social") {
				const MostVisitedNews = await News.findAll({
					where: { Category: req.query.cat },
					order: [["Visit_Count", "DESC"]], // Order by visitCount in descending order
					limit: 15, // Limit to the top 10 most visited posts
				});
				res.status(200).json({
					success: true,
					body: MostVisitedNews,
				});
			} else if (req.query.cat === "sport") {
				const MostVisitedNews = await News.findAll({
					where: { Category: req.query.cat },
					order: [["Visit_Count", "DESC"]], // Order by visitCount in descending order
					limit: 15, // Limit to the top 10 most visited posts
				});
				res.status(200).json({
					success: true,
					body: MostVisitedNews,
				});
			} else if (req.query.cat === "local") {
				const MostVisitedNews = await News.findAll({
					where: { Category: req.query.cat },
					order: [["Visit_Count", "DESC"]], // Order by visitCount in descending order
					limit: 15, // Limit to the top 10 most visited posts
				});
				res.status(200).json({
					success: true,
					body: MostVisitedNews,
				});
			} else {
				const MostVisitedNews = await News.findAll({
					order: [["Visit_Count", "DESC"]], // Order by visitCount in descending order
					limit: 10, // Limit to the top 10 most visited posts
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
			if (req.query.cat === "politic") {
				const SliderCount = await News.findAndCountAll({ where: { Category: req.query.cat, SubPageSlider: true } });
				const ChoiceCount = await News.findAndCountAll({ where: { Category: req.query.cat, SubPageColumn: true } });
				const SubNoteCount = await News.findAndCountAll({ where: { Category: req.query.cat, SubNote: true } });

				const SubNoteNews = await News.findAll({
					where: { Category: req.query.cat, SubNote: true }, // Limit to the top 10 most visited posts
					limit: 1,
					offset: SubNoteCount.count <= 1 ? 0 : SubNoteCount.count - 1,
				});
				const ChoiceNews = await News.findAll({
					where: { Category: req.query.cat, SubPageColumn: true },
					limit: ChoiceCount.count <= 6 ? ChoiceCount.count : 6, // Limit to the top 10 most visited posts
					offset: ChoiceCount.count <= 6 ? 0 : ChoiceCount.count - 6,
				});
				const SliderNews = await News.findAll({
					where: { Category: req.query.cat, SubPageSlider: true },
					limit: 3, // Limit to the top 10 most visited posts
					offset: SliderCount.count - 3,
				});
				const SpecialNews = await News.findAll({
					where: { Category: req.query.cat, SubPageSlider: true },
					limit: SliderCount.count <= 18 ? SliderCount.count - 3 : 15, // Limit to the top 10 most visited posts
					offset: SliderCount.count <= 18 ? 0 : SliderCount.count - 18,
				});
				const Result = await Promise.all(
					SpecialNews.map(async (i) => {
						const author = await i.getAuthor({ raw: true });
						const subCategory = await i.getSubCategory({ raw: true });
						return {
							id: i.id,
							News_Titre: i.News_Titre,
							News_Title: i.News_Title,
							News_Describe: i.News_Describe,
							News_Content: i.News_Content,
							News_Images: i.News_Images,
							News_Status: i.News_Status,
							Comment_Status: i.Comment_Status,
							Author: author.Author_FirstName + " " + author.Author_LastName,
							Category: i.Category,
							SubCategory: subCategory?.SubCategory,
							createdAt: i.createdAt,
						};
					})
				);
				res.status(200).json({
					success: true,
					body: { SpecialNews: Result, SliderNews: SliderNews, ChoiceNews: ChoiceNews, SubNoteNews: SubNoteNews },
				});
			} else if (req.query.cat === "economy") {
				const SliderCount = await News.findAndCountAll({ where: { Category: req.query.cat, SubPageSlider: true } });
				const ChoiceCount = await News.findAndCountAll({ where: { Category: req.query.cat, SubPageColumn: true } });
				const SubNoteCount = await News.findAndCountAll({ where: { Category: req.query.cat, SubNote: true } });

				const SubNoteNews = await News.findAll({
					where: { Category: req.query.cat, SubNote: true }, // Limit to the top 10 most visited posts
					limit: 1,
					offset: SubNoteCount.count <= 1 ? 0 : SubNoteCount.count - 1,
				});
				const ChoiceNews = await News.findAll({
					where: { Category: req.query.cat, SubPageColumn: true },
					limit: ChoiceCount.count <= 6 ? ChoiceCount.count : 6, // Limit to the top 10 most visited posts
					offset: ChoiceCount.count <= 6 ? 0 : ChoiceCount.count - 6,
				});
				const SliderNews = await News.findAll({
					where: { Category: req.query.cat, SubPageSlider: true },
					limit: 3, // Limit to the top 10 most visited posts
					offset: SliderCount.count - 3,
				});
				const SpecialNews = await News.findAll({
					where: { Category: req.query.cat, SubPageSlider: true },
					limit: SliderCount.count <= 18 ? SliderCount.count - 3 : 15, // Limit to the top 10 most visited posts
					offset: SliderCount.count <= 18 ? 0 : SliderCount.count - 18,
				});
				const Result = await Promise.all(
					SpecialNews.map(async (i) => {
						const author = await i.getAuthor({ raw: true });
						const subCategory = await i.getSubCategory({ raw: true });
						return {
							id: i.id,
							News_Titre: i.News_Titre,
							News_Title: i.News_Title,
							News_Describe: i.News_Describe,
							News_Content: i.News_Content,
							News_Images: i.News_Images,
							News_Status: i.News_Status,
							Comment_Status: i.Comment_Status,
							Author: author.Author_FirstName + " " + author.Author_LastName,
							Category: i.Category,
							SubCategory: subCategory?.SubCategory,
							createdAt: i.createdAt,
						};
					})
				);
				res.status(200).json({
					success: true,
					body: { SpecialNews: Result, SliderNews: SliderNews, ChoiceNews: ChoiceNews, SubNoteNews: SubNoteNews },
				});
			} else if (req.query.cat === "social") {
				const SliderCount = await News.findAndCountAll({ where: { Category: req.query.cat, SubPageSlider: true } });
				const ChoiceCount = await News.findAndCountAll({ where: { Category: req.query.cat, SubPageColumn: true } });
				const SubNoteCount = await News.findAndCountAll({ where: { Category: req.query.cat, SubNote: true } });

				const SubNoteNews = await News.findAll({
					where: { Category: req.query.cat, SubNote: true }, // Limit to the top 10 most visited posts
					limit: 1,
					offset: SubNoteCount.count <= 1 ? 0 : SubNoteCount.count - 1,
				});
				const ChoiceNews = await News.findAll({
					where: { Category: req.query.cat, SubPageColumn: true },
					limit: ChoiceCount.count <= 6 ? ChoiceCount.count : 6, // Limit to the top 10 most visited posts
					offset: ChoiceCount.count <= 6 ? 0 : ChoiceCount.count - 6,
				});
				const SliderNews = await News.findAll({
					where: { Category: req.query.cat, SubPageSlider: true },
					limit: 3, // Limit to the top 10 most visited posts
					offset: SliderCount.count - 3,
				});
				const SpecialNews = await News.findAll({
					where: { Category: req.query.cat, SubPageSlider: true },
					limit: SliderCount.count <= 18 ? SliderCount.count - 3 : 15, // Limit to the top 10 most visited posts
					offset: SliderCount.count <= 18 ? 0 : SliderCount.count - 18,
				});
				const Result = await Promise.all(
					SpecialNews.map(async (i) => {
						const author = await i.getAuthor({ raw: true });
						const subCategory = await i.getSubCategory({ raw: true });
						return {
							id: i.id,
							News_Titre: i.News_Titre,
							News_Title: i.News_Title,
							News_Describe: i.News_Describe,
							News_Content: i.News_Content,
							News_Images: i.News_Images,
							News_Status: i.News_Status,
							Comment_Status: i.Comment_Status,
							Author: author.Author_FirstName + " " + author.Author_LastName,
							Category: i.Category,
							SubCategory: subCategory?.SubCategory,
							createdAt: i.createdAt,
						};
					})
				);
				res.status(200).json({
					success: true,
					body: { SpecialNews: Result, SliderNews: SliderNews, ChoiceNews: ChoiceNews, SubNoteNews: SubNoteNews },
				});
			} else if (req.query.cat === "sport") {
				const SliderCount = await News.findAndCountAll({ where: { Category: req.query.cat, SubPageSlider: true } });
				const ChoiceCount = await News.findAndCountAll({ where: { Category: req.query.cat, SubPageColumn: true } });
				const SubNoteCount = await News.findAndCountAll({ where: { Category: req.query.cat, SubNote: true } });

				const SubNoteNews = await News.findAll({
					where: { Category: req.query.cat, SubNote: true }, // Limit to the top 10 most visited posts
					limit: 1,
					offset: SubNoteCount.count <= 1 ? 0 : SubNoteCount.count - 1,
				});
				const ChoiceNews = await News.findAll({
					where: { Category: req.query.cat, SubPageColumn: true },
					limit: ChoiceCount.count <= 6 ? ChoiceCount.count : 6, // Limit to the top 10 most visited posts
					offset: ChoiceCount.count <= 6 ? 0 : ChoiceCount.count - 6,
				});
				const SliderNews = await News.findAll({
					where: { Category: req.query.cat, SubPageSlider: true },
					limit: 3, // Limit to the top 10 most visited posts
					offset: SliderCount.count - 3,
				});
				const SpecialNews = await News.findAll({
					where: { Category: req.query.cat, SubPageSlider: true },
					limit: SliderCount.count <= 18 ? SliderCount.count - 3 : 15, // Limit to the top 10 most visited posts
					offset: SliderCount.count <= 18 ? 0 : SliderCount.count - 18,
				});
				const Result = await Promise.all(
					SpecialNews.map(async (i) => {
						const author = await i.getAuthor({ raw: true });
						const subCategory = await i.getSubCategory({ raw: true });
						return {
							id: i.id,
							News_Titre: i.News_Titre,
							News_Title: i.News_Title,
							News_Describe: i.News_Describe,
							News_Content: i.News_Content,
							News_Images: i.News_Images,
							News_Status: i.News_Status,
							Comment_Status: i.Comment_Status,
							Author: author.Author_FirstName + " " + author.Author_LastName,
							Category: i.Category,
							SubCategory: subCategory?.SubCategory,
							createdAt: i.createdAt,
						};
					})
				);
				res.status(200).json({
					success: true,
					body: { SpecialNews: Result, SliderNews: SliderNews, ChoiceNews: ChoiceNews, SubNoteNews: SubNoteNews },
				});
			} else if (req.query.cat === "local") {
				const SliderCount = await News.findAndCountAll({ where: { Category: req.query.cat, SubPageSlider: true } });
				const ChoiceCount = await News.findAndCountAll({ where: { Category: req.query.cat, SubPageColumn: true } });
				const SubNoteCount = await News.findAndCountAll({ where: { Category: req.query.cat, SubNote: true } });

				const SubNoteNews = await News.findAll({
					where: { Category: req.query.cat, SubNote: true }, // Limit to the top 10 most visited posts
					limit: 1,
					offset: SubNoteCount.count <= 1 ? 0 : SubNoteCount.count - 1,
				});
				const ChoiceNews = await News.findAll({
					where: { Category: req.query.cat, SubPageColumn: true },
					limit: ChoiceCount.count <= 6 ? ChoiceCount.count : 6, // Limit to the top 10 most visited posts
					offset: ChoiceCount.count <= 6 ? 0 : ChoiceCount.count - 6,
				});
				const SliderNews = await News.findAll({
					where: { Category: req.query.cat, SubPageSlider: true },
					limit: 3, // Limit to the top 10 most visited posts
					offset: SliderCount.count - 3,
				});
				const SpecialNews = await News.findAll({
					where: { Category: req.query.cat, SubPageSlider: true },
					limit: SliderCount.count <= 18 ? SliderCount.count - 3 : 15, // Limit to the top 10 most visited posts
					offset: SliderCount.count <= 18 ? 0 : SliderCount.count - 18,
				});
				const Result = await Promise.all(
					SpecialNews.map(async (i) => {
						const author = await i.getAuthor({ raw: true });
						const subCategory = await i.getSubCategory({ raw: true });
						return {
							id: i.id,
							News_Titre: i.News_Titre,
							News_Title: i.News_Title,
							News_Describe: i.News_Describe,
							News_Content: i.News_Content,
							News_Images: i.News_Images,
							News_Status: i.News_Status,
							Comment_Status: i.Comment_Status,
							Author: author.Author_FirstName + " " + author.Author_LastName,
							Category: i.Category,
							SubCategory: subCategory?.SubCategory,
							createdAt: i.createdAt,
						};
					})
				);
				res.status(200).json({
					success: true,
					body: { SpecialNews: Result, SliderNews: SliderNews, ChoiceNews: ChoiceNews, SubNoteNews: SubNoteNews },
				});
			} else {
				const SliderCount = await News.findAndCountAll({ where: { SubPageSlider: true } });
				const ChoiceCount = await News.findAndCountAll({ where: { SubPageColumn: true } });
				const SubNoteCount = await News.findAndCountAll({ where: { SubNote: true } });
				const SubNoteNews = await News.findAll({
					where: { SubNote: true }, // Limit to the top 10 most visited posts
					limit: 1,
					offset: SubNoteCount.count <= 1 ? 0 : SubNoteCount.count - 1,
				});
				const ChoiceNews = await News.findAll({
					where: { SubPageColumn: true },
					limit: ChoiceCount.count <= 6 ? ChoiceCount.count : 6, // Limit to the top 10 most visited posts
					offset: ChoiceCount.count <= 6 ? 0 : ChoiceCount.count - 6,
				});
				const SliderNews = await News.findAll({
					where: { SubPageSlider: true },
					limit: 3, // Limit to the top 10 most visited posts
					offset: SliderCount.count - 3,
				});
				const SpecialNews = await News.findAll({
					where: { SubPageSlider: true },
					limit: SliderCount.count <= 18 ? SliderCount.count - 3 : 15, // Limit to the top 10 most visited posts
					offset: SliderCount.count <= 18 ? 0 : SliderCount.count - 18,
				});
				const Result = await Promise.all(
					SpecialNews.map(async (i) => {
						const author = await i.getAuthor({ raw: true });
						const subCategory = await i.getSubCategory({ raw: true });
						return {
							id: i.id,
							News_Titre: i.News_Titre,
							News_Title: i.News_Title,
							News_Describe: i.News_Describe,
							News_Content: i.News_Content,
							News_Images: i.News_Images,
							News_Status: i.News_Status,
							Comment_Status: i.Comment_Status,
							Author: author.Author_FirstName + " " + author.Author_LastName,
							Category: i.Category,
							SubCategory: subCategory?.SubCategory,
							createdAt: i.createdAt,
						};
					})
				);
				res.status(200).json({
					success: true,
					body: { SpecialNews: Result, SliderNews: SliderNews, ChoiceNews: ChoiceNews, SubNoteNews: SubNoteNews },
				});
			}
		} catch (error) {
			res.status(401).json({
				success: false,
				message: error.message,
			});
		}
	};
	// COMMENT
	static Comment = async (req, res) => {
		try {
			const Comments = await Comment.findOne({
				where: { userId: req.user.id, newsId: req.query.newsId },
			});
			if (Comments !== null) {
				if (Comments.Comment_Status === true) {
					await Comment.create({
						Comment_Content: req.query.text,
						newsId: req.query.newsId,
						userId: req.user.id,
						Comment_Status: true,
					});
					res.status(200).json({
						success: true,
						message: "نظر شما با موفقیت ارسال شد بعد از تایید مدیر منتشر خواهد شد .",
					});
				} else {
					res.status(200).json({
						success: true,
						message: "نظر قبلی شما در انتظار تایید مدیر است لطفاً صبر کنید .",
					});
				}
			} else {
				await Comment.create({
					Comment_Content: req.query.text,
					newsId: req.query.newsId,
					userId: req.user.id,
				});
				res.status(200).json({
					success: true,
					message: "نظر شما با موفقیت ارسال شد بعد از تایید مدیر منتشر خواهد شد .",
				});
			}
		} catch (error) {
			res.status(403).json({
				success: false,
				message: error.message,
			});
		}
	};
	// Responses
	static Responses = async (req, res) => {
		try {
			if (req.query.text !== "") {
				const NewsResponse = await Responses.create({
					Responses_Content: req.query.text,
					commentId: req.query.commentId,
					userId: req.user.id,
				});
				const SendCourntResponde = await Comment.findOne({
					where: { id: NewsResponse.commentId },
					include: [
						{
							model: User,
							attributes: ["id", "User_FirstName", "User_LastName", "User_Img"], // Specify the attributes you want from User
						},
						{
							model: Responses,
							attributes: ["id", "Responses_Content", "createdAt", "commentId"], // Specify the attributes you want from User
							include: [
								{
									model: User,
									attributes: ["id", "User_FirstName", "User_LastName", "User_Img"], // Specify the attributes you want from User
								},
								{
									model: ResToResponses,
									attributes: ["id", "ResToResponses_Content", "createdAt", "responsesId"], // Specify the attributes you want from User
									include: [
										{
											model: User,
											attributes: ["id", "User_FirstName", "User_LastName", "User_Img"], // Specify the attributes you want from User
										},
									],
								},
							],
						},
					],
				});
				res.status(200).json({
					success: true,
					body: SendCourntResponde,
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
	};
	// Responses
	static ResToResponses = async (req, res) => {
		try {
			if (req.query.text !== "") {
				await ResToResponses.create({
					ResToResponses_Content: req.query.text,
					responsesId: req.query.resId,
					userId: req.user.id,
				});
				const SendAllNewsResToResponse = await ResToResponses.findAll({
					include: [
						{
							model: User,
							attributes: ["id", "User_FirstName", "User_LastName", "User_Img"], // Specify the attributes you want from User
						},
					],
				});
				res.status(200).json({
					success: true,
					body: SendAllNewsResToResponse,
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
	};
	// Responses
	static ResToRes = async (req, res) => {
		try {
			if (req.query.text !== "") {
				await ResToRes.create({
					ResToRes_Content: req.query.text,
					resToResponsesId: req.query.resToResId,
					userId: req.user.id,
				});
				const SendAllNewsResToRes = await ResToRes.findAll({
					include: [
						{
							model: User,
							attributes: ["id", "User_FirstName", "User_LastName", "User_Img"], // Specify the attributes you want from User
						},
					],
				});
				res.status(200).json({
					success: true,
					body: SendAllNewsResToRes,
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
	};
	// COMMENT
	static GetStatusComment = async (req, res) => {
		try {
			const Comments = await Comment.findAndCountAll({
				where: { Comment_Status: false },
				include: [
					{ model: User, attributes: ["id", "User_FirstName", "User_LastName", "User_Img"] },
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

	static LastNews = async (req, res) => {
		try {
			if (req.query.cat === "politic") {
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
			} else if (req.query.cat === "economy") {
				const CountAllpolitic = await News.findAll({ where: { Category: req.query.cat } });
				const countEconomy = await News.findAndCountAll({
					where: { Category: req.query.cat },
					limit: CountAllpolitic.length <= 20 ? CountAllpolitic.length : 20,
					offset: CountAllpolitic.length <= 20 ? 0 : CountAllpolitic.length - 20,
				});
				res.status(200).json({
					success: true,
					body: countEconomy.rows,
				});
			} else if (req.query.cat === "social") {
				const CountAllpolitic = await News.findAll({ where: { Category: req.query.cat } });
				const countSocial = await News.findAndCountAll({
					where: { Category: req.query.cat },
					limit: CountAllpolitic.length <= 20 ? CountAllpolitic.length : 20,
					offset: CountAllpolitic.length <= 20 ? 0 : CountAllpolitic.length - 20,
				});
				res.status(200).json({
					success: true,
					body: countSocial.rows,
				});
			} else if (req.query.cat === "sport") {
				const CountAllpolitic = await News.findAll({ where: { Category: req.query.cat } });
				const countSport = await News.findAndCountAll({
					where: { Category: req.query.cat },
					limit: CountAllpolitic.length <= 20 ? CountAllpolitic.length : 20,
					offset: CountAllpolitic.length <= 20 ? 0 : CountAllpolitic.length - 20,
				});
				res.status(200).json({
					success: true,
					body: countSport.rows,
				});
			} else if (req.query.cat === "local") {
				const CountAllpolitic = await News.findAll({ where: { Category: req.query.cat } });
				const countLocal = await News.findAndCountAll({
					where: { Category: req.query.cat },
					limit: CountAllpolitic.length <= 20 ? CountAllpolitic.length : 20,
					offset: CountAllpolitic.length <= 20 ? 0 : CountAllpolitic.length - 20,
				});
				res.status(200).json({
					success: true,
					body: countLocal.rows,
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
				const Result = [
					...countPolitic.rows,
					...countEconomy.rows,
					...countSocial.rows,
					...countSport.rows,
					...countLocal.rows,
				];
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
}
