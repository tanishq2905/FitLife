const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;

app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

require('./routes/auth')(app);
require('./routes/workouts')(app);
require('./routes/goals')(app);
require('./routes/habits')(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});