const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./routes/user'); 
const culturalSitesRoutes = require('../backend/routes/sites');
const authRoutes=require('./routes/auth');

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(MONGODB_URI)
.then(() => {
  console.log('Connected to MongoDB!');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});


app.use('/api/users', userRoutes);
app.use('/api/cultural-sites', culturalSitesRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});







