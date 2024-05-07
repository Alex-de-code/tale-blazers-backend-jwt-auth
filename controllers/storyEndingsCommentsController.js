const express = require("express");
const story_endings_comments = express.Router();

// import queries
const {
  getAllCommentsByStoryEndingId,
  getSingleCommentByID,
  createStoryEndingComment,
  deleteStoryEndingCommentByID,
  updateStoryEndingCommentByID,
} = require("../queries/story_endings_comments.js");

// import validatons
const {
  validateStoryEndingCommentBody,
  validateStoryEndingCommentTag,
  validateUserId,
} = require("../validations/checkStoryEndingsComments.js");

// all comments for a specific story ending
story_endings_comments.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const allCommentsForASpecificStoryEnding =
      await getAllCommentsByStoryEndingId(id);
    if (allCommentsForASpecificStoryEnding.length > 0) {
      res.status(200).json(allCommentsForASpecificStoryEnding);
    } else {
      res
        .status(404)
        .json({ error: "No comments found for this story ending ID" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = story_endings_comments;
