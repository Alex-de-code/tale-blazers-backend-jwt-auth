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
  "/:story_endings_comments_id",
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

// post a reaction to story ending comment
story_endings_comments_reactions.post(
  "/:story_endings_comments_id",
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

// Unified endpoint for adding, updating, or deleting reactions
// story_endings_comments_reactions.post(
//   "/:story_endings_comments_id",
//   checkUserReactionToComment,
//   async (req, res) => {
//     const { story_endings_comments_id } = req.params;
//     const { user_id, reaction_type } = req.body;

//     try {
//       // Check if the user already has a reaction to this comment
//       const existingReaction = await findUserReaction(
//         user_id,
//         story_endings_comments_id
//       );

//       if (existingReaction) {
//         // User has reacted before
//         if (existingReaction.reaction_type === reaction_type) {
//           // Remove reaction if it's the same
//           await removeReactionFromComment(
//             existingReaction.id,
//             story_endings_comments_id
//           );
//           return res.status(200).json({ message: "Reaction removed." });
//         } else {
//           // Update reaction if it's different
//           await addReactionToStoryEndingComment({
//             user_id,
//             story_endings_comments_id,
//             reaction_type,
//           });
//           return res.status(200).json({ message: "Reaction updated." });
//         }
//       } else {
//         // User is reacting for the first time
//         const newReaction = await addReactionToStoryEndingComment({
//           user_id,
//           story_endings_comments_id,
//           reaction_type,
//         });
//         return res.status(201).json(newReaction);
//       }
//     } catch (error) {
//       res.status(500).json({ error: "Internal server error" });
//     }
//   }
// );

// story_endings_comments_reactions.delete(
//   "/:story_endings_comments_id/delete/:id", // this is user ID
//   checkUserReactionToComment,

//   async (req, res) => {
//     const { story_endings_comments_id, id } = req.params;
//     try {
//       const deletedStoryEndingCommentReaction = await removeReactionFromComment(
//         id,
//         story_endings_comments_id
//       );
//       if (deletedStoryEndingCommentReaction) {
//         res.status(200).json(deletedStoryEndingCommentReaction);
//       } else {
//         res.status(404).json({
//           error: "Story ending comment reaction not found with this ID",
//         });
//       }
//     } catch (error) {
//       res.status(500).json({ error: "Server error" });
//     }
//   }
// );

// Route to delete a user's reaction to a specific comment
story_endings_comments_reactions.delete(
  "/:story_endings_comments_id/delete/:user_id", // this is user ID
  checkUserReactionToComment,
  async (req, res) => {
    const { story_endings_comments_id, user_id } = req.params;
    try {
      const deletedReaction = await removeReactionFromComment(
        user_id,
        story_endings_comments_id
      );
      if (deletedReaction) {
        return res.status(200).json({ message: "Reaction deleted." });
      } else {
        return res.status(404).json({
          error: "No reaction found for this user on the specified comment.",
        });
      }
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  }
);

module.exports = story_endings_comments_reactions;
