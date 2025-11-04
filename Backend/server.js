const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const verifyToken = require("./verifyToken");
require("dotenv").config({ path: "JWT.env" });
require('dotenv').config();

// Enable CORS
app.use(cors());

// Create MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  dateStrings: true,
  timezone: "+07:00",
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

// Generic function to fetch all records with join to user table
const getAllRecords2 = (tableName, res) => {
  const query = `
    SELECT 
    n.*, 
    u.userID,
    u.username,
    u.fullName,
    u.dob,
    u.phone,
    u.email,
    u.CCCD,
    u.address,
    u.haveTask,
    u.gender
    FROM ${tableName} n
    JOIN user u ON n.userID = u.userID;
  `;
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send({ error: 'Failed to retrieve records from ' + tableName });
    } else {
      res.status(200).json(results);
    }
  });
};

// API routes
app.get('/nurses', (req, res) => getAllRecords2('nurse', res));
app.get('/doctors', (req, res) => getAllRecords2('doctor', res));
app.get('/medical-records', (req, res) => getAllRecords('medicalrecords', res));
app.get('/patients', (req, res) => getAllRecords2('patient', res));
app.get('/rooms', (req, res) => getAllRecords('room', res));
app.get('/requests', (req, res) => getAllRecords('request', res));
app.get('/users', (req, res) => getAllRecords('user', res));
app.get('/appointments', (req, res) => getAllRecords('appointment', res));
app.get('/roles', (req, res) => getAllRecords('role', res));
app.get('/user-roles', (req, res) => getAllRecords('userrole', res));
app.get('/feedback', (req, res) => getAllRecords('feedback', res));
app.get('/nursepatient', (req, res) => getAllRecords('nursepatient', res));

// Get patient by nurseID
app.get("/nursepatient/:nurseID", (req, res) => {
  const { nurseID } = req.params;
  const query = `SELECT np.* FROM nursepatient np WHERE nurseID = ?;`;
  db.query(query, [nurseID], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error", details: err });
    if (results.length === 0) return res.status(404).json({ error: "No patients found for this nurse" });
    res.json(results);
  });
});

// Get nurse by ID
app.get("/nurses/:nurseID", (req, res) => {
  const { nurseID } = req.params;
  const query = `
    SELECT n.*, u.*
    FROM nurse n
    JOIN user u ON n.userID = u.userID
    WHERE n.nurseID = ?;
  `;
  db.query(query, [nurseID], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error", details: err });
    if (results.length === 0) return res.status(404).json({ error: "Nurse not found" });
    res.json(results[0]);
  });
});

// Get full nurse details by userID
app.get("/nurses/by-user/:userID", (req, res) => {
  const { userID } = req.params;
  const query = `
    SELECT n.*, u.*
    FROM nurse n
    JOIN user u ON n.userID = u.userID
    WHERE n.userID = ?;
  `;
  db.query(query, [userID], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error", details: err });
    if (results.length === 0) return res.status(404).json({ error: "Nurse not found" });
    res.json(results[0]);
  });
});

// API to get patients by roomID
app.get("/rooms/:roomID/patients", (req, res) => {
  const { roomID } = req.params;
  const query = `
      SELECT p.*, u.fullName, u.email, u.phone
      FROM patient p
      JOIN roompatient rp ON p.patientID = rp.patientID
      JOIN user u ON p.userID = u.userID 
      WHERE rp.roomID = ?;
  `;
  db.query(query, [roomID], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error", details: err });
    res.json(results);
  });
});

// Get patient by ID
app.get("/patients/:patientID", (req, res) => {
  const { patientID } = req.params;
  const query = `
    SELECT p.*, u.*
    FROM patient p
    JOIN user u ON p.userID = u.userID
    WHERE p.patientID = ?;
  `;
  db.query(query, [patientID], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error", details: err });
    if (results.length === 0) return res.status(404).json({ error: "Patient not found" });
    res.json(results[0]);
  });
});

// Get medical record by patientID
app.get("/medical-records/:patientID", (req, res) => {
  const { patientID } = req.params;
  const query = `SELECT * FROM medicalrecords WHERE patientID = ?;`;
  db.query(query, [patientID], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error", details: err });
    if (results.length === 0) return res.status(404).json({ error: "No records found" });
    res.json(results);
  });
});

// GET: Get medical record by recordID
app.get('/medical-records/by-recordId/:recordID', (req, res) => {
  const recordID = parseInt(req.params.recordID);
  if (isNaN(recordID)) return res.status(400).json({ error: 'Invalid recordID' });

  const query = 'SELECT * FROM medicalrecords WHERE recordID = ?';
  db.query(query, [recordID], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(404).json({ message: 'Record not found' });
    res.json(results[0]);
  });
});

