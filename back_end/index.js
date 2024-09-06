import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import "./routes/admin.js";
import authRouter from "./routes/auth.js";
import adminRouter from "./routes/admin.js";
import newsRouter from "./routes/news.js";
import usersRouter from "./routes/users.js";


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
//  middlewares
app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/news", newsRouter);
app.use("/user", usersRouter);
app.use("*", (req, res) => {
  res.status(404).send("چنین مسیری یافت نشد!");
});
app.listen(5000, () => {
  console.log("connected to backend!");
});
