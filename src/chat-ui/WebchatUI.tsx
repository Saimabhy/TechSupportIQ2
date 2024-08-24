import React, { useState } from 'react';
import Header from './components/presentational/Header';
import MessageList from './components/presentational/MessageList';
import InputBox from './components/presentational/InputBox';
import './WebchatUI.css';

const WebchatUI = ({ apiUrl, apiKey, userId, sessionId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (input.trim()) {
      const userMessage = { sender: 'user', content: input };
      setMessages([...messages, userMessage]);
      setInput('');

      const response = await sendMessageToAPI(input);
      if (response) {
        const botMessage = { sender: 'bot', content: response.choices[0].message.content };
        setMessages([...messages, userMessage, botMessage]);
      }
    }
  };

  const sendMessageToAPI = async (message) => {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'mistral-large-latest',
          messages: [{ role: 'user', content: message }]
        })
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error sending message to API:', error);
      return null;
    }
  };

  return (
    <div className="chat-container">
      <Header />
      <MessageList messages={messages} />
      <InputBox input={input} setInput={setInput} handleSendMessage={handleSendMessage} />
    </div>
  );
};

export default WebchatUI;
