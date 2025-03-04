const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({ path: "JWT.env" }); // Load environment variables

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

const SECRET_KEY = process.env.SECRET_KEY || "default_secret"; // Ensure SECRET_KEY is defined

// Create MySQL connection
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "nhat123A@",
  database: "HospitalDB",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Check database connection
db.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }
  console.log("Connected to the database");
  connection.release();
});

// Generic function to fetch all records safely
const getAllRecords = (tableName, res) => {
  const validTables = [
    "Nurse",
    "Doctor",
    "MedicalRecords",
    "Patient",
    "Room",
    "Request",
    "User",
    "Appointment",
    "Role",
    "UserRole",
    "Feedback",
  ];
  
  if (!validTables.includes(tableName)) {
    return res.status(400).json({ error: "Invalid table name" });
  }

  const query = `SELECT * FROM ??`; // Prevents SQL injection
  db.query(query, [tableName], (err, results) => {
    if (err) {
      res.status(500).json({ error: `Failed to retrieve records from ${tableName}`, details: err });
    } else {
      res.status(200).json(results);
    }
  });
};

// API routes for tables
app.get("/nurses", (req, res) => getAllRecords("Nurse", res));
app.get("/doctors", (req, res) => getAllRecords("Doctor", res));
// ... (Keep other API routes as they are)

// Middleware for authentication
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided." });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden: Invalid token." });
    }
    req.user = user;
    next();
  });
};

// 🛑 Secure Login API (Fix password comparison)
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email and password are required" });

  const query = "SELECT * FROM User WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).json({ error: "Internal server error", details: err });
    if (results.length === 0) return res.status(401).json({ error: "Invalid email or password" });

    const user = results[0];

    // Compare hashed password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) return res.status(401).json({ error: "Invalid email or password" });

      // Get user role
      db.query("SELECT roleID FROM UserRole WHERE userID = ?", [user.userID], (err, roleResults) => {
        if (err) return res.status(500).json({ error: "Internal server error", details: err });
        if (roleResults.length === 0) return res.status(401).json({ error: "Role not found" });

        const roleID = roleResults[0].roleID;
        const token = jwt.sign({ userID: user.userID, roleID }, SECRET_KEY, { expiresIn: "1h" });

        res.json({
          message: "Login successful",
          token,
          user: { userID: user.userID, email: user.email, roleID },
        });
      });
    });
  });
});

// ✅ Secure Shift Change Request API
app.post("/requestShiftChange", authenticateToken, (req, res) => {
  const { dateTime, requestContent, requestStatus, nurseID, doctorID, requestType } = req.body;

  if (!dateTime || !requestContent || !nurseID) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  const query = `
      INSERT INTO shift_requests (dateTime, requestContent, requestStatus, nurseID, doctorID, requestType)
      VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [dateTime, requestContent, requestStatus, nurseID, doctorID, requestType];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Internal server error", details: err });
    }
    if (result.affectedRows > 0) {
      return res.status(201).json({ message: "Shift change request submitted successfully." });
    } else {
      return res.status(500).json({ message: "Failed to submit request." });
    }
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
