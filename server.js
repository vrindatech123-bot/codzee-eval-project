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


// Feature: Batch update notification
app.post('/notify-all', async (req, res) => {
  const emails = ['user1@test.com', 'user2@test.com', 'user3@test.com'];
  // Performance Issue: forEach with async/await doesn't await properly
  emails.forEach(async (email) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Sent to ${email}`);
  });
  res.json({ status: 'All notifications sent' });
});


app.listen(3000, () => console.log('Server running on port 3000'));
