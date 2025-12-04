DROP DATABASE IF EXISTS hospitaldb;
CREATE DATABASE hospitaldb;
USE hospitaldb;

-- ======================
-- Table: user
-- ======================
CREATE TABLE user (
  userID INT NOT NULL,
  username VARCHAR(255),
  password VARCHAR(255) NOT NULL,
  fullName VARCHAR(255) NOT NULL,
  dob DATE,
  phone VARCHAR(15),
  email VARCHAR(255) NOT NULL,
  CCCD VARCHAR(20),
  address VARCHAR(100),
  haveTask DATE,
  gender INT,
  PRIMARY KEY (userID)
);

-- ======================
-- Table: role
-- ======================
CREATE TABLE role (
  roleID INT NOT NULL,
  nameRole VARCHAR(50),
  PRIMARY KEY (roleID)
);

-- ======================
-- Table: userrole
-- ======================
CREATE TABLE userrole (
  userRoleID INT NOT NULL,
  roleID INT,
  userID INT,
  PRIMARY KEY (userRoleID),
  FOREIGN KEY (roleID) REFERENCES role(roleID),
  FOREIGN KEY (userID) REFERENCES user(userID)
);

-- ======================
-- Table: feedback
-- ======================
CREATE TABLE feedback (
  feedBackID INT NOT NULL,
  feedBackForFacility VARCHAR(2000),
  feedBackForDoctor VARCHAR(2000),
  feedBackForNurse VARCHAR(2000),
  PRIMARY KEY (feedBackID)
);

-- ======================
-- Table: room
-- ======================
CREATE TABLE room (
  roomID INT NOT NULL,
  department VARCHAR(100),
  location VARCHAR(255),
  PRIMARY KEY (roomID)
);

-- ======================
-- Table: nurse
-- ======================
CREATE TABLE nurse (
  nurseID INT NOT NULL,
  department VARCHAR(100),
  userID INT,
  roomID INT,
  image VARCHAR(255),
  PRIMARY KEY (nurseID),
  FOREIGN KEY (userID) REFERENCES user(userID),
  FOREIGN KEY (roomID) REFERENCES room(roomID)
);

-- ======================
-- Table: appointment
-- ======================
CREATE TABLE appointment (
  appointmentID INT NOT NULL,
  dateTime DATE,
  location VARCHAR(255),
  appointmentStatus TINYINT DEFAULT 0,
  doctorID INT,
  userID INT,
  PRIMARY KEY (appointmentID),
  FOREIGN KEY (doctorID) REFERENCES doctor(doctorID),
  FOREIGN KEY (userID) REFERENCES user(userID)
);

-- ======================
-- Table: patient
-- ======================
CREATE TABLE patient (
  patientID INT NOT NULL,
  BHYT VARCHAR(100),
  admissionDate TIMESTAMP NULL,
  dischargeDate TIMESTAMP NULL,
  hospitalizationsDiagnosis VARCHAR(2000),
  summaryCondition VARCHAR(2000),
  dischargeDiagnosis VARCHAR(2000),
  relativeName VARCHAR(255),
  relativeNumber INT,
  userID INT NOT NULL,
  appointmentID INT,
  feedBackID INT,
  image VARCHAR(255),
  PRIMARY KEY (patientID),
  FOREIGN KEY (userID) REFERENCES user(userID),
  FOREIGN KEY (appointmentID) REFERENCES appointment(appointmentID),
  FOREIGN KEY (feedBackID) REFERENCES feedback(feedBackID)
);

-- ======================
-- Table: doctor
-- ======================
CREATE TABLE doctor (
  doctorID INT NOT NULL,
  department VARCHAR(100),
  nurseID INT,
  userID INT,
  appointmentID INT,
  requestID INT,
  office VARCHAR(45),
  PRIMARY KEY (doctorID),
  FOREIGN KEY (nurseID) REFERENCES nurse(nurseID),
  FOREIGN KEY (userID) REFERENCES user(userID),
  FOREIGN KEY (appointmentID) REFERENCES appointment(appointmentID),
  FOREIGN KEY (requestID) REFERENCES request(requestID) ON DELETE SET NULL ON UPDATE CASCADE
);

-- ======================
-- Table: medicalrecords
-- ======================
CREATE TABLE medicalrecords (
  recordID INT NOT NULL AUTO_INCREMENT,
  timeCreate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  heartRate INT,
  pulse INT,
  height INT,
  weight INT,
  hurtScale INT,
  temperature VARCHAR(255),
  currentCondition VARCHAR(100),
  SP02 VARCHAR(255),
  healthStatus INT,
  respiratoryRate INT,
  bloodPressure VARCHAR(255),
  urine VARCHAR(255),
  patientID INT,
  sensorium INT,
  oxygenTherapy INT,
  PRIMARY KEY (recordID),
  FOREIGN KEY (patientID) REFERENCES patient(patientID)
);

-- ======================
-- Table: request
-- ======================
CREATE TABLE request (
  requestID INT NOT NULL AUTO_INCREMENT,
  dateTime TIMESTAMP,
  requestContent VARCHAR(1000),
  requestStatus INT,
  nurseID INT,
  doctorID INT,
  requestType INT,
  PRIMARY KEY (requestID),
  FOREIGN KEY (nurseID) REFERENCES nurse(nurseID),
  FOREIGN KEY (doctorID) REFERENCES doctor(doctorID)
);

-- ======================
-- Table: schedules
-- ======================
CREATE TABLE schedules (
  scheduleID INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  date DATE NOT NULL,
  start_at TIME NOT NULL,
  working_hours INT NOT NULL,
  nurseID INT NOT NULL,
  roomID INT NOT NULL,
  color VARCHAR(45),
  PRIMARY KEY (scheduleID),
  FOREIGN KEY (nurseID) REFERENCES nurse(nurseID),
  FOREIGN KEY (roomID) REFERENCES room(roomID)
);

-- ======================
-- Table: nursepatient (Many-to-many)
-- ======================
CREATE TABLE nursepatient (
  nurseID INT NOT NULL,
  patientID INT NOT NULL,
  PRIMARY KEY (nurseID, patientID),
  FOREIGN KEY (nurseID) REFERENCES nurse(nurseID) ON DELETE CASCADE,
  FOREIGN KEY (patientID) REFERENCES patient(patientID) ON DELETE CASCADE
);

-- ======================
-- Table: roompatient (Many-to-many)
-- ======================
CREATE TABLE roompatient (
  roomID INT NOT NULL,
  patientID INT NOT NULL,
  PRIMARY KEY (roomID, patientID),
  FOREIGN KEY (roomID) REFERENCES room(roomID) ON DELETE CASCADE,
  FOREIGN KEY (patientID) REFERENCES patient(patientID) ON DELETE CASCADE
);
