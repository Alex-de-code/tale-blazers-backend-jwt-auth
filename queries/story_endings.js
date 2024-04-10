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
      "SELECT * FROM story_endings " +
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
const createStoryEnding = async (story_ending) => {
  const { title, body } = story_ending;
  try {
    const newStoryEnding = await db.one(
      "INSERT into story_endings (title, body) VALUES($1, $2) RETURNING *",
      [title, body]
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
  const { title, body } = story_ending;
  try {
    const updatedStoryEnding = await db.one(
      "UPDATE story_endings SET title=$1, body=$2 WHERE id=$3 RETURNING *",
      [title, body, id]
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
