import express from "express";
import NewsControllers from "../controllers/CtrlNews.js";
import SubCategoryControllers from "../controllers/CtrlSubCategory.js";

const router = express.Router();

// ROUTS NEWS
router.post("/create", NewsControllers.CreateNews);
router.get("/get", NewsControllers.GteNews);
router.get("/search-news", NewsControllers.SearchNewsByIdOrTitle);
router.get("/get-all", NewsControllers.GetAllNews);
router.put("/upd", NewsControllers.UpdNews);
router.delete("/delete", NewsControllers.DeleNews);
// Route to like a post
router.post("/like", NewsControllers.NewsLike);
// Route to get most visited posts
router.get("/most-visited", NewsControllers.MostVisited);
// SLIDER NEWS
router.get("/sliders", NewsControllers.MainPagSliderAndChoice);
// CREATE COMMENT
router.get("/comment", NewsControllers.Comment);
// CREATE RESPONSES
router.post("/responses", NewsControllers.Responses);
// CREATE RES TO RESPONSES
router.post("/res-to-responses", NewsControllers.ResToResponses);
// CREATE RES TO RES
router.post("/res-to-res", NewsControllers.ResToRes);
// CHOSEN STATUS COMMENT
router.get("/status-comment", NewsControllers.GetStatusComment);
// CHOSEN STATUS COMMENT
router.post("/verification-comment", NewsControllers.VerificationComment);
// CHOSEN CHOSEN
router.get("/last-news", NewsControllers.LastNews);
// ROUTS SUBCATEGORY
router.post("/create-subcategory", SubCategoryControllers.CreateSubCategory);
// router.get("/get-sub-category/:id", SubCategoryControllers.GteNews);
router.get("/subcategory/get-all", SubCategoryControllers.GetAllSubCategory);
// router.put("/upd-subcategory/:id", SubCategoryControllers.UpdNews);
router.delete("/dele-subcategory", SubCategoryControllers.DeleteSubCategory);

export default router;
