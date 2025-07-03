const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./routes/user'); 
const culturalSitesRoutes = require('../backend/routes/sites');
const authRoutes=require('./routes/auth');
const favoriteRoutes = require("./routes/favourite");
const reviewRoutes = require("./routes/reviewRoutes");
const connectDB= require('./config/db')


const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();
app.use(cors());
app.use(express.json());

// mongoose.connect(MONGODB_URI)
// .then(() => {
//   console.log('Connected to MongoDB!');
// })
// .catch((error) => {
//   console.error('Error connecting to MongoDB:', error);
// });
connectDB()

app.use('/api/users', userRoutes);
app.use('/api/cultural-sites', culturalSitesRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/reviews", reviewRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


app.post("/api/favorites/test", (req, res) => {
  res.json({ message: "Test route works!" });
});
