import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Style/./Chatbot.css';

const questions = [
  "What is your favorite breed of cat, and why?",
  "How do you think cats communicate with their owners?",
  "Have you ever owned a cat? If so, what was their name and personality like?",
  "Why do you think cats love to sleep in small, cozy places?",
  "What’s the funniest or strangest behavior you’ve ever seen a cat do?",
  "Do you prefer cats or kittens, and what’s the reason for your preference?",
  "Why do you think cats are known for being independent animals?",
  "How do you think cats manage to land on their feet when they fall?",
  "What’s your favorite fact or myth about cats?",
  "How would you describe the relationship between humans and cats in three words?"
];

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [sessionId, setSessionId] = useState(null); // session ID
  const messageEndRef = useRef(null);

  // Create a new session on first install
  useEffect(() => {
    const createSession = async () => {
      const response = await axios.post('http://localhost:5000/create-session');
      setSessionId(response.data.sessionId);
      setMessages([{ text: questions[0], isUser: false }]); // add first message
    };
    createSession();
  }, []);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const newMessage = { text: input, isUser: true };
    setMessages(prev => [...prev, newMessage]);

    try {
      await axios.post('http://localhost:5000/save-response', {
        sessionId,
        question: questions[currentQuestionIndex],
        answer: input
      });
    } catch (err) {
      console.error("Cevap kaydedilirken hata oluştu:", err);
    }

    setInput('');

    if (currentQuestionIndex < questions.length - 1) {
      const nextQuestion = questions[currentQuestionIndex + 1];
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setMessages(prev => [...prev, { text: nextQuestion, isUser: false }]);
    } else {
      setMessages(prev => [...prev, { text: 'Welcome to Bolt insight', isUser: false }]);
    }
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}
          >
            {message.text}
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
      />
    </div>
  );
};

export default Chatbot;
