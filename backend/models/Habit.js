const router = require('express').Router();
const Habit = require('../models/Habit');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.user.id, active: true });
    res.json(habits);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
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
    if (!habit) return res.status(404).json({ message: 'Habit not found' });

    // Check if already checked in today (compare date only, not time)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const alreadyDone = habit.completedDates.some(d => {
      const date = new Date(d);
      date.setHours(0, 0, 0, 0);
      return date.getTime() === today.getTime();
    });

    if (!alreadyDone) {
      habit.completedDates.push(today);
      habit.streak += 1;
      habit.updatedAt = Date.now();
      await habit.save();
    }

    res.json(habit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const habit = await Habit.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!habit) return res.status(404).json({ message: 'Habit not found' });
    res.json(habit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Soft delete — sets active: false instead of removing from DB
router.delete('/:id', auth, async (req, res) => {
  try {
    await Habit.findByIdAndUpdate(req.params.id, { active: false });
    res.json({ message: 'Habit removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = (app) => app.use('/api/habits', router);
