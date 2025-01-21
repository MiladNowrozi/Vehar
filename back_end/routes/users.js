import express from "express";
import UserControllers from "../controllers/CtrlUsers.js";

const router = express.Router();

router.get("/get", UserControllers.GteUser);
router.get("/get-comments", UserControllers.GteComment);
router.get("/get-likes", UserControllers.GteLikes);
router.get("/get-all", UserControllers.GetAllUser);
router.get("/history", UserControllers.History);
router.put("/dismissal", UserControllers.DismissalUser);
router.post("/edit", UserControllers.Edit);
router.delete("/delete", UserControllers.DeleteUser);

export default router;
