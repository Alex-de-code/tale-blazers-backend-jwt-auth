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

// retrieves one story ending based on it's id, also need storybeginning id for sub array of endings
const getSingleStoryEndingByID = async (id) => {
  try {
    const singleStoryEndingByID = await db.one(
      "SELECT * FROM story_endings WHERE id=$1",
      id
    );
    return singleStoryEndingByID;
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
    console.log("Deleted Story Ending -->", deletedStoryEnding);
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

// Check if the user has already liked the story ending
const checkUserReaction = async (user_id, story_endings_id) => {
  try {
    const reaction = await db.oneOrNone(
      "SELECT * FROM story_endings_reactions WHERE user_id = $1 AND story_endings_id = $2",
      [user_id, story_endings_id]
    );
    return reaction; // If reaction exists, it will be returned, otherwise `null`
  } catch (error) {
    return error;
  }
};

// Add a reaction for a story ending
const addReaction = async (user_id, story_endings_id) => {
  try {
    // Check if the user has already reacted
    const existingReaction = await checkUserReaction(user_id, story_endings_id);

    if (existingReaction) {
      return { message: "User has already reacted to this story ending" }; // Optionally return a message
    }

    // Add a new like reaction
    const newReaction = await db.one(
      "INSERT INTO story_endings_reactions (user_id, story_endings_id, reaction_type) VALUES($1, $2, $3) RETURNING *",
      [user_id, story_endings_id, "like"]
    );
    return newReaction;
  } catch (error) {
    return error;
  }
};

// Remove a reaction (or "unlike") from a story ending
const removeReaction = async (user_id, story_endings_id) => {
  try {
    // Check if the user has liked the story ending
    const existingReaction = await checkUserReaction(user_id, story_endings_id);

    if (!existingReaction) {
      return { message: "User has not liked this story ending yet" };
    }

    // Remove the like reaction
    const removedReaction = await db.one(
      "DELETE FROM story_endings_reactions WHERE user_id = $1 AND story_endings_id = $2 RETURNING *",
      [user_id, story_endings_id]
    );
    return removedReaction;
  } catch (error) {
    return error;
  }
};

// Update the reaction for a story ending (e.g., change from 'dislike' to 'like')
const updateReaction = async (user_id, story_endings_id, new_reaction_type) => {
  try {
    // Check if the user has reacted
    const existingReaction = await checkUserReaction(user_id, story_endings_id);

    if (!existingReaction) {
      return { message: "User has not reacted to this story ending yet" };
    }

    // Update the reaction type
    const updatedReaction = await db.one(
      "UPDATE story_endings_reactions SET reaction_type = $1 WHERE user_id = $2 AND story_endings_id = $3 RETURNING *",
      [new_reaction_type, user_id, story_endings_id]
    );
    return updatedReaction;
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
  getSingleStoryEndingByID,
  checkUserReaction,
  addReaction,
  removeReaction,
  updateReaction,
};
