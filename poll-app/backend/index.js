const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let polls = {};

app.post('/api/polls', (req, res) => {
  const { question, options } = req.body;
  const id = uuidv4();
  polls[id] = {
    id,
    question,
    options: options.map(text => ({ text, votes: 0 })),
  };
  res.json({ id });
});

app.get('/api/polls/:id', (req, res) => {
  const poll = polls[req.params.id];
  if (!poll) return res.status(404).json({ error: 'Poll not found' });
  res.json(poll);
});

app.post('/api/polls/:id/vote', (req, res) => {
  const { optionIndex } = req.body;
  const poll = polls[req.params.id];
  if (!poll || optionIndex >= poll.options.length) return res.status(400).json({ error: 'Invalid vote' });
  poll.options[optionIndex].votes += 1;
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
