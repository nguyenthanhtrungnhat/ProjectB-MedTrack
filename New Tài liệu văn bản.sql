CREATE DATABASE hospitaldb;
USE hospitaldb;

-- ======================================
-- Disable foreign key checks
-- ======================================
SET FOREIGN_KEY_CHECKS = 0;

-- ======================================
-- 1. CREATE TABLES (with AUTO_INCREMENT)
-- ======================================

CREATE TABLE `role` (
  `roleID` INT NOT NULL AUTO_INCREMENT,
  `nameRole` VARCHAR(50) DEFAULT NULL,
  PRIMARY KEY (`roleID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `user` (
  `userID` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) DEFAULT NULL,
  `password` VARCHAR(255) DEFAULT NULL COMMENT 'Stored as plain text (NOT hashed)',
  `fullName` VARCHAR(255) DEFAULT NULL,
  `dob` DATE DEFAULT NULL,
  `phone` VARCHAR(15) DEFAULT NULL,
  `email` VARCHAR(255) DEFAULT NULL,
  `CCCD` VARCHAR(20) DEFAULT NULL,
  `address` VARCHAR(100) DEFAULT NULL,
  `haveTask` DATE DEFAULT NULL,
  `gender` INT DEFAULT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `room` (
  `roomID` INT NOT NULL AUTO_INCREMENT,
  `department` VARCHAR(100) DEFAULT NULL,
  `location` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (`roomID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `nurse` (
  `nurseID` INT NOT NULL AUTO_INCREMENT,
  `department` VARCHAR(100) DEFAULT NULL,
  `userID` INT DEFAULT NULL,
  `roomID` INT DEFAULT NULL,
  `image` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (`nurseID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `doctor` (
  `doctorID` INT NOT NULL AUTO_INCREMENT,
  `department` VARCHAR(100) DEFAULT NULL,
  `nurseID` INT DEFAULT NULL,
  `userID` INT DEFAULT NULL,
  `appointmentID` INT DEFAULT NULL,
  `requestID` INT DEFAULT NULL,
  PRIMARY KEY (`doctorID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `feedback` (
  `feedBackID` INT NOT NULL AUTO_INCREMENT,
  `feedBackForFacility` VARCHAR(2000) DEFAULT NULL,
  `feedBackForDoctor` VARCHAR(2000) DEFAULT NULL,
  `feedBackForNurse` VARCHAR(2000) DEFAULT NULL,
  PRIMARY KEY (`feedBackID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `patient` (
  `patientID` INT NOT NULL AUTO_INCREMENT,
  `BHYT` VARCHAR(100) DEFAULT NULL,
  `admissionDate` TIMESTAMP NULL DEFAULT NULL,
  `dischargeDate` TIMESTAMP NULL DEFAULT NULL,
  `hospitalizationsDiagnosis` VARCHAR(2000) DEFAULT NULL,
  `summaryCondition` VARCHAR(2000) DEFAULT NULL,
  `dischargeDiagnosis` VARCHAR(2000) DEFAULT NULL,
  `relativeName` VARCHAR(255) DEFAULT NULL,
  `relativeNumber` INT DEFAULT NULL,
  `userID` INT DEFAULT NULL,
  `appointmentID` INT DEFAULT NULL,
  `feedBackID` INT DEFAULT NULL,
  `image` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (`patientID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `appointment` (
  `appointmentID` INT NOT NULL AUTO_INCREMENT,
  `dateTime` TIMESTAMP NULL DEFAULT NULL,
  `location` VARCHAR(255) DEFAULT NULL,
  `appointmentStatus` INT DEFAULT NULL,
  `doctorID` INT DEFAULT NULL,
  `patientID` INT DEFAULT NULL,
  PRIMARY KEY (`appointmentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `request` (
  `requestID` INT NOT NULL AUTO_INCREMENT,
  `dateTime` TIMESTAMP NULL DEFAULT NULL,
  `requestContent` VARCHAR(1000) DEFAULT NULL,
  `requestStatus` INT DEFAULT NULL,
  `nurseID` INT DEFAULT NULL,
  `doctorID` INT DEFAULT NULL,
  `requestType` INT DEFAULT NULL,
  PRIMARY KEY (`requestID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `medicalrecords` (
  `recordID` INT NOT NULL AUTO_INCREMENT,
  `timeCreate` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `heartRate` INT DEFAULT NULL,
  `pulse` INT DEFAULT NULL,
  `height` INT DEFAULT NULL,
  `weight` INT DEFAULT NULL,
  `hurtScale` INT DEFAULT NULL,
  `temperature` VARCHAR(255) DEFAULT NULL,
  `currentCondition` VARCHAR(100) DEFAULT NULL,
  `SP02` VARCHAR(255) DEFAULT NULL,
  `healthStatus` INT DEFAULT NULL,
  `respiratoryRate` INT DEFAULT NULL,
  `bloodPressure` VARCHAR(255) DEFAULT NULL,
  `urine` VARCHAR(255) DEFAULT NULL,
  `patientID` INT DEFAULT NULL,
  `sensorium` INT DEFAULT NULL,
  `oxygenTherapy` INT DEFAULT NULL,
  PRIMARY KEY (`recordID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `schedules` (
  `scheduleID` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `date` DATE NOT NULL,
  `start_at` TIME NOT NULL,
  `working_hours` INT NOT NULL,
  `nurseID` INT NOT NULL,
  `roomID` INT NOT NULL,
  `color` VARCHAR(45) DEFAULT NULL,
  PRIMARY KEY (`scheduleID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `roompatient` (
  `roomID` INT NOT NULL,
  `patientID` INT NOT NULL,
  PRIMARY KEY (`roomID`,`patientID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `nursepatient` (
  `nurseID` INT NOT NULL,
  `patientID` INT NOT NULL,
  PRIMARY KEY (`nurseID`,`patientID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `userrole` (
  `userRoleID` INT NOT NULL AUTO_INCREMENT,
  `roleID` INT DEFAULT NULL,
  `userID` INT DEFAULT NULL,
  PRIMARY KEY (`userRoleID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ======================================
-- 2. INSERT DATA
-- ======================================

INSERT INTO `role` VALUES 
(1,'Doctor'),
(2,'Nurse'),
(3,'Patient'),
(666,'Admin');

INSERT INTO `user` (`username`, `password`, `fullName`, `dob`, `phone`, `email`, `CCCD`, `address`, `gender`) VALUES
('nguyen thanh trung nhat','1','nguyen thanh trung nhat','1999-02-28','0922639956','nhat@gmail.com','1212312312312','28/17 khu 5 p. Binh Duong tp. HCM',1),
('Phan dinh hieu thao','1','Phan dinh hieu thao','1999-02-28','13123','thao@gmail.com','123123','23123',1);

INSERT INTO `room` VALUES (1,'Internal Medicine','208B11');

INSERT INTO `nurse` VALUES (1,'Internal Medicine',1,1,'https://tse4.mm.bing.net/th/id/OIP.I4ONtW54x0A04VokgBzbTgHaHo'),
(2,'Cardiology',2,1,'https://example.com/nurse2.jpg');

INSERT INTO `doctor` VALUES (1,'Internal Medicine',1,1,NULL,NULL);

INSERT INTO `feedback` VALUES (1,NULL,NULL,NULL);

INSERT INTO `patient` VALUES (1,'123123123123','1999-02-27 17:00:00','1999-02-27 17:00:00','asdadasd','asdasdasd','asdasdasda','adasd',12312,2,NULL,NULL,'https://tse4.mm.bing.net/th/id/OIP.I4ONtW54x0A04VokgBzbTgHaHo');

INSERT INTO `appointment` VALUES (1,NULL,NULL,NULL,1,1);

INSERT INTO `request` VALUES (1,NULL,NULL,NULL,1,1,NULL);

INSERT INTO `medicalrecords` VALUES (37,'2025-10-20 16:31:11',140,76,175,75,0,'34','','90',1,55,'140/76','0',1,1,20);

INSERT INTO `schedules` VALUES (1,'sdadasd','2025-10-20','22:00:00',3,1,1,'pink');

INSERT INTO `roompatient` VALUES (1,1);

INSERT INTO `nursepatient` VALUES (1,1);

INSERT INTO `userrole` VALUES (1,2,1),(2,3,2);

-- ======================================
-- 3. ADD FOREIGN KEYS
-- ======================================

ALTER TABLE `nurse` 
  ADD CONSTRAINT `nurse_ibfk_user` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`),
  ADD CONSTRAINT `nurse_ibfk_room` FOREIGN KEY (`roomID`) REFERENCES `room` (`roomID`);

ALTER TABLE `doctor` 
  ADD CONSTRAINT `doctor_ibfk_nurse` FOREIGN KEY (`nurseID`) REFERENCES `nurse` (`nurseID`),
  ADD CONSTRAINT `doctor_ibfk_user` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`);

ALTER TABLE `appointment` 
  ADD CONSTRAINT `appointment_ibfk_doctor` FOREIGN KEY (`doctorID`) REFERENCES `doctor` (`doctorID`),
  ADD CONSTRAINT `appointment_ibfk_patient` FOREIGN KEY (`patientID`) REFERENCES `patient` (`patientID`);

ALTER TABLE `patient` 
  ADD CONSTRAINT `patient_ibfk_user` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`),
  ADD CONSTRAINT `patient_ibfk_feedback` FOREIGN KEY (`feedBackID`) REFERENCES `feedback` (`feedBackID`);

ALTER TABLE `medicalrecords` 
  ADD CONSTRAINT `medicalrecords_ibfk_patient` FOREIGN KEY (`patientID`) REFERENCES `patient` (`patientID`);

ALTER TABLE `schedules`
  ADD CONSTRAINT `schedules_ibfk_nurse` FOREIGN KEY (`nurseID`) REFERENCES `nurse` (`nurseID`),
  ADD CONSTRAINT `schedules_ibfk_room` FOREIGN KEY (`roomID`) REFERENCES `room` (`roomID`);

ALTER TABLE `roompatient`
  ADD CONSTRAINT `roompatient_ibfk_room` FOREIGN KEY (`roomID`) REFERENCES `room` (`roomID`) ON DELETE CASCADE,
  ADD CONSTRAINT `roompatient_ibfk_patient` FOREIGN KEY (`patientID`) REFERENCES `patient` (`patientID`) ON DELETE CASCADE;

ALTER TABLE `nursepatient`
  ADD CONSTRAINT `nursepatient_ibfk_nurse` FOREIGN KEY (`nurseID`) REFERENCES `nurse` (`nurseID`) ON DELETE CASCADE,
  ADD CONSTRAINT `nursepatient_ibfk_patient` FOREIGN KEY (`patientID`) REFERENCES `patient` (`patientID`) ON DELETE CASCADE;

ALTER TABLE `userrole`
  ADD CONSTRAINT `userrole_ibfk_role` FOREIGN KEY (`roleID`) REFERENCES `role` (`roleID`),
  ADD CONSTRAINT `userrole_ibfk_user` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`);

-- ======================================
-- Enable foreign key checks
-- ======================================
SET FOREIGN_KEY_CHECKS = 1;
