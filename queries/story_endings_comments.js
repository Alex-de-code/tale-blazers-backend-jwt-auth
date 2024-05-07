const db = require("../db/dbConfig");

// retrieve all comments for a given story ending ID
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

// retrieves one comment based on it's id
const getSingleCommentByID = async (id) => {
  try {
    const singleCommentByID = await db.one(
      "SELECT * FROM story_endings_comments WHERE id=$1",
      id
    );
    return singleCommentByID;
  } catch (error) {
    return error;
  }
};

// create a comment for a story_ending
const createStoryEndingComment = async (story_ending_comment) => {
  const { comment, tag, story_endings_id, user_id } = story_ending_comment;
  try {
    const newComment = await db.one(
      "INSERT INTO story_endings_comments (comment, tag, story_endings_id, user_id) VALUES($1, $2, $3, $4) RETURNING *",
      [comment, tag, story_endings_id, user_id]
    );
    return newComment;
  } catch (error) {
    return error;
  }
};

// delete a comment
const deleteStoryEndingCommentByID = async (id) => {
  try {
    const deletedComment = await db.one(
      "DELETE FROM story_endings_comments WHERE id = $1 RETURNING *",
      id
    );
    console.log("Deleted Comment -->", deletedComment);
    return deletedComment;
  } catch (error) {
    return error;
  }
};

// edit a comment
const updateStoryEndingCommentByID = async (id, comment) => {
  const { comment, tag, story_endings_id, user_id } = story_ending_comment;
  try {
    const updatedStoryEndingComment = await db.one(
      "UPDATE story_endings_comments SET comment=$1, tag=$2, story_endings_id=$3, user_id=$4 WHERE id=$5 RETURNING *",
      [comment, tag, story_endings_id, user_id, id]
    );
    return updatedStoryEndingComment;
  } catch (error) {
    return error;
  }
};

// create a query that returns any and all flagged comments from a user
// create a query that return any and all flagged comments for a story_ending

module.exports = {
  getAllCommentsByStoryEndingId,
  getSingleCommentByID,
  createStoryEndingComment,
  deleteStoryEndingCommentByID,
  updateStoryEndingCommentByID,
};
