const express = require("express");
const story_endings_comments_reactions = express.Router();

// import queries
const {
  addReactionToStoryEndingComment,
  countReactionsForComment,
  removeReactionFromComment,
} = require("../queries/story_endings_comments_reactions.js");

// import validatons
const {
  checkUserReactionToComment,
} = require("../validations/checkStoryEndingsCommentsReactions.js");

// ADD CONTROLLER FUNCTIONALITY BELOW HERE -->

// Route to get the reaction count for a specific comment
story_endings_comments_reactions.get(
  "/commentId/reactions",
  async (req, res) => {
    const { commentId } = req.params;
    const { reaction_type } = req.query;
    try {
      const count = await countReactionsForComment(commentId, reaction_type);
      res.status(200).json({ count });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  }
);

// post a reaction to story ending
story_endings_comments_reactions.post(
  "/:commentId/reactions",
  checkUserReactionToComment,

  async (rew, res) => {
    try {
      const newStoryEndingReaction = await addReactionToStoryEndingComment(
        rew.body
      );
      res.status(201).json(newStoryEndingReaction);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

story_endings_comments_reactions.delete(
  "/:commentId/reactions/:reactionId",
  async (req, res) => {
    const { commentId, reactionId } = req.params;
    try {
      const deletedStoryEndingCommentReaction = await removeReactionFromComment(
        reactionId,
        commentId
      );
      if (deletedStoryEndingCommentReaction) {
        res.status(200).json(deletedStoryEndingCommentReaction);
      } else {
        res.status(404).json({
          error: "Story ending comment reaction not found with this ID",
        });
      }
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  }
);

module.exports = story_endings_comments_reactions;
