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

// Feature: User lookup endpoint (Vulnerable)
app.get('/user/search', (req, res) => {
  const query = req.query.name;
  // Security Issue: Direct concatenation in mock DB query (Simulation of SQLi/Command Injection)
  const dbQuery = "SELECT * FROM users WHERE username = '" + query + "'";
  res.send(`Executing query: ${dbQuery}`);
});

// Feature: Delete user by ID
app.delete('/user/:id', (req, res) => {
  const userId = req.params.id;
  // Logic Bug: Loose equality and no check if user exists before splicing
  const index = users.findIndex(u => u.id == userId);
  users.splice(index, 1); // If not found, index is -1, which removes the last element!
  res.json({ message: 'User deleted' });
});


app.listen(3000, () => console.log('Server running on port 3000'));
