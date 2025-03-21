import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
//
import authRouter from "./routes/auth.js";
import uploadRouter from "./routes/upload.js";
import downloadRouter from "./routes/download.js";
import adminRouter from "./routes/Admins.js";
import usersRouter from "./routes/users.js";
import newsRouter from "./routes/news.js";
import db from "./db.js";
import { AuthToken } from "./controllers/CtrlAuth.js";
//
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(cors({ origin: process.env.URLS.split(","), credentials: true }));
// const __dirname = path.join(path.dirname(fileURLToPath(import.meta.url)));
console.log(process.env.URLS.split(","));

// await db.sync({ alter: true });

// res.status(200).json({ location: `http://localhost:5000/get-images?name=${req.file.filename}` });
// middlewares
app.use("/api/auth", authRouter);
app.use("/api/upload", AuthToken, uploadRouter);
app.use("/api/download", downloadRouter);
app.use("/api/admin", AuthToken, adminRouter);
app.use("/api/user", AuthToken, usersRouter);
app.use("/api/news", newsRouter);
app.use("*", (req, res) => {
	res.status(404).send("چنین مسیری یافت نشد!");
});

app.listen(5000, () => {
	console.log("connected to backend !");
});
