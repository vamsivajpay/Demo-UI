const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());

// Endpoint to get all conversation IDs
app.get('/conversations', (req, res) => {
  fs.readFile('mock_conversations.txt', 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');
    const lines = data.trim().split('\n').slice(1); // skip v2
    const ids = lines.map(line => line.split('=')[0]);
    res.json(ids);
  });
});

// Endpoint to get conversation data by ID
app.get('/conversations/:id', (req, res) => {
  fs.readFile('mock_conversations.txt', 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');
    const lines = data.trim().split('\n').slice(1); // skip v2
    const found = lines.find(line => line.startsWith(req.params.id + '='));
    if (!found) return res.status(404).send('Not found');
    const json = found.split('=')[1];
    res.json(JSON.parse(json));
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
