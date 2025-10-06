import React, { useState, useEffect } from 'react';

function App() {
  const [conversations, setConversations] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/conversations')
      .then(res => res.json())
      .then(setConversations);
  }, []);

  useEffect(() => {
    if (selectedId) {
      fetch(`http://localhost:3001/conversations/${selectedId}`)
        .then(res => res.json())
        .then(setFormData);
    }
  }, [selectedId]);

  return (
    <div style={{ display: 'flex', gap: 40, padding: 40 }}>
      <div>
        <h2>Conversation IDs</h2>
        <ul>
          {conversations.map(id => (
            <li key={id}>
              <button onClick={() => setSelectedId(id)}>{id}</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Form Data</h2>
        {formData ? (
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        ) : (
          <p>Select a conversation ID</p>
        )}
      </div>
    </div>
  );
}

export default App;
