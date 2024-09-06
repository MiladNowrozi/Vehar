import { Email, User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";
import { Token } from "../models/Token.js";
import db from "../db.js";

await db.sync({ alter: true });

console.clear();

export const RegisterToken = async (req, res) => {
  try {
    const TokenExist = await Token.findOne({ where: { Token: req.query.verify_token } });
    const HeckVerifyUser = await User.findByPk(req.query.Id);
    if (TokenExist !== null && !HeckVerifyUser.verify_email) {
      await Token.destroy({ where: { Token: req.query.verify_token }, force: true });
      await User.update(
        { verify_email: true },
        {
          where: { id: HeckVerifyUser.id },
        }
      );
      res.send("ایمیل شما با موفقیت تایید شد، لطفاً به صفحه ورود مراجعه کنید!");
    } else {
      res.send("لینک نامعتبر است!");
    }
  } catch (error) {
    res.send("لینک نامعتبر است!");
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
        where: { username: username_register },
      });
      const getEmail = await Email.findOne({ where: { email: email_register } });
      const countRequestUser = await Token.findAll({ where: { Email: email_register } });

      if (countRequestUser.length === 0) {
        if (UserExist === null && getEmail === null) {
          try {
            const token = jwt.sign({ email: email_register }, "secret");
            await Token.create({ Token: token, Email: email_register });
            const ResetToken = await Token.findOne({ where: { Token: token } });
            const salt = bcrypt.genSaltSync(10);
            const HashPassword = bcrypt.hashSync(password_register, salt);

            // Hash the password and create a user
            const CreatedUser = await User.create({
              firstName: firstName_register,
              lastName: lastName_register,
              username: username_register,
              password: HashPassword,
            });
            await Email.create({ email: email_register, userId: CreatedUser.id });
            const url = `${process.env.BASE_URL}/auth/register/?verify_token=${token}&Id=${CreatedUser.id}`;
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
            }, 1000 * 60 * 5);
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
          if (UserExist !== null && !UserExist.verify_email) {
            const countRequestUser = await Token.findAll({ where: { Email: email_register } });
            if (countRequestUser.length === 0) {
              const token = jwt.sign({ email: email_register }, "secret");
              await Token.create({ Token: token, Email: email_register });
              const ResetToken = await Token.findOne({ where: { Token: token } });
              const url = `${process.env.BASE_URL}/auth/register/?verify_token=${token}&Id=${UserExist.id}`;

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
              }, 1000 * 60 * 5);
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
    await Token.sync({ alter: true });
    const username_login = req.body.username_login.replace(/\s+/g, "");
    const password_login = req.body.password_login.replace(/\s+/g, "");
    try {
      const ExistUser = await User.findOne({
        where: { username: username_login },
      });
      const GetUserByPk = await User.findByPk(ExistUser.id);
      const CheckUserFullInfo = await User.findOne({
        where: {
          id: GetUserByPk.id,
          username: username_login,
        },
      });
      // CHECK USER FULL INFO
      if (CheckUserFullInfo) {
        const isPasswordCurrent = bcrypt.compareSync(password_login, CheckUserFullInfo.password);
        if (isPasswordCurrent) {
          if (!CheckUserFullInfo.verify_email) {
            try {
              const getUser = await User.findOne({
                where: { username: CheckUserFullInfo.username },
              });
              const getEmail = await Email.findOne({ where: { userId: getUser.id } });
              const countRequestUser = await Token.findAll({ where: { Email: getEmail.email } });

              if (countRequestUser.length === 0) {
                const TokenEmail = jwt.sign({ email: getEmail.email }, "secret");
                const url = `${process.env.BASE_URL}/auth/register/?verify_token=${TokenEmail}&Id=${getUser.id}`;
                const ExistToken = await Token.create({ Token: TokenEmail, Email: getEmail.email });
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
            const token = jwt.sign({ id: CheckUserFullInfo.id }, "secret");
            const { password, ...other } = CheckUserFullInfo;
            res
              .cookie("access_token", token, {
                httpOnly: true,
              })
              .status(200)
              .json({ other, success: true });
          }
        } else {
          res.status(404).json({
            success: false,
            message: "رمز عبور اشتباه است!",
          });
        }
      } else {
        res.status(404).json({
          success: false,
          message: "این کاربر موجود نیست، لطفاً ابتدا ثبت نام کنید!",
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
  res.send("<h1>page logout</h1>");
};
