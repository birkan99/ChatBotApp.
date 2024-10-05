import React from 'react';
import './ChatMessage.css';

const ChatMessage = ({ type, message }) => {
  const className = type === 'bot' ? 'bot-message' : 'user-message';
  
  return (
    <div className={`chat-message ${className}`}>
      {message}
    </div>
  );
};

export default ChatMessage;
