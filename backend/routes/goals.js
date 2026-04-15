const router = require('express').Router();
const Goal = require('../models/Goal');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  const goals = await Goal.find({ userId: req.user.id });
  res.json(goals);
});

router.post('/', auth, async (req, res) => {
  try {
    const goal = await Goal.create({ ...req.body, userId: req.user.id });
    res.status(201).json(goal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  const goal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(goal);
});

router.delete('/:id', auth, async (req, res) => {
  await Goal.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = (app) => app.use('/api/goals', router);
