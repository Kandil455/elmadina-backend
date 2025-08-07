const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// بعد app.use(express.json())
const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Elmadina API is running!');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => console.log('❌ MongoDB Error:', err));