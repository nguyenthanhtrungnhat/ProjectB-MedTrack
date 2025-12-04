-- ------------------------------------------------------
-- Database: hospitaldb
-- ------------------------------------------------------

DROP DATABASE IF EXISTS hospitaldb;
CREATE DATABASE hospitaldb;
USE hospitaldb;

-- ===================== CREATE TABLES WITH PK =====================

-- 1. USER table
CREATE TABLE `user` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fullName` varchar(255) NULL,
  `dob` date DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `CCCD` varchar(20) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `haveTask` date DEFAULT NULL,
  `gender` int DEFAULT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. ROLE table
CREATE TABLE `role` (
  `roleID` int NOT NULL AUTO_INCREMENT,
  `nameRole` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`roleID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. USERROLE table
CREATE TABLE `userrole` (
  `userRoleID` int NOT NULL AUTO_INCREMENT,
  `roleID` int DEFAULT NULL,
  `userID` int DEFAULT NULL,
  PRIMARY KEY (`userRoleID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. ROOM table
CREATE TABLE `room` (
  `roomID` int NOT NULL AUTO_INCREMENT,
  `department` varchar(100) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`roomID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. NURSE table
CREATE TABLE `nurse` (
  `nurseID` int NOT NULL AUTO_INCREMENT,
  `department` varchar(100) DEFAULT NULL,
  `userID` int DEFAULT NULL,
  `roomID` int DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`nurseID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. DOCTOR table
CREATE TABLE `doctor` (
  `doctorID` int NOT NULL AUTO_INCREMENT,
  `department` varchar(100) DEFAULT NULL,
  `nurseID` int DEFAULT NULL,
  `userID` int DEFAULT NULL,
  `requestID` int DEFAULT NULL,
  `office` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`doctorID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. REQUEST table
CREATE TABLE `request` (
  `requestID` int NOT NULL AUTO_INCREMENT,
  `dateTime` timestamp NULL DEFAULT NULL,
  `requestContent` varchar(1000) DEFAULT NULL,
  `requestStatus` int DEFAULT NULL,
  `nurseID` int DEFAULT NULL,
  `doctorID` int DEFAULT NULL,
  `requestType` int DEFAULT NULL,
  PRIMARY KEY (`requestID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 8. FEEDBACK table
CREATE TABLE `feedback` (
  `feedBackID` int NOT NULL AUTO_INCREMENT,
  `feedBackForFacility` varchar(2000) DEFAULT NULL,
  `feedBackForDoctor` varchar(2000) DEFAULT NULL,
  `feedBackForNurse` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`feedBackID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 9. PATIENT table
CREATE TABLE `patient` (
  `patientID` int NOT NULL AUTO_INCREMENT,
  `BHYT` varchar(100) DEFAULT NULL,
  `admissionDate` timestamp NULL DEFAULT NULL,
  `dischargeDate` timestamp NULL DEFAULT NULL,
  `hospitalizationsDiagnosis` varchar(2000) DEFAULT NULL,
  `summaryCondition` varchar(2000) DEFAULT NULL,
  `dischargeDiagnosis` varchar(2000) DEFAULT NULL,
  `relativeName` varchar(255) DEFAULT NULL,
  `relativeNumber` int DEFAULT NULL,
  `userID` int NOT NULL,
  `feedBackID` int DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`patientID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 10. MEDICAL RECORDS table
CREATE TABLE `medicalrecords` (
  `recordID` int NOT NULL AUTO_INCREMENT,
  `timeCreate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `heartRate` int DEFAULT NULL,
  `pulse` int DEFAULT NULL,
  `height` int DEFAULT NULL,
  `weight` int DEFAULT NULL,
  `hurtScale` int DEFAULT NULL,
  `temperature` varchar(255) DEFAULT NULL,
  `currentCondition` varchar(100) DEFAULT NULL,
  `SP02` varchar(255) DEFAULT NULL,
  `healthStatus` int DEFAULT NULL,
  `respiratoryRate` int DEFAULT NULL,
  `bloodPressure` varchar(255) DEFAULT NULL,
  `urine` varchar(255) DEFAULT NULL,
  `patientID` int DEFAULT NULL,
  `sensorium` int DEFAULT NULL,
  `oxygenTherapy` int DEFAULT NULL,
  PRIMARY KEY (`recordID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 11. ROOMPATIENT table
CREATE TABLE `roompatient` (
  `roomID` int NOT NULL,
  `patientID` int NOT NULL,
  PRIMARY KEY (`roomID`,`patientID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 12. NURSEPATIENT table
CREATE TABLE `nursepatient` (
  `nurseID` int NOT NULL,
  `patientID` int NOT NULL,
  PRIMARY KEY (`nurseID`,`patientID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 13. SCHEDULES table
CREATE TABLE `schedules` (
  `scheduleID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `date` date NOT NULL,
  `start_at` time NOT NULL,
  `working_hours` int NOT NULL,
  `nurseID` int NOT NULL,
  `roomID` int NOT NULL,
  `color` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`scheduleID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 14. APPOINTMENT table
CREATE TABLE `appointment` (
  `appointmentID` int NOT NULL AUTO_INCREMENT,
  `dateTime` date DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `appointmentStatus` tinyint DEFAULT '0',
  `doctorID` int DEFAULT NULL,
  `userID` int DEFAULT NULL,
  PRIMARY KEY (`appointmentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 15. NEWS table
SELECT * FROM hospitaldb.news;CREATE TABLE `news` (
  `newID` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `body` varchar(500) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `author` varchar(45) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`newID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ===================== ADD FOREIGN KEYS =====================

ALTER TABLE `userrole`
  ADD CONSTRAINT `userrole_ibfk_1` FOREIGN KEY (`roleID`) REFERENCES `role` (`roleID`),
  ADD CONSTRAINT `userrole_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`);

ALTER TABLE `nurse`
  ADD CONSTRAINT `nurse_ibfk_3` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`),
  ADD CONSTRAINT `nurse_ibfk_4` FOREIGN KEY (`roomID`) REFERENCES `room` (`roomID`);

ALTER TABLE `doctor`
  ADD CONSTRAINT `doctor_ibfk_1` FOREIGN KEY (`nurseID`) REFERENCES `nurse` (`nurseID`),
  ADD CONSTRAINT `doctor_ibfk_3` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`),
  ADD CONSTRAINT `fk_doctor_request` FOREIGN KEY (`requestID`) REFERENCES `request` (`requestID`) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `request`
  ADD CONSTRAINT `request_ibfk_1` FOREIGN KEY (`nurseID`) REFERENCES `nurse` (`nurseID`),
  ADD CONSTRAINT `request_ibfk_2` FOREIGN KEY (`doctorID`) REFERENCES `doctor` (`doctorID`);

ALTER TABLE `patient`
  ADD CONSTRAINT `patient_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`),
  ADD CONSTRAINT `patient_ibfk_7` FOREIGN KEY (`feedBackID`) REFERENCES `feedback` (`feedBackID`);

ALTER TABLE `medicalrecords`
  ADD CONSTRAINT `fk_patient` FOREIGN KEY (`patientID`) REFERENCES `patient` (`patientID`);

ALTER TABLE `roompatient`
  ADD CONSTRAINT `roompatient_ibfk_1` FOREIGN KEY (`roomID`) REFERENCES `room` (`roomID`) ON DELETE CASCADE,
  ADD CONSTRAINT `roompatient_ibfk_2` FOREIGN KEY (`patientID`) REFERENCES `patient` (`patientID`) ON DELETE CASCADE;

ALTER TABLE `nursepatient`
  ADD CONSTRAINT `nursepatient_ibfk_1` FOREIGN KEY (`nurseID`) REFERENCES `nurse` (`nurseID`) ON DELETE CASCADE,
  ADD CONSTRAINT `nursepatient_ibfk_2` FOREIGN KEY (`patientID`) REFERENCES `patient` (`patientID`) ON DELETE CASCADE;

ALTER TABLE `schedules`
  ADD CONSTRAINT `schedules_ibfk_1` FOREIGN KEY (`nurseID`) REFERENCES `nurse` (`nurseID`),
  ADD CONSTRAINT `schedules_ibfk_2` FOREIGN KEY (`roomID`) REFERENCES `room` (`roomID`);

ALTER TABLE `appointment`
  ADD CONSTRAINT `appointment_ibfk_1` FOREIGN KEY (`doctorID`) REFERENCES `doctor` (`doctorID`),
  ADD CONSTRAINT `appointment_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`);

-- ===================== INSERT DATA =====================

-- 1. USER table
INSERT INTO `user` (`userID`,`username`,`password`,`fullName`,`dob`,`phone`,`email`,`CCCD`,`address`,`haveTask`,`gender`) VALUES
(1,'nguyen thanh trung nhat','1','nguyen thanh trung nhat','1999-02-28','0922639956','nhat@gmail.com','1212312312312','28/17 khu 5 p. Binh Duong tp. HCM',NULL,1),
(2,'Phan dinh hieu thao','1','Phan dinh hieu thao','1999-02-28','13123','thao@gmail.com','123123','23123',NULL,1),
(3,'Huyen Thanh','1','Huyen Thanh','1999-11-01','1231231231','huyen@gmail.com','123','13123',NULL,2),
(4,'Phu Tan','1','Dang Phu Tan',NULL,NULL,'tan@gmail.com',NULL,NULL,NULL,NULL);

-- 2. ROLE table
INSERT INTO `role` (`roleID`,`nameRole`) VALUES 
(1,'Doctor'),(2,'Nurse'),(3,'Patient'),(666,'Admin');

-- 3. USERROLE table
INSERT INTO `userrole` (`userRoleID`,`roleID`,`userID`) VALUES
(1,1,1),
(2,2,2),
(3,3,3),
(4,666,4);

-- 4. ROOM table
INSERT INTO `room` (`roomID`,`department`,`location`) VALUES
(1,'Internal Medicine','208B11');

-- 5. NURSE table
INSERT INTO `nurse` (`nurseID`,`department`,`userID`,`roomID`,`image`) VALUES
(1,'Internal Medicine',1,1,'https://tse4.mm.bing.net/th/id/OIP.I4ONtW54x0A04VokgBzbTgHaHo');

-- 6. DOCTOR table
INSERT INTO `doctor` (`doctorID`,`department`,`nurseID`,`userID`,`requestID`,`office`) VALUES
(1,NULL,NULL,4,NULL,'301B10');

-- 7. REQUEST table
INSERT INTO `request` (`requestID`,`dateTime`,`requestContent`,`requestStatus`,`nurseID`,`doctorID`,`requestType`) VALUES
(1,'2025-10-20 09:00:00','Sample request',0,1,1,1);

-- 8. FEEDBACK table
INSERT INTO `feedback` (`feedBackID`,`feedBackForFacility`,`feedBackForDoctor`,`feedBackForNurse`) VALUES
(1,'Good service','Good doctor','Good nurse'),
(2,'Average facility','Average doctor','Average nurse'),
(3,'Poor service','Poor doctor','Poor nurse');

-- 9. PATIENT table
INSERT INTO `patient` (`patientID`,`BHYT`,`admissionDate`,`dischargeDate`,`hospitalizationsDiagnosis`,`summaryCondition`,`dischargeDiagnosis`,`relativeName`,`relativeNumber`,`userID`,`feedBackID`,`image`) VALUES
(1,'123123123123','1999-02-27 17:00:00','1999-02-27 17:00:00','asdadasd','asdasdasd','asdasdasda','adasd',12312,2,2,'img'),
(2,'1231313123','1999-02-27 17:00:00','1999-02-27 17:00:00','asdasdaadsadasd','asdad','asdasdasd','asdasd',2323,3,3,NULL);

-- 10. MEDICAL RECORDS table
INSERT INTO `medicalrecords` (`recordID`,`timeCreate`,`heartRate`,`pulse`,`height`,`weight`,`hurtScale`,`temperature`,`currentCondition`,`SP02`,`healthStatus`,`respiratoryRate`,`bloodPressure`,`urine`,`patientID`,`sensorium`,`oxygenTherapy`) VALUES
(37,'2025-10-20 16:31:11',140,76,175,75,0,'34','','90',1,55,'140/76','0',1,1,20);

-- 11. ROOMPATIENT table
INSERT INTO `roompatient` (`roomID`,`patientID`) VALUES
(1,1),
(1,2);

-- 12. NURSEPATIENT table
INSERT INTO `nursepatient` (`nurseID`,`patientID`) VALUES
(1,1),
(1,2);

-- 13. SCHEDULES table
INSERT INTO `schedules` (`scheduleID`,`name`,`date`,`start_at`,`working_hours`,`nurseID`,`roomID`,`color`) VALUES
(1,'sdadasd','2025-10-20','22:00:00',3,1,1,'pink'),
(2,'AI','2025-10-21','09:30:00',2,1,1,'green');

-- 14. APPOINTMENT table
INSERT INTO `appointment` (`appointmentID`,`dateTime`,`location`,`appointmentStatus`,`doctorID`,`userID`) VALUES
(1,'2025-10-22','208B11',0,1,2),
(2,'2025-10-23','208B11',0,1,3);
