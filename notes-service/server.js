require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const notesRoutes = require('./routes/notes');
const verifyToken = require('./routes/authMiddleware');

const app = express();

app.use(cors({
  origin: 'http://localhost:5001',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB error:', err));

app.use('/api/notes', notesRoutes);

app.get('/', (req, res) => {
  res.send('Notes service is running');
});

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Notes service running on port ${PORT}`);
});
