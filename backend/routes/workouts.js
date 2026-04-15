const router = require('express').Router();
const Workout = require('../models/Workout');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  const workouts = await Workout.find({ userId: req.user.id }).sort({ date: -1 });
  res.json(workouts);
});

router.post('/', auth, async (req, res) => {
  try {
    const workout = await Workout.create({ ...req.body, userId: req.user.id });
    res.status(201).json(workout);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  await Workout.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = (app) => app.use('/api/workouts', router);
