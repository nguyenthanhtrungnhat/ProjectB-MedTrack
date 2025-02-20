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
app.get("/nurses/:nurseID", (req, res) => {
  const { nurseID } = req.params;

  const query = `
    SELECT n.*, u.*
    FROM Nurse n
    JOIN User u ON n.userID = u.userID
    WHERE n.nurseID = ?;
  `;

  db.query(query, [nurseID], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error", details: err });
    if (results.length === 0) return res.status(404).json({ error: "Patient not found" });

    res.json(results[0]);
  });
});
// app.get('/nurses/:id', (req, res) => {
//   const nurseID = req.params.id;

//   const query = `
//   SELECT 
//       n.nurseID, 
//       n.department, 
//       CAST(COALESCE(JSON_ARRAYAGG(
//           JSON_OBJECT(
//               'patientID', p.patientID,
//               'fullName', uP.fullName,
//               'dob', uP.dob,
//               'phone', uP.phone,
//               'email', uP.email,
//               'BHYT', p.BHYT,
//               'admissionDate', p.admissionDate,
//               'dischargeDate', p.dischargeDate,
//               'hospitalizationsDiagnosis', p.hospitalizationsDiagnosis,
//               'summaryCondition', p.summaryCondition,
//               'dischargeDiagnosis', p.dischargeDiagnosis,
//               'roomID', p.roomID  -- 🔥 Added roomID
//           )
//       ), '[]') AS JSON) AS patients,  
//       uN.userID, uN.username, uN.fullName AS nurseFullName, 
//       uN.dob AS nurseDob, uN.phone AS nursePhone, 
//       uN.email AS nurseEmail, uN.CCCD, uN.address, uN.gender
//   FROM Nurse n
//   JOIN User uN ON n.userID = uN.userID  
//   LEFT JOIN NursePatient np ON n.nurseID = np.nurseID
//   LEFT JOIN Patient p ON np.patientID = p.patientID
//   LEFT JOIN User uP ON p.userID = uP.userID  
//   WHERE n.nurseID = ?
//   GROUP BY n.nurseID, n.department, uN.userID, uN.username, 
//            uN.fullName, uN.dob, uN.phone, uN.email, uN.CCCD, 
//            uN.address, uN.gender;
// `;


//   db.query(query, [nurseID], (err, results) => {
//     if (err) {
//       console.error('🛑 SQL Error:', err.sqlMessage);  // Print the exact SQL error
//       return res.status(500).json({ error: 'Failed to retrieve nurse data', details: err.sqlMessage });
//     }
//     if (results.length === 0) {
//       return res.status(404).json({ message: 'Nurse not found' });
//     }

//     res.status(200).json(results[0]);
//   });
// });

// API to get patients by roomID
app.get("/rooms/:roomID/patients", (req, res) => {
  const { roomID } = req.params;

  const query = `
      SELECT p.*, u.fullName, u.email, u.phone
      FROM Patient p
      JOIN RoomPatient rp ON p.patientID = rp.patientID
      JOIN User u ON p.userID = u.userID 
      WHERE rp.roomID = ?;
  `;

  db.query(query, [roomID], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }
    res.json(results);
  });
});

//get patient by id
app.get("/patients/:patientID", (req, res) => {
  const { patientID } = req.params;

  const query = `
    SELECT p.*, u.*
    FROM Patient p
    JOIN User u ON p.userID = u.userID
    WHERE p.patientID = ?;
  `;

  db.query(query, [patientID], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error", details: err });
    if (results.length === 0) return res.status(404).json({ error: "Patient not found" });

    res.json(results[0]);
  });
});
//get medical-record by id
app.get("/medical-records/:patientID", (req, res) => {
  const { patientID } = req.params;

  const query = `
    SELECT *
    FROM MEDICALRECORDS 
    WHERE MEDICALRECORDS.patientID = ?;
  `;

  db.query(query, [patientID], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error", details: err });
    if (results.length === 0) return res.status(404).json({ error: "Patient not found" });

    res.json(results[0]);
  });
});



// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
