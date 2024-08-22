import "./routes/admin.js";
import express from "express";
import authRouter from "./routes/auth.js";
import adminRouter from "./routes/admin.js";
import newsRouter from "./routes/news.js";
import usersRouter from "./routes/users.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());
//  middlewares
app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/news", newsRouter);
app.use("/user", usersRouter);
app.use("*", (req, res) => {
  res.status(404).send("چنین مسیری یافت نشد!");
});
app.listen(5000, () => {
  console.clear();
  console.log("connected to backend!");
});
