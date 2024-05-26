const express = require("express");
const User = require("../Schemas/User");
const Note = require("../Schemas/Note");
const router = express.Router();

router.use(express.json());

router.post("/user/:id", async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { id } = req.params;
    const user = await User.findById(id);
    if (user) {
      const newNote = new Note({ title, description });
      newNote.user = user._id;
      user.notes.push(newNote);
      await newNote.save();
      await user.save();
      return res.json("Note Was Created");
    } else {
      return res.status(404).json("User Not Found");
    }
  } catch (err) {
    next(err);
  }
});
router.get("/user/:id/notes", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("notes");
    if (!user) {
      return res.status(404).json("User not found");
    }
    res.json(user.notes);
  } catch (error) {
    next(error);
  }
});

router.get("/note/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json("Note not found");
    }
    return res.json(note);
  } catch (error) {
    next(error);
  }
});

router.put("/user/:id/note/:nid", async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { id, nid } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json("User not found");
    }
    const note = await Note.findById(nid);
    if (!note) {
      return res.status(404).json("Note not found");
    }
    note.title = title;
    note.description = description;
    await note.save();
    return res.json("Note was Updated");
  } catch (error) {
    next(error);
  }
});

router.delete("/user/:id/note/:nid", async (req, res, next) => {
  try {
    const { id, nid } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json("User not found");
    }
    const note = await Note.findById(nid);
    if (!note) {
      return res.status(404).json("Note not found");
    }
    const noteIndex = user.notes.indexOf(nid);
    if (noteIndex === -1) {
      return res.status(404).json("Note not found in user");
    }
    user.notes.splice(noteIndex, 1);
    await user.save();
    await Note.findByIdAndDelete(nid);
    return res.json("Note was Deleted");
  } catch (e) {
    next(e);
  }
});

module.exports = router;
