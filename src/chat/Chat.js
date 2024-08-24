import React, { useState, useEffect } from 'react';
import Header from '../chat-ui/components/presentational/Header';
import MessageList from '../chat-ui/components/presentational/MessageList';
import InputBox from '../chat-ui/components/presentational/InputBox';
import './Chat.css';

const Chat = ({ apiUrl, apiKey, userId, sessionId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    initChat();
  }, []);

  const initChat = async () => {
    const initialMessage = 'Hello! How can I help you today?';
    const response = await sendMessageToAPI(initialMessage);
    if (response) {
      setMessages([{ sender: 'bot', content: response.choices[0].message.content }]);
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

  return (
    <div className="chat-container">
      <Header />
      <MessageList messages={messages} />
      <InputBox input={input} setInput={setInput} handleSendMessage={handleSendMessage} />
    </div>
  );
};

export default Chat;
