import React from 'react';
import ReactDOM from 'react-dom';
import WebchatUI from './chat-ui/WebchatUI';

const apiUrl = 'https://api.mistral.ai/v1/chat/completions';
const apiKey = 'A6yofPIbBkjmoa4voGRpbZQ1rUmYWuDB'; // Remplacez par votre clé API
const userId = 'user1';
const sessionId = 'session1';

ReactDOM.render(
  <WebchatUI apiUrl={apiUrl} apiKey={apiKey} userId={userId} sessionId={sessionId} />,
  document.getElementById('root')
);
