const express = require("express");
const story_endings_comments_reactions = express.Router();

// import queries
const {
  addReactionToStoryEndingComment,
  countReactionsForComment,
  removeReactionFromComment,
} = require("../queries/story_endings_comments_reactions.js");

const {
  getSingleCommentByID,
} = require("../queries/story_endings_comments.js");

// import validatons
const {
  checkUserReactionToComment,
} = require("../validations/checkStoryEndingsCommentsReactions.js");

// ADD CONTROLLER FUNCTIONALITY BELOW HERE -->

// Route to get the reaction count for a specific comment
// story_endings_comments_reactions.get(
//   "/:story_endings_comments_id/reactions",
//   async (req, res) => {
//     const { story_endings_comments_id } = req.params;
//     const { reaction_type } = req.query;
//     try {
//       const commentExists = await getSingleCommentByID(
//         story_endings_comments_id
//       );
//       if (!commentExists) {
//         return res
//           .status(404)
//           .json({ error: "There is no existing comment with this ID" });
//       }

//       const count = await countReactionsForComment(
//         story_endings_comments_id,
//         reaction_type
//       );
//       res.status(200).json({ count });
//     } catch (error) {
//       res.status(500).json({ error: "Server error" });
//     }
//   }
// );

// Route to get the reaction count for a specific comment
story_endings_comments_reactions.get(
  "/:story_endings_comments_id/reactions",
  async (req, res) => {
    const { story_endings_comments_id } = req.params;
    try {
      const commentExists = await getSingleCommentByID(
        story_endings_comments_id
      );
      if (!commentExists) {
        return res
          .status(404)
          .json({ error: "There is no existing comment with this ID" });
      }
      const counts = await countReactionsForComment(story_endings_comments_id);
      res.status(200).json(counts);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  }
);

// post a reaction to story ending
story_endings_comments_reactions.post(
  "/:story_endings_comments_id/reactions",
  checkUserReactionToComment,

  async (req, res) => {
    try {
      const newStoryEndingReaction = await addReactionToStoryEndingComment(
        req.body
      );
      res.status(201).json(newStoryEndingReaction);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

story_endings_comments_reactions.delete(
  "/:story_endings_comments_id/reactions/:id",
  checkUserReactionToComment,

  async (req, res) => {
    const { story_endings_comments_id, id } = req.params;
    try {
      const deletedStoryEndingCommentReaction = await removeReactionFromComment(
        id,
        story_endings_comments_id
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
