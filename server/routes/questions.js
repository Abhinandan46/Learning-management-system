const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// @desc    Get all questions
// @route   GET /api/questions
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;

    let query = {};
    if (category) {
      query.category = category;
    }

    const questions = await Question.find(query);
    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Get single question
// @route   GET /api/questions/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const question = await Question.findOne({ id: parseInt(req.params.id) });

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;