const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Serve frontend files
app.use(express.static('public'));

// ===== JSON read/write functions =====
function readData() {
  return JSON.parse(fs.readFileSync('db.json', 'utf8'));
}

function writeData(data) {
  fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
}

// Add a new cow
function addCow(location) {
  const data = readData();
  const newCow = { id: Date.now(), location, status: 'pending' };
  data.cows.push(newCow);
  writeData(data);
  return newCow;
}

// ===== Express routes =====

// Test route
app.get('/api/test', (req, res) => {
  res.send('Backend running!');
});

// Report a cow
app.post('/api/report-cow', (req, res) => {
  const { location } = req.body;
  const newCow = addCow(location);
  res.send({ message: 'Cow reported successfully', cow: newCow });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});