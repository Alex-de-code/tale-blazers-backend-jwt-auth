const db = require("../db/dbConfig");

// Get all likes for a story ending
const getAllLikesByStoryEndingId = async (story_endings_id) => {
  try {
    const likes = await db.any(
      "SELECT * FROM story_endings_likes WHERE story_endings_id = $1",
      [story_endings_id]
    );
    return likes;
  } catch (error) {
    return error;
  }
};
