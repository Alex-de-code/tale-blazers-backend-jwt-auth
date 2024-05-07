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
