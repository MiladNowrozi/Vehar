import express from "express";
import UserControllers from "../controllers/CtrlUsers.js";

const router = express.Router();

router.get("/get/:id", UserControllers.GteUser);
// router.get("/get-all-user", UserControllers.GetAllUser);
// router.put("/upd/user/:id", UserControllers.UpdUser);
// router.delete("/delete/user/:id", UserControllers.DeleUser);

export default router;
