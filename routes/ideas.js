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

// add an idea
router.post('/', (req, res) => {
  const idea = {
    id: ideas.length + 1,
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
    date: new Date().toISOString().slice(0, 10),
  };
  ideas.push(idea);
  res.json({ success: true, data: idea });
});
// remove an idea
router.delete('/:id', (req, res) => {
  const ideaToRemove = ideas.find((idea) => idea.id === +req.params.id);
  if (!ideaToRemove) {
    return res
      .status(404)
      .json({ success: false, error: 'Resource not found' });
  }
  const ideasLeft = ideas.filter((idea) => idea.id !== ideaToRemove.id);
  res.json({
    success: true,
    message: `Removed idea with id ${req.params.id}`,
    removed: ideaToRemove,
    ideasLeft,
  });
});
// update an idea
router.put('/:id', (req, res) => {
  const idea = ideas.find((idea) => idea.id === +req.params.id);
  if (!idea) {
    return res
      .status(404)
      .json({ success: false, error: 'Resource not found' });
  }
  idea.text = req.body.text || idea.text;
  idea.tag = req.body.tag || idea.tag;
  res.json({ success: true, data: idea });
});
module.exports = router;