// Login API
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password are required" });

  const query = "SELECT * FROM user WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).json({ error: "Internal server error" });
    if (results.length === 0) return res.status(401).json({ error: "Invalid email or password" });

    const user = results[0];
    if (password !== user.password)
      return res.status(401).json({ error: "Invalid email or password" });

    db.query("SELECT roleID FROM userrole WHERE userID = ?", [user.userID], (err, roleResults) => {
      if (err) return res.status(500).json({ error: "Internal server error" });
      if (roleResults.length === 0) return res.status(401).json({ error: "Role not found" });

      const roleID = roleResults[0].roleID;
      const token = jwt.sign({ userID: user.userID, roleID }, "secretkey", { expiresIn: "1h" });

      let redirectPath;
      let roleName;

      switch (roleID) {
        case 1: redirectPath = "/doctor"; roleName = "Doctor"; break;
        case 2: redirectPath = "/home"; roleName = "Nurse"; break;
        case 3: redirectPath = "/patient"; roleName = "Patient"; break;
        case 666: redirectPath = "/admin"; roleName = "Admin"; break;
        default:
          return res.status(403).json({ error: "Unauthorized role. Please contact support." });
      }

      res.json({
        message: "Login successful",
        token,
        redirect: redirectPath,
        user: { userID: user.userID, email: user.email, roleID },
      });
    });
  });
});

// POST: Add medical record
app.post("/post-medical-records", verifyToken, (req, res) => {
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
    oxygenTherapy,
    sensorium
  } = req.body;

  const userID = req.user.userID;
  const roleID = req.user.roleID;

  const sql = `
      INSERT INTO medicalrecords 
      (patientID, heartRate, pulse, height, weight, hurtScale, temperature, currentCondition, SP02, healthStatus, respiratoryRate, bloodPressure, urine, oxygenTherapy, sensorium) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

  db.query(sql, [
    patientID, heartRate, pulse, height, weight, hurtScale, temperature,
    currentCondition, SP02, healthStatus, respiratoryRate, bloodPressure,
    urine, oxygenTherapy, sensorium
  ], (err, result) => {
    if (err) return res.status(500).json({ message: "Server error", error: err });

    res.status(201).json({
      message: "Medical record added successfully",
      recordID: result.insertId,
      addedBy: userID,
      roleID,
    });
  });
});

// Delete nurse
app.delete("/nurses/:nurseID", (req, res) => {
  const nurseID = req.params.nurseID;
  const sql = "DELETE FROM nurse WHERE nurseID = ?";
  db.query(sql, [nurseID], (err, result) => {
    if (err) return res.status(500).json({ message: "Failed to delete nurse", error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Nurse not found" });
    res.status(200).json({ message: "Nurse deleted successfully" });
  });
});

// Delete doctor
app.delete("/doctors/:doctorID", (req, res) => {
  const doctorID = req.params.doctorID;
  const sql = "DELETE FROM doctor WHERE doctorID = ?";
  db.query(sql, [doctorID], (err, result) => {
    if (err) return res.status(500).json({ message: "Failed to delete doctor", error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Doctor not found" });
    res.status(200).json({ message: "Doctor deleted successfully" });
  });
});

// Delete patient
app.delete("/patients/:patientID", (req, res) => {
  const patientID = req.params.patientID;
  const sql = "DELETE FROM patient WHERE patientID = ?";
  db.query(sql, [patientID], (err, result) => {
    if (err) return res.status(500).json({ message: "Failed to delete patient", error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Patient not found" });
    res.status(200).json({ message: "Patient deleted successfully" });
  });
});

// Get patient by userID
app.get('/api/patientByUserID/:userID', (req, res) => {
  const userID = req.params.userID;
  const query = `
    SELECT p.*, u.*
    FROM patient p
    JOIN user u ON p.userID = u.userID
    WHERE p.userID = ?;
  `;
  db.query(query, [userID], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Get schedule of nurse
app.get('/api/schedules/:nurseID', (req, res) => {
  const nurseID = req.params.nurseID;
  const query = `
    SELECT 
        s.scheduleID,
        s.name AS subject,
        s.date,
        s.start_at,
        s.working_hours,
        s.color,
        r.roomID,
        r.location AS room_location
    FROM schedules s
    JOIN room r ON s.roomID = r.roomID
    WHERE s.nurseID = ?
    ORDER BY s.date, s.start_at
  `;
  db.query(query, [nurseID], (err, results) => {
    if (err) return res.status(500).json({ error: 'Internal Server Error' });
    res.json(results);
  });
});

// POST: Add new schedule
app.post('/api/schedules', (req, res) => {
  const {
    scheduleID,
    subject,
    date,
    start_at,
    working_hours,
    color,
    roomID,
    room_location
  } = req.body;

  if (!subject || !date || !start_at || !working_hours || !roomID)
    return res.status(400).json({ message: "Missing required fields" });

  const sql = `
    INSERT INTO schedules 
    (scheduleID, name, date, start_at, working_hours, color, roomID, room_location)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [scheduleID, subject, date, start_at, working_hours, color, roomID, room_location], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    res.status(201).json({
      message: "Schedule added successfully",
      scheduleID: result.insertId || scheduleID,
      data: { scheduleID, subject, date, start_at, working_hours, color, roomID, room_location },
    });
  });
});

