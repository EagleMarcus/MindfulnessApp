const express = require('express');
const router = express.Router();
const verifyToken = require('./authMiddleware');
const Note = require('../models/Note');

// Get all notes for the authenticated user
router.get('/', verifyToken, async (req, res) => {
  const userId = req.user.userId;

  try {
    const notes = await Note.find({ userId });
    res.json({ notes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch notes' });
  }
});

// Create a new note
router.post('/', verifyToken, async (req, res) => {
  const userId = req.user.userId;
  const { title, content } = req.body;

  try {
    const newNote = new Note({ title, content, userId });
    await newNote.save();
    res.status(201).json({ message: 'Note created', note: newNote });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create note' });
  }
});

// Delete a note
router.delete('/:id', verifyToken, async (req, res) => {
  const userId = req.user.userId;
  const noteId = req.params.id;

  try {
    const note = await Note.findOneAndDelete({ _id: noteId, userId });
    if (!note) return res.status(404).json({ message: 'Note not found' });

    res.json({ message: 'Note deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete note' });
  }
});

module.exports = router;