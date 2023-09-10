const { Comment } = require("../models");

class CommentController {

    static async getAllComment(req, res, next) {
        try {
          const result = await Comment.findAll({ order: [["id", "ASC"]] });
          res.status(200).json({ data: result });
        } catch (err) {
          next(err);
        }
      }

  // READ: Get a comment by ID
  static async getCommentById(req, res, next) {
    try {
      const { id } = req.params;
      const comment = await Comment.findByPk(id);

      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      res.status(200).json({ data: comment });
    } catch (error) {
      next(error);
    }
  }

  // CREATE: Create a new comment
  static async createComment(req, res, next) {
    try {
      const { text } = req.body;
      console.log(req.body)
      const newComment = await Comment.create({
        text,
      });
      
      res.status(201).json({ message: 'Comment created successfully', data: newComment });
    } catch (error) {
      next(error);
    }
  }

  // UPDATE: Update a comment by ID
  static async updateCommentById(req, res, next) {
    try {
      const { id } = req.params;
      const { text } = req.body;
      const comment = await Comment.findByPk(id);

      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      // Update comment text
      comment.text = text;

      await comment.save();

      res.status(200).json({ message: 'Comment updated successfully', data: comment });
    } catch (error) {
      next(error);
    }
  }

  // DELETE: Delete a comment by ID
  static async deleteCommentById(req, res, next) {
    try {
      const { id } = req.params;
      const comment = await Comment.findByPk(id);

      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      // Hapus entri comment dari database
      await comment.destroy();

      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CommentController;
