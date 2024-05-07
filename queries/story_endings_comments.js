const db = require("../db/dbConfig");

// retrieve all story ending comments for a given story ending ID
const getAllCommentsByStoryEndingId = async (id) => {
  try {
    const storyEndingCommentsByStoryEndingId = await db.any(
      "SELECT DISTINCT story_endings_comments.* FROM story_endings_comments " +
        "JOIN story_endings ON story_endings_comments.story_endings_id = story_endings.id " +
        "WHERE story_endings.id = $1",
      [id]
    );
    return storyEndingCommentsByStoryEndingId;
  } catch (error) {
    return error;
  }
};

// create a query that returns any and all flagged comments from a user
// create a query that return any and all flagged comments for a story_ending
