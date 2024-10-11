import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import fs from "fs";
//

import authRouter from "./routes/auth.js";
import authorRouter from "./routes/author.js";
import newsRouter from "./routes/news.js";
import usersRouter from "./routes/users.js";

//
const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

//

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "../back_end/uploads");
	},
	filename: function (req, file, cb) {
		cb(null, "vehar.ir" + file.originalname);
	},
});
const upload = multer({ storage });

app.get("/get-image-by-editor?", (req, res) => {
	const imagePath = "../back_end/uploads/" + req.query.name;
	// Check if the file exists
	fs.stat(imagePath, (err, stats) => {
		if (err) {
			return res.status(404).send("Image not found");
		}
		// Set the appropriate content type and send the image
		res.writeHead(200, { "Content-Type": "image/jpeg" });
		const readStream = fs.createReadStream(imagePath);
		readStream.pipe(res);
	});
});

app.post("/upload", upload.single("file"), async (req, res) => {
	res.status(200).json({ location: `http://localhost:5000/get-image-by-editor?name=${req.file.filename}` });
});

//  middlewares
app.use("/auth", authRouter);
app.use("/author", authorRouter);
app.use("/news", newsRouter);
app.use("/user", usersRouter);
app.use("*", (req, res) => {
	res.status(404).send("چنین مسیری یافت نشد!");
});

app.get("/get-img", (req, res) => {
	const imagePath = "../back_end/uploads/" + req.query.name;
	// Check if the file exists
	fs.stat(imagePath, (err, stats) => {
		if (err) {
			return res.status(404).send("Image not found");
		}
		// Set the appropriate content type and send the image
		res.writeHead(200, { "Content-Type": "image/jpeg" });
		const readStream = fs.createReadStream(imagePath);
		readStream.pipe(res);
	});
});

app.listen(5000, () => {
	console.log("connected to backend!");
});
