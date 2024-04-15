const express = require("express");
const story_beginnings = express.Router();

// import authentication middleware
const { authenticateToken } = require("../middlewares/authenticateToken.js");

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
  validateUserId,
} = require("../validations/checkStoryBeginnings.js");
const auth = require("./authController.js");

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
// if authenticate token is not part of backend route don't send bearer token
story_beginnings.get("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  console.log(req.user);
  try {
    const story_beginning = await getStoryBeginningById(id);
    console.log(story_beginning);

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
  // apply authentication middleware here
  // authenticateToken,
  // validate inputs
  validateStoryBeginningTitle,
  validateStoryBeginningGenre,
  validateStoryBeginningDescription,
  validateStoryBeginningBody,
  validateUserId,
  async (req, res) => {
    try {
      // Extract the authenticated user ID from the request object
      // const user_id = req.user.id;
      // Create the story beginning with the provided data and user ID
      const newStoryBeginning = await createStoryBeginning(req.body);
      res.status(201).json(newStoryBeginning);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = story_beginnings;
