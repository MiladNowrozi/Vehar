import express from "express";
import NewsControllers from "../controllers/CtrlNews.js";

const router = express.Router();
router.post("/create", NewsControllers.CreateNews);
router.get("/get", NewsControllers.GteNews);
router.get("/get-all", NewsControllers.GetAllNews);
router.put("/upd", NewsControllers.UpdNews);
router.delete("/dele", NewsControllers.DeleNews);
router.use("*", (req, res) => {
  res.status(404).send("چنین مسیری یافت نشد!");
});

export default router;
