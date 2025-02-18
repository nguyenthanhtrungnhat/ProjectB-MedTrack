const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

// Enable CORS
app.use(cors());

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost', // Adjust as necessary
  user: 'root',      // Your MySQL username
  password: 'nhat123A@',      // Your MySQL password
  database: 'HospitalDB'
});

// Connect to the database
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database');
});

// Middleware to parse JSON requests
app.use(express.json());

// Generic function to fetch all records from a table
const getAllRecords = (tableName, res) => {
  db.query(`SELECT * FROM ${tableName}`, (err, results) => {
    if (err) {
      res.status(500).send({ error: 'Failed to retrieve records from ' + tableName });
    } else {
      res.status(200).json(results);
    }
  });
};

// API routes for each table
app.get('/nurses', (req, res) => getAllRecords('Nurse', res));
app.get('/doctors', (req, res) => getAllRecords('Doctor', res));
app.get('/medical-records', (req, res) => getAllRecords('MedicalRecords', res));
app.get('/patients', (req, res) => getAllRecords('Patient', res));
app.get('/rooms', (req, res) => getAllRecords('Room', res));
app.get('/requests', (req, res) => getAllRecords('Request', res));
app.get('/users', (req, res) => getAllRecords('User', res));
app.get('/appointments', (req, res) => getAllRecords('Appointment', res));
app.get('/roles', (req, res) => getAllRecords('Role', res));
app.get('/user-roles', (req, res) => getAllRecords('UserRole', res));
app.get('/feedback', (req, res) => getAllRecords('Feedback', res));

// Get nurse by ID
app.get('/nurses/:id', (req, res) => {
  const nurseID = req.params.id;
  db.query('SELECT * FROM Nurse WHERE nurseID = ?', [nurseID], (err, results) => {
    if (err) {
      res.status(500).send({ error: 'Failed to retrieve nurse data' });
    } else if (results.length === 0) {
      res.status(404).send({ message: 'Nurse not found' });
    } else {
      res.status(200).json(results[0]); // Return the first result (since ID is unique)
    }
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
