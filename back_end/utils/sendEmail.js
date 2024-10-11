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
	} catch (error) {
		console.log(`error in line 22 of file '/back_end/utils/sendEmail': ${error}`);
		res.status(412).json({
			success: false,
			message: error.message,
		});
	}
};
