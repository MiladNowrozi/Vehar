import { News } from "../models/News.js";

export default class NewsControllers {
	static CreateNews = async (req, res) => {
		if (req.body.Category === "sports") {
			try {
				const NewsExist = await SportSpecialNews.findOne({
					where: {
						[Op.or]: [{ News_Title: req.body.Title }, { News_Describe: req.body.Description }, { News_Content: req.body.Editor }],
					},
				});
				if (NewsExist === null) {
					try {
						const NotesNewsId = await SportSpecialNews.create({
							News_Title: req.body.Title,
							News_Describe: req.body.Description,
							News_Content: req.body.Editor,
							News_Images: req.body.Images,
							// authorId: req.body.UserId,
							// categoryId: req.body.categoryId,
						});
						await Sport.create({
							SubCategoryName: req.body.Category,
							SubColumnName: req.body.SubColumn,
							SportSpecialNewsId: NotesNewsId.id,
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
				res.status(404).json({
					success: false,
					message: "متاسفانه عملیات بررسی خبر موجود ناموفق بود، لطفاً با پشتیبانی تماس بگیرید!",
				});
			}
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
		try {
			if (req.params.category === "subColumn") {
				const OneColumn = await News.findOne({
					where: { subColumn: "one-column" },
					order: [["id", "DESC"]],
				});
				const ScendColumn = await News.findOne({
					where: { subColumn: "scend-column" },
					order: [["id", "DESC"]],
				});
				const FirstColumn = await News.findOne({
					where: { subColumn: "first-column" },
					order: [["id", "DESC"]],
				});
				const GetAllResult = [OneColumn, FirstColumn, ScendColumn];
				if (GetAllResult.length > 0) {
					res.status(200).json({
						success: true,
						body: GetAllResult,
						message: "تمام اخبار با موفقیت دریافت شد!",
					});
				} else {
					res.status(404).json({
						success: false,
						body: null,
						message: "هیچ اخباری در این دسته موجود نیست!",
					});
				}
			} else {
				const GetAllResult = await News.findAll({
					where: { category: req.params.category },
					// limit: 2,
				});
				if (GetAllResult.length > 0) {
					res.status(200).json({
						success: true,
						body: GetAllResult,
						message: "تمام اخبار با موفقیت دریافت شد!",
					});
				} else {
					res.status(404).json({
						success: false,
						body: null,
						message: "هیچ اخباری در این دسته موجود نیست!",
					});
				}
			}
		} catch (e) {
			res.status(500).json({
				success: false,
				body: null,
				message: "درخواست برای دریافت اخبار ناموفق بود!",
			});
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
