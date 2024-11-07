import express from "express";
import UserControllers from "../controllers/CtrlUsers.js";

const router = express.Router();

router.get("/get:id&:role", UserControllers.GteUser);
router.get("/get-all", UserControllers.GetAllUser);
router.put("/put:id", UserControllers.CancelUser);
router.delete("/delete:id", UserControllers.DeleteUser);

export default router;
