// Base server file
const express = require('express');
const app = express();
app.use(express.json());

// In-memory data
const users = [
  { id: 1, name: 'Alice', role: 'admin' },
  { id: 2, name: 'Bob', role: 'user' }
];

app.get('/users', (req, res) => {
  res.json(users);
});

app.listen(3000, () => console.log('Server running on port 3000'));
