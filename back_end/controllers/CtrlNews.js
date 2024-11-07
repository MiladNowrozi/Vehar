import { Op } from "@sequelize/core";
import { News } from "../models/News.js";
// import axios from "axios";
import fs from "fs";
import { Author } from "../models/Author.js";
import { Category } from "../models/Category.js";
import { SubCategory } from "../models/SubCategory.js";
import { OptionNews } from "../models/OptionNews.js";

// fs.readFile("News.json", "utf8", (err, data) => {
// 	if (err) {
// 		console.error(err);
// 		return;
// 	}
// 	const users = JSON.parse(data);

// 	// Access the data
// 	users.forEach(async (user) => {
// 		try {
// 			await News.create({
// 				News_Title: user.title.rendered,
// 				News_Describe: user.excerpt.rendered,
// 				News_Content: user.content.rendered,
// 				createdAt: new Date(user.date),
// 				categoryId: 1,
// 				subCategoryId: 1,
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
					[Op.or]: [{ News_Title: req.body.Title }, { News_Describe: req.body.Description }, { News_Content: req.body.Editor }],
				},
			});
			if (NewsExist === null) {
				try {
					const NotesNewsId = await News.create({
						News_Title: req.body.Title,
						News_Describe: req.body.Description,
						News_Content: req.body.Editor,
						News_Images: req.body.Images,
						News_Status: req.body.NewsStatus,
						Comment_Status: req.body.Comment_Status,
						Column: req.body.Column,
						categoryId: req.body.CategoryId,
						subCategoryId: req.body.SubCategoryId,
						authorId: req.body.AuthorId,
						optionNewsId: req.body.OptionNewsId,
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

	// GET ALL NEWS
	static GetAllNews = async (req, res) => {
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
						const category = await i.getCategory({ raw: true });
						const subCategory = await i.getSubCategory({ raw: true });
						const optionNews = await i.getOptionNews({ raw: true });
						return {
							id: i.id,
							News_Title: i.News_Title,
							News_Describe: i.News_Describe,
							News_Content: i.News_Content,
							News_Images: i.News_Images,
							News_Status: i.News_Status,
							Comment_Status: i.Comment_Status,
							Author: author.Author_FirstName + " " + author.Author_LastName,
							Category: category?.Category,
							SubCategory: subCategory?.SubCategory,
							OptionNews: optionNews?.Option,
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
		} else if (req.query.search !== "null") {
			const SearchInNewsByTitle = await News.findAll({
				// attributes: ["News_Title"],
				where: {
					News_Title: {
						[Op.like]: `%${req.query.search}%`,
					},
				},
			});

			const ResultSearchTitle = await Promise.all(
				SearchInNewsByTitle.map(async (i) => {
					const author = await i.getAuthor({ raw: true });
					const category = await i.getCategory({ raw: true });
					const subCategory = await i.getSubCategory({ raw: true });
					const optionNews = await i.getOptionNews({ raw: true });

					return {
						id: i.id,
						News_Title: i.News_Title,
						News_Describe: i.News_Describe,
						News_Content: i.News_Content,
						News_Images: i.News_Images,
						News_Status: i.News_Status,
						Comment_Status: i.Comment_Status,
						Author: author.Author_FirstName + " " + author.Author_LastName,
						Category: category?.Category,
						SubCategory: subCategory?.SubCategory,
						OptionNews: optionNews?.Option,
						createdAt: i.createdAt,
					};
				})
			);
			res.status(200).json({
				success: true,
				body: {
					News: ResultSearchTitle,
					CurrentPage: parseInt(req.query.currentpage),
					TotalPages: Math.ceil(ResultSearchTitle.length / parseInt(req.query.limit)),
					TotalNews: ResultSearchTitle.length,
				},
				message: req.query.search === "null" ? "هیچ خبری موجود نیست" : `خبری با عنوان (${req.query.search}) وجود ندارد !`,
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
						const category = await i.getCategory({ raw: true });
						const subCategory = await i.getSubCategory({ raw: true });
						const optionNews = await i.getOptionNews({ raw: true });

						return {
							id: i.id,
							News_Title: i.News_Title,
							News_Describe: i.News_Describe,
							News_Content: i.News_Content,
							News_Images: i.News_Images,
							News_Status: i.News_Status,
							Comment_Status: i.Comment_Status,
							Author: author.Author_FirstName + " " + author.Author_LastName,
							Category: category?.Category,
							SubCategory: subCategory?.SubCategory,
							OptionNews: optionNews?.Option,
							createdAt: i.createdAt,
						};
					})
				);

				// if (req.query.search === "null") {
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
				// }
				//  else {
				// 	res.status(200).json({
				// 		success: true,
				// 		body: {
				// 			News: ResultSearchTitle,
				// 			CurrentPage: parseInt(req.query.currentpage),
				// 			TotalPages: Math.ceil(findAndCountAll.count / parseInt(req.query.limit)),
				// 			TotalNews: ResultSearchTitle.length,
				// 		},
				// 		message: req.query.search === "null" ? "هیچ خبری موجود نیست" : `خبری با عنوان (${req.query.search}) وجود ندارد !`,
				// 	});
				// }
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
			const GetOneResult = await News.findByPk(req.params.id);
			if (GetOneResult !== null) {
				res.status(200).json({
					success: true,
					body: GetOneResult.dataValues,
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
			const GetOneResult = await News.findByPk(req.params.id);
			if (GetOneResult) {
				try {
					await News.destroy({ where: { id: req.params.id }, force: true });
					res.status(200).json({
						success: true,
						body: null,
						message: "خبر با موفقیت حذف شد!",
					});
				} catch (error) {
					res.status(200).json({
						success: true,
						body: null,
						message: `سرور با خطا موجه شد علت خطا: ${error.message}`,
					});
				}
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
}
