const { validateUserId } = require("./checkStoryBeginnings");

const validateStoryEndingTitle = (req, res, next) => {
  const { title } = req.body;
  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Story ending title is required" });
  }
  next();
};

const validateStoryEndingBody = (req, res, next) => {
  const { body } = req.body;
  if (!body || body.trim() === "") {
    return res.status(400).json({ error: "Story ending body is required" });
  }
  next();
};

module.exports = {
  validateStoryEndingTitle,
  validateStoryEndingBody,
  validateUserId,
};
