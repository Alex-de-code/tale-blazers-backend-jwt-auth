const express = require("express");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/token");
const {
  findUserByUsername,
  createUser,
  deleteUserById,
} = require("../queries/users");
const { authenticateToken } = require("../middlewares/authenticateToken");
const auth = express.Router();

// Login route
auth.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await findUserByUsername(username);

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user);

    res.status(200).json({
      message: "Logged in successfully",
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred during the login process." });
  }
});

// Register route
auth.post("/register", async (req, res) => {
  const { username, password, email, profile_picture, bio } = req.body;
  try {
    // Check if user already exists
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.status(409).json({ message: "Username already taken" });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user in the database
    const newUser = await createUser({
      username,
      passwordHash: hashedPassword,
      email,
      profile_picture,
      bio,
    });

    const token = generateToken(newUser);

    if (token) {
      return res.status(201).json({
        message: "User registered successfully",
        newUser,
        token,
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred during the registration process." });
  }
});

auth.get("/check-auth", authenticateToken, (req, res) => {
  // Assuming authenticateToken middleware adds user info to req.user

  if (req.user) {
    const { user } = req;
    return res.status(200).json({
      isAuthenticated: true,
      user: {
        user,
      },
    });
  } else {
    // If for some reason, req.user is not set, treat as not authenticated
    res.status(401).json({ isAuthenticated: false });
  }
});

auth.get("/user", authenticateToken, async (req, res) => {
  const { user } = req;
  try {
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user)
      // Return the user information, excluding sensitive data like password
      res.status(200).json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          profile_picture: user.profile_picture,
          bio: user.bio,
          created_at: user.created_at,
        },
      });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

auth.delete("/:id", authenticateToken, async (req, res) => {
  const { id } = req.body;
  try {
    const deletedUser = await deleteUserById(id);
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(404).json({ error: "Story ending not found with this ID" });
  }
});

module.exports = auth;
