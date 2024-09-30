import React, { useState } from 'react';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (input.trim()) {
      const userMessage = { sender: 'user', text: input };
      setMessages([...messages, userMessage]);

      // Send POST request to the backend with the correct structure
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,  // Make sure this matches the backend model
        }),
        mode: 'cors',
      });

      const data = await response.json();
      const botMessage = { sender: 'bot', text: data.response };
      setMessages([...messages, userMessage, botMessage]);
      setInput('');
    }
  };



  return (
    <div className="App">
      <h1>SpriggleAI Chat</h1>
      <div style={{ height: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;