import nodemailer from "nodemailer";

export const sendEmail = async (email, subject, text, html) => {

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: process.env.PORT,
      secure: process.env.SECURE,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });
    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
      html: html,
    });
    console.log("ایمیل با موفقیت ارسال شد!");
  } catch (error) {
    console.log("ایمیل ارسال نشد !");
    console.log(error);
  }
};
