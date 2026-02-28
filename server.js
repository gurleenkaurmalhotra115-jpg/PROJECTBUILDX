const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// ===== Ensure uploads folder exists =====
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// ===== Multer Setup =====
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// ===== JSON read/write =====
function readData() {
  return JSON.parse(fs.readFileSync('db.json', 'utf8'));
}

function writeData(data) {
  fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
}

// ===== ROUTES =====

// Test route
app.get('/api/test', (req, res) => {
  res.send('Backend running!');
});

// Report a cow (UPDATED)
app.post('/api/report-cow', upload.single('image'), (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({ error: "Location missing" });
    }

    const data = readData();

    const newCow = {
      id: Date.now(),
      latitude,
      longitude,
      image: req.file ? req.file.filename : null,
      status: 'pending'
    };

    data.cows.push(newCow);
    writeData(data);

    console.log("New Cow Reported:", newCow);

    res.json({
      success: true,
      message: 'Cow reported successfully',
      cow: newCow
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
