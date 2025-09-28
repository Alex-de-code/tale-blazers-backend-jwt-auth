const express = require("express");
const story_endings = express.Router();

// import queries
const {
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
} = require("../queries/story_endings.js");

// import validatons
const {
  validateStoryEndingTitle,
  validateStoryEndingBody,
  validateUserId,
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
story_endings.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const allStoryEndingsForASpecificStory =
      await getStoryEndingsByStoryBeginningId(id);
    if (allStoryEndingsForASpecificStory) {
      res.status(200).json(allStoryEndingsForASpecificStory);
    } else {
      res
        .status(404)
        .json({ error: "Story ending not found for story with this ID" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// single story ending based on id
story_endings.get("/single/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const singleStoryEnding = await getSingleStoryEndingByID(id);
    if (singleStoryEnding) {
      res.status(200).json(singleStoryEnding);
    } else {
      res
        .status(404)
        .json({ error: "Single story ending not found for this ID" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});
// create a story ending
story_endings.post(
  "/",
  validateUserId,
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

// delete a story ending
story_endings.delete("/single/:id", async (req, res) => {
  //removed validateUserId as there is no req.body and so it would never get the user_id to even authenticate it
  // console.log("delete controller");
  const { id } = req.params;
  try {
    const deletedStoryEnding = await deleteStoryEndingById(id);
    res.status(200).json(deletedStoryEnding);
  } catch (error) {
    res.status(404).json({ error: "Story ending not found with this ID" });
  }
});

// update a story ending
story_endings.put(
  "/single/:id",
  validateUserId,
  validateStoryEndingTitle,
  validateStoryEndingBody,
  async (req, res) => {
    const { id } = req.params;
    // extract story ending details from request body
    const story_ending = req.body;
    try {
      const updatedStoryEnding = await updateStoryEndingsbyId(id, story_ending);
      res.status(200).json(updatedStoryEnding);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Add a reaction (like, love, etc.) to a story ending
story_endings.post("single/:id/reaction", async (req, res) => {
  const { id } = req.params;
  const { user_id, reaction_type } = req.body;

  // Validate reaction type (optional but recommended for user input validation)
  if (
    !["like", "dislike", "love", "funny", "sad", "angry"].includes(
      reaction_type
    )
  ) {
    return res.status(400).json({ error: "Invalid reaction type" });
  }

  try {
    const result = await addReaction(user_id, id, reaction_type);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Remove a reaction (unlike, undo reaction) from a story ending
story_endings.delete("single/:id/reaction", async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;

  try {
    const result = await removeReaction(user_id, id);
    if (result.message) {
      return res.status(404).json({ error: result.message });
    }
    res.status(200).json({ message: "Reaction removed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Update a reaction (change reaction type) for a story ending
story_endings.put("single/:id/reaction", async (req, res) => {
  const { id } = req.params;
  const { user_id, reaction_type } = req.body;

  // Validate reaction type (optional but recommended for user input validation)
  if (
    !["like", "dislike", "love", "funny", "sad", "angry"].includes(
      reaction_type
    )
  ) {
    return res.status(400).json({ error: "Invalid reaction type" });
  }

  try {
    const result = await updateReaction(user_id, id, reaction_type);
    if (result.message) {
      return res.status(404).json({ error: result.message });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = story_endings;
