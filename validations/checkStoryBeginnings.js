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

module.exports = {
  validateStoryBeginningTitle,
  validateStoryBeginningGenre,
  validateStoryBeginningDescription,
  validateStoryBeginningBody,
};
