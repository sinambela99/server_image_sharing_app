const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/comment.controller")


router.get("/", CommentController.getAllComment);

router.post("/", CommentController.createComment);
router.get("/:id", CommentController.getCommentById);
router.put("/:id", CommentController.updateCommentById);
router.delete("/:id", CommentController.deleteCommentById);

module.exports = router;