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

// single comment based on id
story_endings_comments.get("/single/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const singleComment = await getSingleCommentByID(id);
    if (singleComment && singleComment !== null) {
      res.status(200).json(singleComment);
    } else {
      res.status(404).json({ error: "No comment found for this ID" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// create a comment for story ending
// remember to add validate user when putting this branch into production!!!
// valudateUserId
story_endings_comments.post(
  "/",
  validateUserId,
  validateStoryEndingCommentBody,
  validateStoryEndingCommentTag,

  async (req, res) => {
    try {
      const newStoryEndingComment = await createStoryEndingComment(req.body);
      res.status(201).json(newStoryEndingComment);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

story_endings_comments.delete("/single/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedStoryEndingComment = await deleteStoryEndingCommentByID(id);
    if (deletedStoryEndingComment) {
      res.status(200).json(deletedStoryEndingComment);
    } else {
      res
        .status(404)
        .json({ error: "Story ending comment not found with this ID" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// update story ending comment

// remember to add validate user when putting this branch into production!!!
// valudateUserId
story_endings_comments.put(
  "/single/:id",
  validateUserId,
  validateStoryEndingCommentBody,
  validateStoryEndingCommentTag,
  async (req, res) => {
    const { id } = req.params;
    //extract commend details from request body
    const comment = req.body;
    try {
      const updatedStoryEndingComment = await updateStoryEndingCommentByID(
        id,
        comment
      );
      res.status(200).json(updatedStoryEndingComment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = story_endings_comments;
