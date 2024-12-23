import express from "express";
import NewsControllers from "../controllers/CtrlNews.js";
import SubCategoryControllers from "../controllers/CtrlSubCategory.js";
import { AuthToken } from "../controllers/CtrlAuth.js";

const router = express.Router();

// ROUTS NEWS
router.post("/create", AuthToken, NewsControllers.CreateNews);
router.get("/get", NewsControllers.GteNews);
router.get("/search-admin", AuthToken, NewsControllers.SearchAdmin);
router.get("/search-user", NewsControllers.SearchUser);
router.get("/get-all", NewsControllers.GetAllNews);
router.put("/edit", AuthToken, NewsControllers.UpdNews);
router.delete("/delete", AuthToken, NewsControllers.DeleNews);
// Route to like a post
router.post("/like", AuthToken, NewsControllers.NewsLike);
// Route to get most visited posts
router.get("/most-visited", NewsControllers.MostVisited);
// SLIDER NEWS
router.get("/sliders", NewsControllers.MainPagSliderAndChoice);
// CREATE COMMENT
router.get("/comment", AuthToken, NewsControllers.Comment);
// CREATE COMMENT
router.put("/comments-edit", AuthToken, NewsControllers.CommentsEdit);
// CREATE COMMENT
router.delete("/comments-delete", AuthToken, NewsControllers.CommentsDelete);
// CREATE RESPONSES
router.post("/responses", AuthToken, NewsControllers.Responses);
// CHOSEN STATUS COMMENT
router.get("/status-comment", AuthToken, NewsControllers.GetStatusComment);
// CHOSEN STATUS COMMENT
router.post("/verification-comment", AuthToken, NewsControllers.VerificationComment);
// CHOSEN CHOSEN
router.get("/last-news", NewsControllers.LastNews);
// CHOSEN CHOSEN
router.get("/news-tickers", NewsControllers.NewsTickers);
// ROUTS SUBCATEGORY
router.post("/create-subcategory", AuthToken, SubCategoryControllers.CreateSubCategory);
// router.get("/get-sub-category/:id", SubCategoryControllers.GteNews);
router.get("/subcategory/get-all", SubCategoryControllers.GetAllSubCategory);
// router.put("/upd-subcategory/:id", SubCategoryControllers.UpdNews);
router.delete("/dele-subcategory", AuthToken, SubCategoryControllers.DeleteSubCategory);

export default router;
