import React from 'react';
import './MessageList.css';

const MessageList = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.sender}`}>
          {msg.content}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
