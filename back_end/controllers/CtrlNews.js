import { Op, sql } from "@sequelize/core";
import { News } from "../models/News.js";
import db from "../db.js";

export default class NewsControllers {
  // CREATE ONE NEWS

  static CreateNews = async (req, res) => {
    try {
      await db.authenticate();
      try {
        db.queryInterface.tableExists("News").then(async (e) => {
          if (e) {
            try {
              const NewsExistCheck = await News.findOne({
                where: {
                  [Op.or]: [
                    { title: req.body.Title },
                    { Short_Description: req.body.Short_Description },
                    { content: req.body.Editor },
                  ],
                },
              });
              if (NewsExistCheck === null) {
                try {
                  await News.create({
                    title: req.body.Title,
                    Short_Description: req.body.Short_Description,
                    content: req.body.Editor,
                    category: req.body.Category,
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
                message: "متاسفانه دیتابیس شما با مشکل مواجه است دوباره تلاش کنید!",
              });
            }
          } else {
            if (req.body.Create_Table === null) {
              res.status(500).json({
                success: false,
                message: "جدول درج اطلاعات، در دیتابیس وجود ندارد! آیا میخواهید آن را ایجاد کنید ؟",
              });
            } else if (req.body.Create_Table === true && req.body.Warning_Create_Table === null) {
              res.status(200).json({
                success: true,
                message: `پیشنهاد می کنیم این کار را با هناهنگی پشتیبان سایتتون انجام بدید ممکن است با وجود اطلاعات، آن را از بین ببرید! در هر صورت انجام شود .`,
              });
            } else if (req.body.Create_Table === true && req.body.Warning_Create_Table === true) {
              try {
                await News.sync({ force: true });
                res.status(200).json({
                  success: true,
                  message: "جدول با موفقیت ایجاد شد!",
                });
              } catch (error) {
                res.status(500).json({
                  success: false,
                  message: "عملیات ساخت ناموفق بود! لطفاً با پشتیبانی تماس بگیرید.",
                });
              }
            } else if (req.body.Warning_Create_Table === false) {
              res.status(500).json({
                success: false,
                message: "عملیات ساخت لغو شد!",
              });
            } else if (req.body.Create_Table === false) {
              res.status(500).json({
                success: false,
                message: "عملیات ساخت، بعلت احتیاط در حفظ اطلاعات لغو شد",
              });
            } else {
              res.status(500).json({
                success: false,
                message: "گزینه معتبری را انتخاب کنید",
              });
            }
          }
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "بررسی جدول دیتابیس ناموفق بود، لطفاً دوباره تلاش کنید!",
        });
      }
    } catch (error) {
      res.status(503).json({
        success: false,
        message: "اتصال به دیتابیس با خطا موجه شد، لطفاً با پشتبان سایت تماس بگیرید!",
      });
    }
  };

  // GET ALL NEWS
  static GetAllNews = async (req, res) => {
    try {
      const GetAllResult = await News.findAll();
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
    } catch (e) {
      res.status(500).json({
        success: true,
        body: null,
        message: "درخواست برای دریافت اخبار ناموفق بود!",
      });
    }
  };

  // GET ONE NEWS
  static GteNews = async (req, res) => {
    if (req.body.id !== undefined && typeof req.body.id === "number") {
      try {
        const GetOneResult = await News.findByPk(req.body.id);
        if (GetOneResult) {
          res.status(200).json({
            success: true,
            body: GetOneResult,
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
    } else {
      res.status(404).json({
        success: false,
        body: null,
        message: "لطفاً یک مقدار معتبر برای آیدی وارد کنید!",
      });
    }
  };

  // UPDATE ONE NEWS
  static UpdNews = async (req, res) => {
    // check that database is connect
    try {
      await db.authenticate();
      // check that exists table
      try {
        db.queryInterface.tableExists("News").then(async (e) => {
          if (e) {
            if (req.body.id !== undefined && typeof req.body.id === "number") {
              //check by TRY CATCH that model is exist or is fit or not is

              try {
                const GetOneNewsForUpd = await News.findByPk(req.body.id);

                //check that exist news by this id or not it is
                if (GetOneNewsForUpd) {
                  //check that exist news other by this content or not it is
                  const NewsExistCheck = await News.findOne({
                    where: {
                      [Op.or]: [
                        { title: req.body.Title },
                        { Short_Description: req.body.Short_Description },
                        { content: req.body.Editor },
                      ],
                    },
                  });

                  // check that exist news by this content or not is and if is exist it is id matched by this id or not is
                  if (NewsExistCheck === null || NewsExistCheck.id === req.body.id) {
                    const NewsIsSame = await News.findOne({
                      where: {
                        title: req.body.Title,
                        Short_Description: req.body.Short_Description,
                        content: req.body.Editor,
                        category: req.body.Category,
                      },
                    });
                    // checked news content matched by this current content or not is
                    if (NewsIsSame === null) {
                      try {
                        await News.update(
                          {
                            title: req.body.Title,
                            Short_Description: req.body.Short_Description,
                            content: req.body.Editor,
                            category: req.body.Category,
                          },
                          { where: { id: req.body.id } }
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
            } else {
              res.status(500).json({
                success: false,
                message: "لطفاً یک مقدار معتبر برای آیدی وارد کنید!",
              });
            }
          } else {
            if (req.body.Create_Table === null) {
              res.status(500).json({
                success: false,
                message: "جدول درج اطلاعات، در دیتابیس وجود ندارد! آیا میخواهید آن را ایجاد کنید ؟",
              });
            } else if (req.body.Create_Table === true && req.body.Warning_Create_Table === null) {
              res.status(200).json({
                success: true,
                message: `پیشنهاد می کنیم این کار را با هناهنگی پشتیبان سایتتون انجام بدید ممکن است با وجود اطلاعات، آن را از بین ببرید! در هر صورت انجام شود .`,
              });
            } else if (req.body.Create_Table === true && req.body.Warning_Create_Table === true) {
              try {
                await News.sync({ force: true });
                res.status(200).json({
                  success: true,
                  message: "جدول با موفقیت ایجاد شد!",
                });
              } catch (error) {
                res.status(500).json({
                  success: false,
                  message: "عملیات ساخت ناموفق بود! لطفاً با پشتیبانی تماس بگیرید.",
                });
              }
            } else if (req.body.Warning_Create_Table === false) {
              res.status(500).json({
                success: false,
                message: "عملیات ساخت لغو شد!",
              });
            } else if (req.body.Create_Table === false) {
              res.status(500).json({
                success: false,
                message: "عملیات ساخت، بعلت احتیاط در حفظ اطلاعات لغو شد",
              });
            } else {
              res.status(500).json({
                success: false,
                message: "گزینه معتبری را انتخاب کنید",
              });
            }
          }
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "بررسی جدول دیتابیس ناموفق بود، لطفاً دوباره تلاش کنید!",
        });
      }
    } catch (error) {
      res.status(503).json({
        success: false,
        message: "اتصال به دیتابیس با خطا موجه شد، لطفاً با پشتبان سایت تماس بگیرید!",
      });
    }
  };

  // DELETE ONE NEWS
  static DeleNews = async (req, res) => {
    if (req.body.id !== undefined && typeof req.body.id === "number") {
      try {
        const GetOneResult = await News.findByPk(req.body.id);
        if (GetOneResult) {
          await News.destroy({ where: { id: req.body.id } });
          res.status(200).json({
            success: true,
            body: null,
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
    } else {
      res.status(404).json({
        success: false,
        body: null,
        message: "لطفاً یک مقدار معتبر برای آیدی وارد کنید!",
      });
    }
  };
}
