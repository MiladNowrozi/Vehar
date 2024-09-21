import { Op } from "@sequelize/core";
import { News } from "../models/News.js";

export default class NewsControllers {
  // CREATE ONE NEWS
  static CreateNews = async (req, res) => {
    try {
      const NewsExist = await News.findOne({
        where: {
          [Op.or]: [
            { title: req.body.Title },
            { Short_Description: req.body.Short_Description },
            { content: req.body.Editor },
          ],
        },
      });

      if (NewsExist === null) {
        try {
          await News.create({
            title: req.body.Title,
            Short_Description: req.body.Short_Description,
            content: req.body.Editor,
            category: req.body.Category,
            images: req.body.Images,
            userId: req.body.UserId,
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
            [Op.or]: [
              { title: req.params.Title },
              { Short_Description: req.params.Short_Description },
              { content: req.params.Editor },
            ],
          },
        });

        // check that exist news by this content or not is and if is exist it is id matched by this id or not is
        if (NewsExistCheck === null || NewsExistCheck.id === req.params.id) {
          const NewsIsSame = await News.findOne({
            where: {
              title: req.params.Title,
              Short_Description: req.params.Short_Description,
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
                  Short_Description: req.params.Short_Description,
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
