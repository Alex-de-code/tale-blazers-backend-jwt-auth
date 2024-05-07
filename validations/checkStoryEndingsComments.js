const { validateUserId } = require("./checkStoryBeginnings");

const validateStoryEndingCommentTag = (req, res, next) => {
  const { tag } = req.body;
  if (!tag || tag.trim() === "") {
    return res.status(400).json({ error: "Story ending comment tag required" });
  }
  next();
};

const validateStoryEndingCommentBody = (req, res, next) => {
  const { body } = req.body;
  if (!body || body.trim() === "") {
    return res
      .status(400)
      .json({ error: "Story endings comment body is required" });
  }
  next();
};

module.exports = {
  validateStoryEndingCommentBody,
  validateStoryEndingCommentTag,
  validateUserId,
};
