const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Answer = require('./models/Answer'); 

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://birkansaribacak:birkan123.@cluster0.iq7xa.mongodb.net/ChatbotApplication?retryWrites=true&w=majority')
.then(() => console.log('MongoDB Connected!'))
.catch(err => console.error('MongoDB connection error:', err));

// create new session
app.post('/create-session', async (req, res) => {
  const sessionId = `session-${Date.now()}`; //Unique identifier for the session
  res.status(201).json({ message: 'Session created successfully!', sessionId });
});

// save answer
app.post('/save-response', async (req, res) => {
  const { sessionId, question, answer } = req.body;

  const newAnswer = new Answer({
    sessionId,
    question,
    answer,
    startTime: new Date(), // Cevap vermeye başlama zamanı
    endTime: new Date()    // Cevap verme tamamlandığında zaman
  });

  try {
    await newAnswer.save();
    res.status(200).json({ message: 'Response saved successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving response' });
  }
});


// start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


