const checkUserReactionToComment = (req, res, next) => {
  const { user_id, comment_id } = req.body;
  if (!user_id || !comment_id) {
    return res
      .status(400)
      .json({ error: "Both user_id and comment_id are required" });
  }
  // Assuming the validation passes, you can proceed to the next middleware or route handler
  next();
};

module.exports = {
  checkUserReactionToComment,
};
