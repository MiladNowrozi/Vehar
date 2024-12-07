import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import fs from "fs";
//
import authRouter from "./routes/auth.js";
import lordRouter from "./routes/lord.js";
import authorRouter from "./routes/author.js";
import usersRouter from "./routes/users.js";
import newsRouter from "./routes/news.js";
import path from "path";
import { fileURLToPath } from "url";
import db from "./db.js";
import { AuthToken } from "./controllers/CtrlAuth.js";
//
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
//
const __dirname = path.join(path.dirname(fileURLToPath(import.meta.url)));
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, __dirname + "/uploads/img");
	},
	filename: function (req, file, cb) {
		cb(null, "vehar.ir" + file.originalname);
	},
});
const upload = multer({ storage });
app.get("/get-images?", (req, res) => {
	const imagePath = __dirname + "/uploads/img/" + req.query.name;
	fs.readFile(imagePath, (err, data) => {
		if (err) {
			res.writeHead(404, { "Content-Type": "text/plain" });
			res.end("Image not found");
			return;
		}
		res.writeHead(200, { "Content-Type": "image/jpeg" });
		res.end(data);
	});
});

app.post("/upload", upload.single("file"), async (req, res) => {
	res.status(200).json({ location: `http://localhost:5000/get-images?name=${req.file.filename}` });
});
// await db.sync({ alter: true });
// middlewares
app.use("/auth", authRouter);
app.use("/lord", AuthToken, lordRouter);
app.use("/author", AuthToken, authorRouter);
app.use("/user", AuthToken, usersRouter);
app.use("/news", AuthToken, newsRouter);
app.use("*", (req, res) => {
	res.status(404).send("چنین مسیری یافت نشد!");
});

// app.get("/get-img", (req, res) => {
// 	const imagePath = __dirname + req.query.name;
// 	// Check if the file exists
// 	fs.stat(imagePath, (err, stats) => {
// 		if (err) {
// 			return res.status(404).send("Image not found");
// 		}
// 		// Set the appropriate content type and send the image
// 		res.writeHead(200, { "Content-Type": "image/jpeg" });
// 		const readStream = fs.createReadStream(imagePath);
// 		readStream.pipe(res);
// 	});
// });

app.listen(5000, () => {
	console.log("connected to backend!");
});
