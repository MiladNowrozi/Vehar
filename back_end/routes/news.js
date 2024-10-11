import express from "express";
import CategoryControllers from "../controllers/CtrlCategory.js";
import NewsControllers from "../controllers/CtrlNews.js";
import SubCategoryControllers from "../controllers/CtrlSubCategory.js";

const router = express.Router();

// ROUTS NEWS

router.post("/create", NewsControllers.CreateNews);
router.get("/get/:id", NewsControllers.GteNews);
router.get("/get-all", NewsControllers.GetAllNews);
router.put("/upd/:id", NewsControllers.UpdNews);
router.delete("/delete/:id", NewsControllers.DeleNews);

// ROUTS CATEGORY

router.post("/category/create/:CategoryName", CategoryControllers.CreateCategory);
// router.get("/category/:id", CategoryControllers.GteNews);
router.get("/category/get-all", CategoryControllers.GetallCategory);
// router.put("/category-upd/:id", CategoryControllers.UpdNews);
// router.delete("/category-delete/:id", CategoryControllers.DeleNews);

// ROUTS SUBCATEGORY

router.post("/create-subcategory/:ParentCategory/:subcategory", SubCategoryControllers.CreateSubCategory);
// router.get("/get-sub-category/:id", SubCategoryControllers.GteNews);
router.get("/subcategory/get-all", SubCategoryControllers.GetAllSubCategory);
// router.put("/upd-subcategory/:id", SubCategoryControllers.UpdNews);
// router.delete("/dele-subcategory/:id", SubCategoryControllers.DeleNews);
// router.delete("/dele-all-subcategory", SubCategoryControllers.DeleNews);

export default router;
