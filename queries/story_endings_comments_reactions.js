const db = require("../db/dbConfig");

const addReactionToStoryEndingComment = async (reaction) => {
  const { user_id, story_endings_comments_id, reaction_type } = reaction;
  try {
    const newReaction = await db.one(
      "INSERT INTO story_endings_comments_reactions (user_id, story_endings_comments_id, reaction_type) VALUES ($1, $2, $3) RETURNING *",
      [user_id, story_endings_comments_id, reaction_type]
    );
    return newReaction;
  } catch (error) {
    return error;
  }
};

const countReactionsForComment = async (comment_id, reaction_type) => {
  try {
    const count = await db.one(
      "SELECT COUNT(*) FROM story_endings_comments_reactions WHERE story_endings_comments_id = $1 AND reaction_type = $2",
      [comment_id, reaction_type]
    );
    return count.count;
  } catch (error) {
    return error;
  }
};

const removeReactionFromComment = async (
  user_id,
  comment_id,
  reaction_type
) => {
  try {
    await db.none(
      "DELETE FROM story_endings_comments_reactions WHERE user_id = $1 AND story_endings_comments_id = $2 AND reaction_type = $3",
      [user_id, comment_id, reaction_type]
    );
    return "Reaction removed successfully";
  } catch (error) {
    return error;
  }
};

module.exports = {
  addReactionToStoryEndingComment,
  countReactionsForComment,
  checkUserReactionToComment,
  removeReactionFromComment,
};
