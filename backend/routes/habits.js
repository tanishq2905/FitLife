const router = require('express').Router();
const Habit = require('../models/Habit');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  const habits = await Habit.find({ userId: req.user.id });
  res.json(habits);
});

router.post('/', auth, async (req, res) => {
  try {
    const habit = await Habit.create({ ...req.body, userId: req.user.id });
    res.status(201).json(habit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/:id/checkin', auth, async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    const today = new Date().toDateString();
    if (!habit.completedDates.includes(today)) {
      habit.completedDates.push(today);
      habit.currentStreak += 1;
      if (habit.currentStreak > habit.longestStreak)
        habit.longestStreak = habit.currentStreak;
      await habit.save();
    }
    res.json(habit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  await Habit.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = (app) => app.use('/api/habits', router);
