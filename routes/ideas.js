const express = require('express');
const ideas = require('../ideasArray');
const router = express.Router();

// get all ideas
router.get('/', (req, res) => {
  res.json({ success: true, data: ideas });
});
// get single idea
router.get('/:id', (req, res) => {
  const idea = ideas.find((idea) => idea.id === +req.params.id);
  if (!idea) {
    return res
      .status(404)
      .json({ success: false, error: 'Resource not found' });
  }
  res.json({ success: true, data: idea });
});

module.exports = router;
