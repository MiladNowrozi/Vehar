import express from "express";
import NewsControllers from "../controllers/CtrlNews.js";

const router = express.Router();
router.post("/create", NewsControllers.CreateNews);
router.get("/get/:id", NewsControllers.GteNews);
router.get("/get-all", NewsControllers.GetAllNews);
router.put("/upd/:id", NewsControllers.UpdNews);
router.delete("/delete/:id", NewsControllers.DeleNews);

export default router;
