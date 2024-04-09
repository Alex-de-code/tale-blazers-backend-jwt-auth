const express = require("express");
const story_beginnings = express.Router();

// import queries
const {
  getAllStoryBeginnings,
  getStoryBeginningById,
  createStoryBeginning,
} = require("../queries/story_beginnings.js");

// import validations
const {
  validateStoryBeginningTitle,
  validateStoryBeginningGenre,
  validateStoryBeginningDescription,
  validateStoryBeginningBody,
} = require("../validations/checkStoryBeginnings.js");

// all story beginnings
story_beginnings.get("/", async (req, res) => {
  try {
    const allStoryBeginnings = await getAllStoryBeginnings();
    res.status(200).json(allStoryBeginnings);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// single story beginning
story_beginnings.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const story_beginning = await getStoryBeginningById(id);
    if (story_beginning) {
      res.status(200).json(story_beginning);
    } else {
      res.status(404).json({ error: "Story beginning not found with this ID" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

//create a story beginning
story_beginnings.post(
  "/",
  validateStoryBeginningTitle,
  validateStoryBeginningGenre,
  validateStoryBeginningDescription,
  validateStoryBeginningBody,
  async (req, res) => {
    try {
      const newStoryBeginning = await createStoryBeginning(req.body);
      res.status(201).json(newStoryBeginning);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = story_beginnings;
