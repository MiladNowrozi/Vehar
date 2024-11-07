import express from "express";
import AuthorControllers from "../controllers/CtrlAuthor.js";

const router = express.Router();

// CREATE
router.post("/create", AuthorControllers.CreateAuthor);

// GET Author
router.get("/get:id&:role", AuthorControllers.GetAuthor);

// GET ALL Author
router.get("/get-all", AuthorControllers.GetAllAuthor);

// CANCEL Author
router.post("/cancel:id", AuthorControllers.CancelAuthor);

// UPDATE Author
router.put("/update", AuthorControllers.UpdateAuthor);

// DELETE Author
router.delete("/delete:id", AuthorControllers.DeleteAuthor);

export default router;
