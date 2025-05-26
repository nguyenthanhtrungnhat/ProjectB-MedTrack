const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const http = require('http');            // <-- needed for socket.io
const { Server } = require("socket.io"); // <-- socket.io server
require("dotenv").config({ path: "JWT.env" });

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'nhat123A@',
  database: 'HospitalDB'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database');
});

// Create HTTP server and bind Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // adjust this as needed in production
    methods: ["GET", "POST"]
  }
});

// Socket.IO connection event
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Generic functions and API endpoints

const getAllRecords = (tableName, res) => {
  db.query(`SELECT * FROM ${tableName}`, (err, results) => {
    if (err) {
      res.status(500).send({ error: 'Failed to retrieve records from ' + tableName });
    } else {
      res.status(200).json(results);
    }
  });
};

const getAllRecords2 = (tableName, res) => {
  const query = `
    SELECT n.*, u.*
    FROM ${tableName} n
    JOIN User u ON n.userID = u.userID;
  `;
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send({ error: 'Failed to retrieve records from ' + tableName });
    } else {
      res.status(200).json(results);
    }
  });
};

app.get('/nurses', (req, res) => getAllRecords2('Nurse', res));
app.get('/doctors', (req, res) => getAllRecords2('Doctor', res));
app.get('/medical-records', (req, res) => getAllRecords('MedicalRecords', res));
app.get('/patients', (req, res) => getAllRecords2('Patient', res));
app.get('/rooms', (req, res) => getAllRecords('Room', res));
app.get('/requests', (req, res) => getAllRecords('Request', res));
app.get('/users', (req, res) => getAllRecords('User', res));
app.get('/appointments', (req, res) => getAllRecords('Appointment', res));
app.get('/roles', (req, res) => getAllRecords('Role', res));
app.get('/user-roles', (req, res) => getAllRecords('UserRole', res));
app.get('/feedback', (req, res) => getAllRecords('Feedback', res));
app.get('/nursepatient', (req, res) => getAllRecords('nursepatient', res));

// ... Your other GET endpoints (unchanged) ...

// login POST endpoint (unchanged)
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email and password are required" });

  const query = "SELECT * FROM user WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).json({ error: "Internal server error" });
    if (results.length === 0) return res.status(401).json({ error: "Invalid email or password" });

    const user = results[0];
    if (password !== user.password) return res.status(401).json({ error: "Invalid email or password" });

    db.query("SELECT roleID FROM userRole WHERE userID = ?", [user.userID], (err, roleResults) => {
      if (err) return res.status(500).json({ error: "Internal server error" });
      if (roleResults.length === 0) return res.status(401).json({ error: "Role not found" });

      const roleID = roleResults[0].roleID;
      const token = jwt.sign({ userID: user.userID, roleID }, "secretkey", { expiresIn: "1h" });

      res.json({
        message: "Login successful",
        token,
        user: {
          userID: user.userID,
          email: user.email,
          roleID,
        }
      });
    });
  });
});

// POST medical-records - extended with socket emit
app.post("/post-medical-records", (req, res) => {
  const {
    patientID,
    heartRate,
    pulse,
    height,
    weight,
    hurtScale,
    temperature,
    currentCondition,
    SP02,
    healthStatus,
    respiratoryRate,
    bloodPressure,
    urine,
  } = req.body;

  const sql = `
    INSERT INTO MedicalRecords 
    (patientID, heartRate, pulse, height, weight, hurtScale, temperature, currentCondition, SP02, healthStatus, respiratoryRate, bloodPressure, urine) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    sql,
    [
      patientID,
      heartRate,
      pulse,
      height,
      weight,
      hurtScale,
      temperature,
      currentCondition,
      SP02,
      healthStatus,
      respiratoryRate,
      bloodPressure,
      urine,
    ],
    (err, result) => {
      if (err) {
        console.error("Lỗi khi thêm dữ liệu:", err);
        return res.status(500).json({ message: "Lỗi server", error: err });
      }
      res.status(201).json({ message: "Thêm thành công", recordID: result.insertId });

      // Emit realtime update event with new record info
      io.emit('update', {
        type: 'medical-record-added',
        recordID: result.insertId,
        patientID,
      });
    }
  );
});

// ... The rest of your endpoints (delete, update, etc.) remain unchanged ...

// Start the server using the HTTP server with socket.io
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
