const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
require("dotenv").config({ path: "JWT.env" });

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
// Generic function to fetch all records from a table
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
// API routes for each table
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
// Get patient by nurseID
app.get("/nursepatient/:nurseID", (req, res) => {
  const { nurseID } = req.params;

  const query = `
    SELECT np.*
    FROM nursepatient np
    WHERE nurseID = ?;
  `;

  db.query(query, [nurseID], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error", details: err });
    if (results.length === 0) return res.status(404).json({ error: "No patients found for this nurse" });

    res.json(results); // ✅ Return full list of patients
  });
});

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

// Get full nurse details by userID
app.get("/nurses/by-user/:userID", (req, res) => {
  const { userID } = req.params;

  const query = `
    SELECT n.*, u.*
    FROM Nurse n
    JOIN User u ON n.userID = u.userID
    WHERE n.userID = ?;
  `;

  db.query(query, [userID], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error", details: err });
    if (results.length === 0) return res.status(404).json({ error: "Nurse not found" });

    res.json(results[0]); // Send full nurse data
  });
});

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

    res.json(results);  // return all records
  });
});

// GET: Get medical record by recordID
app.get('/medical-records/by-recordId/:recordID', (req, res) => {
  const recordID = parseInt(req.params.recordID);

  if (isNaN(recordID)) {
    return res.status(400).json({ error: 'Invalid recordID' });
  }

  const query = 'SELECT * FROM MEDICALRECORDS WHERE recordID = ?';

  db.query(query, [recordID], (err, results) => {
    if (err) {
      console.error('Query error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Record not found' });
    }

    res.json(results[0]);
  });
});

//login API
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email and password are required" });

  // Check if the user exists
  const query = "SELECT * FROM user WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (results.length === 0) {
      console.log(`Failed login attempt for email: ${email}`);
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = results[0];

    // Compare plaintext password
    if (password !== user.password) {
      console.log(`Failed login attempt for email: ${email}`);
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Get user role from userRole table
    db.query("SELECT roleID FROM userRole WHERE userID = ?", [user.userID], (err, roleResults) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      if (roleResults.length === 0) {
        return res.status(401).json({ error: "Role not found" });
      }

      const roleID = roleResults[0].roleID;
      const token = jwt.sign({ userID: user.userID, roleID }, "secretkey", { expiresIn: "1h" });

      console.log(`User logged in successfully: ${user.email} (ID: ${user.userID}, Role: ${roleID})`);

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

// Shift change request
app.post("/requestShiftChange", (req, res) => {
  const { dateTime, requestContent, nurseID, requestType } = req.body;

  if (!dateTime || !requestContent || !nurseID) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const query = "INSERT INTO request (dateTime, requestContent, nurseID, requestType) VALUES (?, ?, ?, ?)";
  db.query(query, [dateTime, requestContent, nurseID, requestType], (err, result) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).json({ message: "Server error" });
    }
    res.status(201).json({ message: "Shift change request submitted successfully", requestID: result.insertId });
  });
});

// API POST để thêm dữ liệu vào bảng MedicalRecords
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
    }
  );
});

//delete nurse by nurseID
app.delete("/nurses/:nurseID", (req, res) => {
  const nurseID = req.params.nurseID;

  console.log("Attempting to delete nurse with ID:", nurseID);  // Debugging log

  const sql = "DELETE FROM nurse WHERE nurseID = ?";

  db.query(sql, [nurseID], (err, result) => {
    if (err) {
      console.error("Database error:", err);  // Log the exact MySQL error
      return res.status(500).json({ message: "Failed to delete nurse", error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Nurse not found" });
    }
    res.status(200).json({ message: "Nurse deleted successfully" });
  });
});
//delete doctor by doctorID
app.delete("/doctors/:doctorID", (req, res) => {
  const nurseID = req.params.nurseID;

  console.log("Attempting to delete doctor with ID:", doctorID);  // Debugging log

  const sql = "DELETE FROM doctor WHERE doctorID = ?";

  db.query(sql, [doctorID], (err, result) => {
    if (err) {
      console.error("Database error:", err);  // Log the exact MySQL error
      return res.status(500).json({ message: "Failed to delete doctor", error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({ message: "Doctor deleted successfully" });
  });
});
//delete patient by doctorID
app.delete("/patients/:patientID", (req, res) => {
  const nurseID = req.params.nurseID;

  console.log("Attempting to delete patient with ID:", patientID);  // Debugging log

  const sql = "DELETE FROM patient WHERE patientID = ?";

  db.query(sql, [patientID], (err, result) => {
    if (err) {
      console.error("Database error:", err);  // Log the exact MySQL error
      return res.status(500).json({ message: "Failed to delete patient", error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json({ message: "Patient deleted successfully" });
  });
});
// Update user by ID
app.put("/users/:id", (req, res) => {
  const userID = req.params.id;
  let {
      username,
      password,
      fullName,
      dob,
      phone,
      email,
      CCCD,
      address,
      haveTask,
      gender
  } = req.body;

  // Convert date fields from ISO to MySQL format (YYYY-MM-DD HH:MM:SS)
  const formatDate = (isoDate) => {
      if (!isoDate) return null; // Handle null cases
      const date = new Date(isoDate);
      return date.toISOString().slice(0, 19).replace("T", " "); // Convert to MySQL DATETIME format
  };

  dob = formatDate(dob);
  haveTask = formatDate(haveTask);

  const sql = `
      UPDATE user
      SET username = ?, password = ?, fullName = ?, dob = ?, phone = ?, 
          email = ?, CCCD = ?, address = ?, haveTask = ?, gender = ? 
      WHERE userID = ?`;

  db.query(
      sql,
      [username, password, fullName, dob, phone, email, CCCD, address, haveTask, gender, userID],
      (err, result) => {
          if (err) {
              console.error("Error updating user:", err);
              return res.status(500).json({ error: "Failed to update user" });
          }
          if (result.affectedRows === 0) {
              return res.status(404).json({ error: "User not found" });
          }
          console.log(result);
          res.json({ message: "User updated successfully!" });
      }
  );
});
// get patient by userID
app.get('/api/patientByUserID/:userID', (req, res) => {
  const userID = req.params.userID;
  // const query = "SELECT * FROM patient WHERE userID = ?";
  const query = `
  SELECT p.*, u.*
  FROM Patient p
  JOIN User u ON p.userID = u.userID
  WHERE p.userID = ?;
`;
  db.query(query, [userID], (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json(results);
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
