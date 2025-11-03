import axios from 'axios';
import './../AllDesign.css';
import { useEffect, useState } from 'react';
import { PatientProps, RecordProps } from '../interface';
import { Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import SidebarLogin from '../SidebarLogin';
import { toast } from 'react-toastify';
import PatientInformation from '../PatientInformation';
import patientImg from './../images/Untitled-1.webp';
import notgoodpatientImg from './../images/red_body.webp';
import pluseImg from './../images/pulseReal.webp';
import tempImg from './../images/nhietdo.webp';
import heightImg from './../images/pulseReal.webp';
import weightImg from './../images/pulseReal.webp';
import urineImg from './../images/pulseReal.webp';
import spo2Img from './../images/pulseReal.webp';
import bpImg from './../images/bloodPressure.webp';
import ntImg from './../images/nhiptho.webp';

const getUserIDFromToken = () => {
    const token = sessionStorage.getItem("token");
    if (!token) return null;
    try {
        const decoded: any = jwtDecode(token);
        return decoded.userID;
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
};

export default function PatientScreen() {
    const [patients, setPatients] = useState<PatientProps[]>([]);
    const [allRecords, setAllRecords] = useState<RecordProps[]>([]);
    const [record, setRecord] = useState<RecordProps | null>(null);
    const userID = getUserIDFromToken();
    const [showMore, setShowMore] = useState(false);
    const [loading, setLoading] = useState(true);

    // 🩺 Dynamic badge generator
    const getHealthBadge = (type: string, value?: number | string | null) => {
        if (value === null || value === undefined) return { color: "text-bg-secondary", label: "N/A" };

        switch (type) {
            case "pulse":
                if (Number(value) > 100) return { color: "text-bg-danger", label: "High" };
                if (Number(value) < 60) return { color: "text-bg-warning", label: "Low" };
                return { color: "text-bg-success", label: "Good" };

            case "temperature":
                if (Number(value) > 38) return { color: "text-bg-danger", label: "Fever" };
                if (Number(value) < 36) return { color: "text-bg-warning", label: "Low" };
                return { color: "text-bg-success", label: "Normal" };

            case "respiratory":
                if (Number(value) > 25) return { color: "text-bg-danger", label: "Fast" };
                if (Number(value) < 12) return { color: "text-bg-warning", label: "Slow" };
                return { color: "text-bg-success", label: "Good" };

            case "bloodPressure":
                if (typeof value === "string" && value.includes("/")) {
                    const [systolicStr, diastolicStr] = (value as string).split("/");
                    const systolic = Number(systolicStr);
                    const diastolic = Number(diastolicStr);
                    if (isNaN(systolic) || isNaN(diastolic)) return { color: "text-bg-secondary", label: "Invalid" };
                    if (systolic > 140 || diastolic > 90) return { color: "text-bg-danger", label: "High" };
                    if (systolic < 90 || diastolic < 60) return { color: "text-bg-warning", label: "Low" };
                    return { color: "text-bg-success", label: "Normal" };
                }
                return { color: "text-bg-secondary", label: "N/A" };

            case "spO2":
                if (Number(value) < 90) return { color: "text-bg-danger", label: "Low" };
                if (Number(value) < 95) return { color: "text-bg-warning", label: "Slightly Low" };
                return { color: "text-bg-success", label: "Good" };

            case "heartRate":
                if (Number(value) > 100) return { color: "text-bg-danger", label: "High" };
                if (Number(value) < 60) return { color: "text-bg-warning", label: "Low" };
                return { color: "text-bg-success", label: "Normal" };

            case "oxygenTherapy":
                if (String(value).toLowerCase().includes("mask")) return { color: "text-bg-warning", label: "On Mask" };
                if (String(value).toLowerCase().includes("oxygen")) return { color: "text-bg-danger", label: "Required" };
                return { color: "text-bg-success", label: "Room Air" };

            case "sensorium":
                if (String(value).toLowerCase() === "alert") return { color: "text-bg-success", label: "Alert" };
                if (String(value).toLowerCase() === "drowsy") return { color: "text-bg-warning", label: "Drowsy" };
                return { color: "text-bg-danger", label: "Abnormal" };

            case "painScale":
                if (Number(value) <= 3) return { color: "text-bg-success", label: "Mild" };
                if (Number(value) <= 6) return { color: "text-bg-warning", label: "Moderate" };
                return { color: "text-bg-danger", label: "Severe" };

            default:
                return { color: "text-bg-secondary", label: "" };
        }
    };
    const renderVital = (label: string, imgSrc: string, unit: string, type: string, value?: number | string | null) => {
        const { color, label: status } = getHealthBadge(type, value);
        return (
            <div className="vitalCard border whiteBg dropShadow padding">
                <p className="blueText">
                    {label} <span className={`badge ${color}`}>{status}</span>
                </p>
                <div className="d-flex align-items-center">
                    <img src={imgSrc} className="pluseImg me-2" alt={label} />
                  
                    <h4 className="blueText mb-0 paddingLeft20 me-3">
                        {loading ? (
                            <div className="spinner-border me-3" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        ) : (
                            "N/A"
                        )}
                      
                    </h4>
                    <span className="blueText">{unit}</span>
                </div>
            </div>
        );
    };

    // Fetch patients for this user
       useEffect(() => {
        if (!userID) return;
        setLoading(true); // start loading
        axios
            .get(`https://projectb-medtrack.onrender.com/api/patientByUserID/${userID}`)
            .then(response => {
                setPatients(response.data);
            })
            .catch(() => toast.error("Failed to fetch patients data"))
    }, [userID]);

    // Fetch records for the first patient
    useEffect(() => {
        // Removed check for patients.length === 0 here
        if (patients.length === 0) {
            setAllRecords([]);
            setRecord(null);
            return;
        }

        const url = `https://projectb-medtrack.onrender.com/medical-records/${patients[0].patientID}`;
        axios.get(url)
            .then(response => {
                const sorted = [...response.data].sort(
                    (a, b) => new Date(b.timeCreate).getTime() - new Date(a.timeCreate).getTime()
                );
                setAllRecords(sorted);
                setRecord(sorted[0]);
            })
            .catch(error => console.error('Error fetching records:', error))
            .finally(() => setLoading(false)); // stop loading
    }, [patients]);

    const handleRecordSelect = (recordID: number) => {
        axios.get(`https://projectb-medtrack.onrender.com/medical-records/by-recordId/${recordID}`)
            .then(response => setRecord(response.data))
            .catch(error => console.error('Error fetching selected record:', error));
    };

    const patient = patients[0];

    if (!userID) return <h1 className='p-5 mt-5'>Unauthorized. Please log in.</h1>;

    return (
        <div className="container-fluid mainBg pt-5 mt-5 h-100">
            <div className="row">
                <div className="col-lg-9 col-sm-12 order-2 order-lg-1">
                    <div className="row align-items-stretch mb-4">
                        {/* Left column */}
                        <div className="col-lg-6 col-sm-12 d-flex">
                            <div className="w-100 d-flex flex-column border whiteBg dropShadow p-3">
                                {loading ? (
                                    <PatientInformation
                                        image={patient?.image || ""}
                                        fullName={patient?.fullName || ""}
                                        gender={
                                            patient?.gender === "1"
                                                ? "Male"
                                                : patient?.gender === "2"
                                                    ? "Female"
                                                    : ""
                                        }
                                        dob={patient?.dob?.split("T")[0] || ""}
                                        phone={patient?.phone || ""}
                                        patientID={patient?.patientID}
                                        address={patient?.address || ""}
                                        email={patient?.email || ""}
                                        BHYT={patient?.BHYT || ""}
                                        admissionDate={patient?.admissionDate?.split("T")[0] || ""}
                                        relativeName={patient?.relativeName || ""}
                                        relativeNumber={Number(patient?.relativeNumber) || ""}
                                        loading={loading}
                                    />

                                ) : (
                                    <PatientInformation
                                        image={patient?.image || ""}
                                        fullName={patient?.fullName || ""}
                                        gender={
                                            patient?.gender === "1"
                                                ? "Male"
                                                : patient?.gender === "2"
                                                    ? "Female"
                                                    : ""
                                        }
                                        dob={patient?.dob?.split("T")[0] || ""}
                                        phone={patient?.phone || ""}
                                        patientID={patient?.patientID}
                                        address={patient?.address || ""}
                                        email={patient?.email || ""}
                                        BHYT={patient?.BHYT || ""}
                                        admissionDate={patient?.admissionDate?.split("T")[0] || ""}
                                        relativeName={patient?.relativeName || ""}
                                        relativeNumber={Number(patient?.relativeNumber) || ""}
                                        loading={loading}
                                    />
                                )}
                            </div>
                        </div>

                        <div className="col-lg-6 col-sm-12 ">
                            <div className="hasSchedule padding border mb-3 whiteBg dropShadow mt-3">
                                <div className="row">
                                    <div className="col-12 medicineSchedule padding50">
                                        <h5 className='blueText medSche'>Medicine schedule</h5>
                                        <div className="d-flex bd-highlight mb-3">
                                            <p className='p-2 bd-highlight size50'>0</p>
                                            <i className="ml-auto p-2 bd-highlight fa fa-bell-o blueText size50" />
                                        </div>
                                        <a href="#">More detail</a>
                                    </div>
                                </div>
                            </div>
                            <div className="hasSchedule padding border whiteBg dropShadow">
                                <div className="row">
                                    <div className="col-12 medicineScheduleDetail">
                                        <div className="row">
                                            <div className="col-6 d-flex justify-content-center">
                                                <div className="border border-success square170-250 padding20">
                                                    <h5 className='medSche greenText'>Assigned Task</h5>
                                                    <div className="d-flex bd-highlight mb-3">
                                                        <p className='p-2 bd-highlight size25'>0</p>
                                                        <i className="ml-auto p-2 bd-highlight fa fa-calendar size25 greenText" />
                                                    </div>
                                                    <a href="#" className='greenText'>More detail</a>
                                                </div>
                                            </div>
                                            <div className="col-6 d-flex justify-content-center">
                                                <div className="border border-info square170-250 padding20">
                                                    <h5 className='medSche blueText'>Requirements</h5>
                                                    <div className="d-flex bd-highlight mb-3">
                                                        <p className='p-2 bd-highlight size25'>0</p>
                                                        <i className="ml-auto p-2 bd-highlight fa fa-calendar blueText size25" />
                                                    </div>
                                                    <a href="#">More detail</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 order-1 order-lg-2 col-sm-12">
                    <div className="leftBody border whiteBg marginBottom dropShadow">
                        <div className="row">
                            <div className="col-lg-12 login">
                                <SidebarLogin
                                    phone={patient?.phone || "N/A"}
                                    fullName={patient?.fullName || "N/A"}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="leftBody border whiteBg dropShadow marginBottom">
                        <div className="row">
                            <div className="col-12">
                                <h6 className='whiteText blueBg featureHead'>Feature</h6>
                                <div className="padding">
                                    <ul className='list-unstyled'>
                                        <li>
                                            <Link to="#" className="text-decoration-none">
                                                <i className="fa fa-caret-right" /> Developing ...
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row ">
                <div className="col-12 padding pt-0">
                    <div className="hasRoomList border padding whiteBg dropShadow">
                        <div className="row">
                            <div className="col-12">
                                <div className="dropdown">
                                    <button
                                        type="button"
                                        className={`btn btn-primary ${showMore ? 'active' : ''}`}
                                        data-bs-toggle="button"
                                        onClick={() => setShowMore(!showMore)}
                                    >
                                        {showMore ? 'Hide' : 'Show more'}
                                    </button>
                                    <button
                                        className="btn border btn-secondary dropdown-toggle"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Record Date
                                    </button>

                                    <ul className="dropdown-menu">

                                        {allRecords.map((rec) => (
                                            <li key={rec.recordID}>
                                                <button
                                                    className="dropdown-item"
                                                    type="button"
                                                    onClick={() => handleRecordSelect(Number(rec.recordID))}
                                                >
                                                    {new Date(rec.timeCreate).toLocaleString()}

                                                </button>
                                            </li>
                                        ))}
                                    </ul>

                                </div>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-5">
                                <div className="row">
                                    <div className="col-lg-6 col-sm-12 padding">
                                        {renderVital("Pulse", pluseImg, "L/ph", "pulse", record?.pulse)}
                                    </div>
                                    <div className="col-lg-6 col-sm-12 padding">
                                        {renderVital("Temperature", tempImg, "°C", "temperature", record?.temperature)}
                                    </div>
                                    {/* --- Show More Section --- */}
                                    {showMore && (
                                        <>
                                            <div className="col-lg-6 col-sm-12 padding">
                                                {renderVital("Height", heightImg, "cm", "other", record?.height)}
                                            </div>
                                            <div className="col-lg-6 col-sm-12 padding">
                                                {renderVital("Weight", weightImg, "kg", "other", record?.weight)}
                                            </div>
                                            <div className="col-lg-6 col-sm-12 padding">
                                                {renderVital("Sensorium", tempImg, "", "sensorium", record?.sensorium)}
                                            </div>
                                            <div className="col-lg-6 col-sm-12 padding">
                                                {renderVital("Pain Scale", bpImg, "/10", "painScale", record?.hurtScale)}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="col-2 d-flex justify-content-center align-items-center">
                                {record?.healthStatus == 1
                                    ? <img src={patientImg} className="patientImg" alt="Good Health" />
                                    : <img src={notgoodpatientImg} className="patientImg" alt="Not Good Health" />}
                            </div>

                            <div className="col-5">
                                <div className="row">
                                    <div className="col-lg-6 col-sm-12 padding">
                                        {renderVital("Respiratory Rate", ntImg, "times/min", "respiratory", record?.respiratoryRate)}
                                    </div>
                                    <div className="col-lg-6 col-sm-12 padding">
                                        {renderVital("Blood Pressure", bpImg, "mmHg", "bloodPressure", record?.bloodPressure)}
                                    </div>
                                    {/* --- Show More Section --- */}
                                    {showMore && (
                                        <>
                                            <div className="col-lg-6 col-sm-12 padding">
                                                {renderVital("Urine", urineImg, "ml", "other", record?.urine)}
                                            </div>
                                            <div className="col-lg-6 col-sm-12 padding">
                                                {renderVital("SpO₂", spo2Img, "%", "spO2", record?.SP02)}
                                            </div>
                                            <div className="col-lg-6 col-sm-12 padding">
                                                {renderVital("Heart Rate", pluseImg, "bpm", "heartRate", record?.heartRate)}
                                            </div>
                                            <div className="col-lg-6 col-sm-12 padding">
                                                {renderVital("Oxygen Therapy", spo2Img, "", "oxygenTherapy", record?.oxygenTherapy)}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