// PUT: Edit schedule
app.put('/api/schedules/:id', async (req, res) => {
  try {
    const scheduleID = req.params.id;
    const {
      subject,
      date,
      start_at,
      working_hours,
      color,
      roomID,
      room_location
    } = req.body;

    const [rows] = await db.execute('SELECT * FROM schedules WHERE scheduleID = ?', [scheduleID]);
    if (rows.length === 0) return res.status(404).json({ message: 'Schedule not found' });

    const sql = `
      UPDATE schedules
      SET subject = ?, date = ?, start_at = ?, working_hours = ?, color = ?, roomID = ?, room_location = ?
      WHERE scheduleID = ?
    `;

    await db.execute(sql, [subject, date, start_at, working_hours, color, roomID, room_location, scheduleID]);
    res.json({ message: '✅ Schedule updated successfully', schedule: { scheduleID, ...req.body } });
  } catch (err) {
    console.error('Error updating schedule:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Step 1: Check if email already exists
  db.query("SELECT * FROM user WHERE email = ?", [email], (err, result) => {
    if (err) {
      console.error("Select error:", err);
      return res.status(500).json({ message: "Database error on SELECT" });
    }

    if (result.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Step 2: Insert new user
    db.query(
      "INSERT INTO user (username, email, password) VALUES (?, ?, ?)",
      [username, email, password],
      (err, result) => {
        if (err) {
          console.error("Insert user error:", err);
          return res.status(500).json({ message: "Error inserting user" });
        }

        const userID = result.insertId;

        // Step 3: Assign roleID = 3 (Patient)
        db.query(
          "INSERT INTO userrole (userID, roleID) VALUES (?, ?)",
          [userID, 3],
          (err2) => {
            if (err2) {
              console.error("Insert userRole error:", err2);
              return res.status(500).json({ message: "Error assigning role" });
            }

            // Step 4: Create an empty patient record linked to userID
            db.query(
              "INSERT INTO patient (userID) VALUES (?)",
              [userID],
              (err3) => {
                if (err3) {
                  console.error("Insert patient error:", err3);
                  return res.status(500).json({ message: "Error creating patient" });
                }

                console.log("✅ New patient registered with userID:", userID);
                res.json({ message: "User (Patient) created successfully", userID });
              }
            );
          }
        );
      }
    );
  });
});

// POST: Complete patient information (protected)
app.post("/api/patient/complete", verifyToken, (req, res) => {
  const {
    userID,
    fullName,
    gender,
    dob,
    phone,
    address,
    BHYT,
    relativeName,
    relativeNumber
  } = req.body;

  if (!userID || !fullName || !gender || !dob || !phone || !address) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // First, ensure user table is updated with personal info
  const updateUserSql = `
    UPDATE user
    SET fullName = ?, gender = ?, dob = ?, phone = ?, address = ?
    WHERE userID = ?
  `;

  db.query(updateUserSql, [fullName, gender, dob, phone, address, userID], (err1) => {
    if (err1) return res.status(500).json({ message: "Failed to update user info", error: err1 });

    // Then, either update or insert into patient table
    const updatePatientSql = `
      INSERT INTO patient (userID, BHYT, relativeName, relativeNumber)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        BHYT = VALUES(BHYT),
        relativeName = VALUES(relativeName),
        relativeNumber = VALUES(relativeNumber)
    `;

    db.query(updatePatientSql, [userID, BHYT, relativeName, relativeNumber], (err2) => {
      if (err2) return res.status(500).json({ message: "Failed to save patient info", error: err2 });
      res.status(200).json({ message: "Patient information saved successfully" });
    });
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
