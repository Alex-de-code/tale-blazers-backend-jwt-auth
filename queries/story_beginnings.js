const db = require("../db/dbConfig");

const getAllStoryBeginnings = async () => {
  try {
    const allStoryBeginnings = await db.any("SELECT * FROM story_beginnings");
    return allStoryBeginnings;
  } catch (error) {
    return error;
  }
};

const getStoryBeginningById = async (id) => {
  try {
    const oneStoryBeginning = await db.one(
      "SELECT * FROM story_beginnings WHERE id=$1",
      id
    );
    return oneStoryBeginning;
  } catch (error) {
    return error;
  }
};

const createStoryBeginning = async (story_beginning) => {
  const { title, genre, description, body } = story_beginning;
  try {
    const newStoryBeginning = await db.one(
      "INSERT into story_beginnings (title, genre, description, body) VALUES($1, $2, $3, $4) RETURNING *",
      [title, genre, description, body]
    );
    return newStoryBeginning;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllStoryBeginnings,
  getStoryBeginningById,
  createStoryBeginning,
};
