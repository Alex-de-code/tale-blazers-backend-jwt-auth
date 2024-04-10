const db = require("../db/dbConfig");

// retrieve all story endings
const getAllStoryEndings = async () => {
  try {
    const allStoryEndings = await db.any("SELECT * FROM story_endings");
    return allStoryEndings;
  } catch (error) {
    return error;
  }
};

// retrieve all story endings for a given story ID
const getStoryEndingsByStoryBeginningId = async (id) => {
  try {
    const storyEndingsByStoryBeginningID = await db.any(
      "SELECT DISTINCT story_endings.* FROM story_endings " +
        "JOIN story_beginnings ON story_endings.story_beginnings_id = story_beginnings.id " +
        "WHERE story_beginnings.id = $1",
      [id]
    );
    return storyEndingsByStoryBeginningID;
  } catch (error) {
    return error;
  }
};

// create a story ending
// I want users to only create a title, and body for story ending, based on whatever story beginning a story ending is attached to the story_beginning ID should update to the right story beginning. The creation of the story ending should automicatically be created on ending submission and the id of the user should be stored in the user_id key.
const createStoryEnding = async (story_ending) => {
  // include other keys
  const { title, body, story_beginnings_id, user_id } = story_ending;
  try {
    const newStoryEnding = await db.one(
      "INSERT INTO story_endings (title, body, story_beginnings_id, user_id) VALUES($1, $2, $3, $4) RETURNING *",
      [title, body, story_beginnings_id, user_id]
    );
    return newStoryEnding;
  } catch (error) {
    return error;
  }
};

// delete a story ending
const deleteStoryEndingById = async (id) => {
  try {
    const deletedStoryEnding = await db.one(
      "DELETE FROM story_endings WHERE id = $1 RETURNING *",
      id
    );
    return deletedStoryEnding;
  } catch (error) {
    return error;
  }
};

// edit a story ending
const updateStoryEndingsbyId = async (id, story_ending) => {
  const { title, body, story_beginnings_id, user_id } = story_ending;
  try {
    const updatedStoryEnding = await db.one(
      "UPDATE story_endings SET title=$1, body=$2, story_beginnings_id=$3, user_id=$4 WHERE id=$5 RETURNING *",
      [title, body, story_beginnings_id, user_id, id]
    );
    return updatedStoryEnding;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllStoryEndings,
  getStoryEndingsByStoryBeginningId,
  createStoryEnding,
  deleteStoryEndingById,
  updateStoryEndingsbyId,
};
