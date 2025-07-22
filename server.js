require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDb = require('./config/db');
const callRouter = require('./routes/callRoutes');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

connectDb();
app.use('/api', callRouter);

app.get('/', (req, res) => {
  res.send('Call Scheduler API Running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
