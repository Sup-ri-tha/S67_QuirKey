const { MongoClient } = require('mongodb');
const express = require('express');
require('dotenv').config();

const app = express();
const PORT = 3000;

const client = new MongoClient(process.env.MONGODB_URI);

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return 'Connected';
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return 'Connection Failed';
  }
}   

app.get('/', async(req, res) => {
    const dbStatus = await connectDB();
  res.send({ message: "Database Connection Status", status: dbStatus });
});

app.get('/ping', (req, res) => {
    res.json({ message: 'pong' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});