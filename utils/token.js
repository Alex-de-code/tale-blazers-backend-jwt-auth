const jwt = require("jsonwebtoken");

function generateToken(user) {
  const payload = {
    id: user.id, // Use user's unique identifier
    username: user.username,
    email: user.email,
    bio: user.bio,
    profile_picture: user.profile_picture,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };

  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: "1h", // Token expires in 1 hour
  };

  return jwt.sign(payload, secret, options); // token is created
}

module.exports = { generateToken };
