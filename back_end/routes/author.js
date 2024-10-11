import express from "express";
import AuthorControllers from "../controllers/CtrlAuthor.js";

const router = express.Router();

// CREATE
router.post("/create-author", AuthorControllers.CreateAuthor);

// GET Author
router.post("/author:id", AuthorControllers.GetAuthor);

// GET ALL Author
router.get("/get-all-author", AuthorControllers.GetAllAuthor);

// CANCEL Author
router.post("/cancel-author:id", AuthorControllers.CancelAuthor);

// UPDATE Author
router.put("/update-author", AuthorControllers.UpdateAuthor);

// DELETE Author
router.delete("/delete-author:id", AuthorControllers.DeleteAuthor);

export default router;
