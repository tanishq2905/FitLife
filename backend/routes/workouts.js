const router = require('express').Router();
const Workout = require('../models/Workout');
const auth = require('../middleware/auth');

// Get all workouts for logged in user
router.get('/', auth, async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user.id })
      .sort({ date: -1 });
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Log a new workout entry
router.post('/', auth, async (req, res) => {
  try {
    const { exerciseName, sets, reps, weight, duration, notes, date } = req.body;

    if (!exerciseName || !reps || weight === undefined) {
      return res.status(400).json({ message: 'exerciseName, reps and weight are required' });
    }

    const workout = await Workout.create({
      userId: req.user.id,
      exerciseName,
      sets,
      reps,
      weight,
      duration,
      notes,
      date,
    });
    res.status(201).json(workout);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single workout
router.get('/:id', auth, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    if (workout.userId.toString() !== req.user.id)
      return res.status(403).json({ message: 'Not authorized' });
    res.json(workout);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a workout
router.put('/:id', auth, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    if (workout.userId.toString() !== req.user.id)
      return res.status(403).json({ message: 'Not authorized' });

    const updated = await Workout.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a workout
router.delete('/:id', auth, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    if (workout.userId.toString() !== req.user.id)
      return res.status(403).json({ message: 'Not authorized' });

    await Workout.findByIdAndDelete(req.params.id);
    res.json({ message: 'Workout deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = (app) => app.use('/api/workouts', router);
