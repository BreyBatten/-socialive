require("dotenv").config();

const User = require("../models/users");
const express = require("express");
const router = express();
router.use(express.json());

// GET User table
router.get("/", async (req, res) => {
  const { id } = req.params;
  try {
    const users = await User.find(id);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET USER table with ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        error: `No user exists with id ${id}`
      });
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DEL request to with ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await User.remove(id);

    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: "could not find user with given id" });
    }
  } catch (err) {
    res.status(500).json({ message: "failed to delete user" });
  }
});

// EDIT USER with ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    const user = await User.findById(id);

    if (user) {
      const updatedUser = await User.update(changes, id);

      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "could not find user with given id" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to update user" });
  }
});

module.exports = router;
