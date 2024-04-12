const db = require("../db/dbConfig");
/**
 * Finds a user by their username.
 * @param {string} username - The username of the user to find.
 * @returns {Promise<object|null>} The user object if found, otherwise null.
 */
const findUserByUsername = async (username) => {
  try {
    const query = "SELECT * FROM users WHERE username = $1";

    const user = await db.oneOrNone(query, username);

    // console.log("This is the chosen one:", user);
    return user;
  } catch (error) {
    console.error("Error finding user by username:", error);
    throw error;
  }
};

const createUser = async ({
  username,
  passwordHash,
  email,
  profile_picture,
  bio,
}) => {
  const query = `
      INSERT INTO users (username, password_hash, email, profile_picture, bio)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, username, email, profile_picture, bio; 
    `;
  const newUser = await db.one(query, [
    username,
    passwordHash,
    email,
    profile_picture,
    bio,
  ]);
  return newUser;
};

const deleteUserById = async ({ id }) => {
  try {
    const deletedUser = await db.one(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      id
    );
    return deletedUser; // Return the deleted user
  } catch (error) {
    return error;
  }
};

module.exports = {
  findUserByUsername,
  createUser,
  deleteUserById,
};
