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
app.use(cors({ origin: ["http://localhost:3000", "http://locklhost:5000", "http://87.107.105.139", "http://192.168.0.2:3000"], credentials: true }));
// const __dirname = path.join(path.dirname(fileURLToPath(import.meta.url)));

// await db.sync({ alter: true });

// res.status(200).json({ location: `http://localhost:5000/get-images?name=${req.file.filename}` });
// middlewares
app.use("/auth", authRouter);
app.use("/upload", AuthToken, uploadRouter);
app.use("/download", downloadRouter);
app.use("/admin", AuthToken, adminRouter);
app.use("/user", AuthToken, usersRouter);
app.use("/news", newsRouter);
app.use("*", (req, res) => {
	res.status(404).send("چنین مسیری یافت نشد!");
});

app.listen(5000, () => {
	console.log("connected to backend !");
});
