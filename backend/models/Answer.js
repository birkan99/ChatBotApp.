const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  sessionId: { type: String, required: true }, // Unique identifier for the session
  question: { type: String, required: true },// Question text
  answer: { type: String, required: true }, // Answer text
  createdAt: { type: Date, default: Date.now }, // Creation time of the answer
  startTime: { type: Date, required: true }, // Time when the answer starts
  endTime: { type: Date } // Time when the answer is completed
});

const Answer = mongoose.model('Answer', answerSchema, 'answers'); // 'answers' collection
module.exports = Answer;
