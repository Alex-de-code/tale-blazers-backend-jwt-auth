const validateStoryBeginningTitle = (req, res, next) => {
  const { title } = req.body;
  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Story beginning title is required" });
  }
  next();
};

const validateStoryBeginningGenre = (req, res, next) => {
  const { genre } = req.body;
  if (!genre || genre.trim() === "") {
    return res.status(400).json({ error: "Story beginning genre is required" });
  }
  next();
};

const validateStoryBeginningDescription = (req, res, next) => {
  const { description } = req.body;
  if (!description || description.trim() === "") {
    return res
      .status(400)
      .json({ error: "Story beginning description is required" });
  }
  next();
};

const validateStoryBeginningBody = (req, res, next) => {
  const { body } = req.body;
  if (!body || body.trim() === "") {
    return res.status(400).json({ error: "Story beginning body is required" });
  }
  next();
};

const validateUserId = (req, res, next) => {
  const { user_id } = req.body;
  // add another piece of logic that makes sure this value is in integer within the range of existing id's
  // could do a query in the db to check if you can find an entry for user that matches user_id
  if (!user_id || user_id.trim() === "") {
    return res
      .status(400)
      .json({ error: "Story beginning user_id is required" });
  }
  next();
};

module.exports = {
  validateStoryBeginningTitle,
  validateStoryBeginningGenre,
  validateStoryBeginningDescription,
  validateStoryBeginningBody,
  validateUserId,
};
