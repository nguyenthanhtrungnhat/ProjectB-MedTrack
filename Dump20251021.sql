CREATE DATABASE  IF NOT EXISTS `hospitaldb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `hospitaldb`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: hospitaldb
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `appointment`
--

DROP TABLE IF EXISTS `appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointment` (
  `appointmentID` int NOT NULL,
  `dateTime` timestamp NULL DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `appointmentStatus` int DEFAULT NULL,
  `doctorID` int DEFAULT NULL,
  `patientID` int DEFAULT NULL,
  PRIMARY KEY (`appointmentID`),
  KEY `doctorID` (`doctorID`),
  KEY `patientID` (`patientID`),
  CONSTRAINT `appointment_ibfk_1` FOREIGN KEY (`doctorID`) REFERENCES `doctor` (`doctorID`),
  CONSTRAINT `appointment_ibfk_2` FOREIGN KEY (`patientID`) REFERENCES `patient` (`patientID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointment`
--

LOCK TABLES `appointment` WRITE;
/*!40000 ALTER TABLE `appointment` DISABLE KEYS */;
/*!40000 ALTER TABLE `appointment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor`
--

DROP TABLE IF EXISTS `doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor` (
  `doctorID` int NOT NULL,
  `department` varchar(100) DEFAULT NULL,
  `nurseID` int DEFAULT NULL,
  `userID` int DEFAULT NULL,
  `appointmentID` int DEFAULT NULL,
  `requestID` int DEFAULT NULL,
  PRIMARY KEY (`doctorID`),
  KEY `nurseID` (`nurseID`),
  KEY `userID` (`userID`),
  KEY `appointmentID` (`appointmentID`),
  KEY `fk_doctor_request` (`requestID`),
  CONSTRAINT `doctor_ibfk_1` FOREIGN KEY (`nurseID`) REFERENCES `nurse` (`nurseID`),
  CONSTRAINT `doctor_ibfk_3` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`),
  CONSTRAINT `doctor_ibfk_4` FOREIGN KEY (`appointmentID`) REFERENCES `appointment` (`appointmentID`),
  CONSTRAINT `fk_doctor_request` FOREIGN KEY (`requestID`) REFERENCES `request` (`requestID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor`
--

LOCK TABLES `doctor` WRITE;
/*!40000 ALTER TABLE `doctor` DISABLE KEYS */;
/*!40000 ALTER TABLE `doctor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `feedBackID` int NOT NULL,
  `feedBackForFacility` varchar(2000) DEFAULT NULL,
  `feedBackForDoctor` varchar(2000) DEFAULT NULL,
  `feedBackForNurse` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`feedBackID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicalrecords`
--

DROP TABLE IF EXISTS `medicalrecords`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
  PRIMARY KEY (`recordID`),
  KEY `fk_patient` (`patientID`),
  CONSTRAINT `fk_patient` FOREIGN KEY (`patientID`) REFERENCES `patient` (`patientID`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicalrecords`
--

LOCK TABLES `medicalrecords` WRITE;
/*!40000 ALTER TABLE `medicalrecords` DISABLE KEYS */;
INSERT INTO `medicalrecords` VALUES (37,'2025-10-20 16:31:11',140,76,175,75,0,'34','','90',1,55,'140/76','0',1,1,20);
/*!40000 ALTER TABLE `medicalrecords` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nurse`
--

DROP TABLE IF EXISTS `nurse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nurse` (
  `nurseID` int NOT NULL,
  `department` varchar(100) DEFAULT NULL,
  `userID` int DEFAULT NULL,
  `roomID` int DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`nurseID`),
  KEY `userID` (`userID`),
  KEY `roomID` (`roomID`),
  CONSTRAINT `nurse_ibfk_3` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`),
  CONSTRAINT `nurse_ibfk_4` FOREIGN KEY (`roomID`) REFERENCES `room` (`roomID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nurse`
--

LOCK TABLES `nurse` WRITE;
/*!40000 ALTER TABLE `nurse` DISABLE KEYS */;
INSERT INTO `nurse` VALUES (1,'Internal Medicine',1,1,'https://tse4.mm.bing.net/th/id/OIP.I4ONtW54x0A04VokgBzbTgHaHo?cb=12ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3');
/*!40000 ALTER TABLE `nurse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nursepatient`
--

DROP TABLE IF EXISTS `nursepatient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nursepatient` (
  `nurseID` int NOT NULL,
  `patientID` int NOT NULL,
  PRIMARY KEY (`nurseID`,`patientID`),
  KEY `patientID` (`patientID`),
  CONSTRAINT `nursepatient_ibfk_1` FOREIGN KEY (`nurseID`) REFERENCES `nurse` (`nurseID`) ON DELETE CASCADE,
  CONSTRAINT `nursepatient_ibfk_2` FOREIGN KEY (`patientID`) REFERENCES `patient` (`patientID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nursepatient`
--

LOCK TABLES `nursepatient` WRITE;
/*!40000 ALTER TABLE `nursepatient` DISABLE KEYS */;
/*!40000 ALTER TABLE `nursepatient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient` (
  `patientID` int NOT NULL,
  `BHYT` varchar(100) DEFAULT NULL,
  `admissionDate` timestamp NULL DEFAULT NULL,
  `dischargeDate` timestamp NULL DEFAULT NULL,
  `hospitalizationsDiagnosis` varchar(2000) DEFAULT NULL,
  `summaryCondition` varchar(2000) DEFAULT NULL,
  `dischargeDiagnosis` varchar(2000) DEFAULT NULL,
  `relativeName` varchar(255) DEFAULT NULL,
  `relativeNumber` int DEFAULT NULL,
  `userID` int DEFAULT NULL,
  `appointmentID` int DEFAULT NULL,
  `feedBackID` int DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`patientID`),
  KEY `userID` (`userID`),
  KEY `appointmentID` (`appointmentID`),
  KEY `feedBackID` (`feedBackID`),
  CONSTRAINT `patient_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`),
  CONSTRAINT `patient_ibfk_3` FOREIGN KEY (`appointmentID`) REFERENCES `appointment` (`appointmentID`),
  CONSTRAINT `patient_ibfk_7` FOREIGN KEY (`feedBackID`) REFERENCES `feedback` (`feedBackID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
INSERT INTO `patient` VALUES (1,'123123123123','1999-02-27 17:00:00','1999-02-27 17:00:00','asdadasd','asdasdasd','asdasdasda','adasd',12312,2,NULL,NULL,'https://tse4.mm.bing.net/th/id/OIP.I4ONtW54x0A04VokgBzbTgHaHo?cb=12ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3');
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request`
--

DROP TABLE IF EXISTS `request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `request` (
  `requestID` int NOT NULL AUTO_INCREMENT,
  `dateTime` timestamp NULL DEFAULT NULL,
  `requestContent` varchar(1000) DEFAULT NULL,
  `requestStatus` int DEFAULT NULL,
  `nurseID` int DEFAULT NULL,
  `doctorID` int DEFAULT NULL,
  `requestType` int DEFAULT NULL,
  PRIMARY KEY (`requestID`),
  KEY `nurseID` (`nurseID`),
  KEY `doctorID` (`doctorID`),
  CONSTRAINT `request_ibfk_1` FOREIGN KEY (`nurseID`) REFERENCES `nurse` (`nurseID`),
  CONSTRAINT `request_ibfk_2` FOREIGN KEY (`doctorID`) REFERENCES `doctor` (`doctorID`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request`
--

LOCK TABLES `request` WRITE;
/*!40000 ALTER TABLE `request` DISABLE KEYS */;
/*!40000 ALTER TABLE `request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `roleID` int NOT NULL,
  `nameRole` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`roleID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Doctor'),(2,'Nurse'),(3,'Patient'),(666,'Admin');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `roomID` int NOT NULL,
  `department` varchar(100) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`roomID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (1,'Internal Medicine','208B11');
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roompatient`
--

DROP TABLE IF EXISTS `roompatient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roompatient` (
  `roomID` int NOT NULL,
  `patientID` int NOT NULL,
  PRIMARY KEY (`roomID`,`patientID`),
  KEY `patientID` (`patientID`),
  CONSTRAINT `roompatient_ibfk_1` FOREIGN KEY (`roomID`) REFERENCES `room` (`roomID`) ON DELETE CASCADE,
  CONSTRAINT `roompatient_ibfk_2` FOREIGN KEY (`patientID`) REFERENCES `patient` (`patientID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roompatient`
--

LOCK TABLES `roompatient` WRITE;
/*!40000 ALTER TABLE `roompatient` DISABLE KEYS */;
INSERT INTO `roompatient` VALUES (1,1);
/*!40000 ALTER TABLE `roompatient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedules`
--

DROP TABLE IF EXISTS `schedules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedules` (
  `scheduleID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `date` date NOT NULL,
  `start_at` time NOT NULL,
  `working_hours` int NOT NULL,
  `nurseID` int NOT NULL,
  `roomID` int NOT NULL,
  `color` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`scheduleID`),
  KEY `nurseID` (`nurseID`),
  KEY `roomID` (`roomID`),
  CONSTRAINT `schedules_ibfk_1` FOREIGN KEY (`nurseID`) REFERENCES `nurse` (`nurseID`),
  CONSTRAINT `schedules_ibfk_2` FOREIGN KEY (`roomID`) REFERENCES `room` (`roomID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedules`
--

LOCK TABLES `schedules` WRITE;
/*!40000 ALTER TABLE `schedules` DISABLE KEYS */;
INSERT INTO `schedules` VALUES (1,'sdadasd','2025-10-20','22:00:00',3,1,1,'pink');
/*!40000 ALTER TABLE `schedules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userID` int NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `CCCD` varchar(20) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `haveTask` date DEFAULT NULL,
  `gender` int DEFAULT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'nguyen thanh trung nhat','1','nguyen thanh trung nhat','1999-02-28','0922639956','nhat@gmail.com','1212312312312','28/17 khu 5 p. Binh Duong tp. HCM',NULL,1),(2,'Phan dinh hieu thao','1','Phan dinh hieu thao','1999-02-28','13123','thao@gmail.com','123123','23123',NULL,1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userrole`
--

DROP TABLE IF EXISTS `userrole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userrole` (
  `userRoleID` int NOT NULL,
  `roleID` int DEFAULT NULL,
  `userID` int DEFAULT NULL,
  PRIMARY KEY (`userRoleID`),
  KEY `roleID` (`roleID`),
  KEY `userID` (`userID`),
  CONSTRAINT `userrole_ibfk_1` FOREIGN KEY (`roleID`) REFERENCES `role` (`roleID`),
  CONSTRAINT `userrole_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userrole`
--

LOCK TABLES `userrole` WRITE;
/*!40000 ALTER TABLE `userrole` DISABLE KEYS */;
INSERT INTO `userrole` VALUES (1,2,1),(2,3,2);
/*!40000 ALTER TABLE `userrole` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-21  0:33:11
