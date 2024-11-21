const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cryptoRoutes = require('./routes/crypto');
const alertRoutes = require('./routes/alerts');
const schedulePriceCheck = require('./cronJobs/priceChecker');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Connection Failed:', err));

// Routes
app.use('/api/crypto', cryptoRoutes);
app.use('/api/alerts', alertRoutes);

// Schedule the price-check job
schedulePriceCheck();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
