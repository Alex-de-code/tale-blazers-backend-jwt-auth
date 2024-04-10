const express = require("express");
const story_endings = express.Router();

// import queries
const {
  getAllStoryEndings,
  getStoryEndingsByStoryBeginningId,
  createStoryEnding,
  deleteStoryEndingById,
  updateStoryEndingsbyId,
} = require("../queries/story_endings.js");

// import validatons
const {
  validateStoryEndingTitle,
  validateStoryEndingBody,
} = require("../validations/checkStoryEndings.js");

// all story endings
story_endings.get("/", async (req, res) => {
  try {
    const allStoryEndings = await getAllStoryEndings();
    res.status(200).json(allStoryEndings);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// all endings for a specific story
story_endings.get("/", async (req, res) => {
  try {
    const allStoryEndingsForASpecificStory =
      await getStoryEndingsByStoryBeginningId();
    res.status(200).json(allStoryEndingsForASpecificStory);
  } catch (error) {
    return error;
  }
});

// create a story ending
story_endings.post(
  "/",
  validateStoryEndingTitle,
  validateStoryEndingBody,
  async (req, res) => {
    try {
      const newStoryEnding = await createStoryEnding(req.body);
      res.status(201).json(newStoryEnding);
    } catch (error) {
      return error;
    }
  }
);

module.exports = story_endings;
