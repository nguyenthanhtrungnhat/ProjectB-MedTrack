import axios from 'axios';
import './../AllDesign.css';
import { useEffect, useState } from 'react';
import { PatientProps, RecordProps } from '../interface';
import { Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import SidebarLogin from '../SidebarLogin';
import { toast } from 'react-toastify';
import PatientInformation from '../PatientInformation';
import patientImg from './../images/Untitled-1.png';
import notgoodpatientImg from './../images/red_body.png';
import pluseImg from './../images/pulseReal.png';
import tempImg from './../images/nhietdo.png';
import bpImg from './../images/bloodPressure.png';
import ntImg from './../images/nhiptho.png';

// Optional: Use environment variable for API base
// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";

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
    // Fetch patients for this user
    useEffect(() => {
        if (!userID) return;
        axios.get(`http://localhost:3000/api/patientByUserID/${userID}`)
            .then(response => {
                setPatients(response.data);
            })
            .catch(() => toast.error("Failed to fetch patients data"));
    }, [userID]);

    // Fetch records for the first patient
    useEffect(() => {
        if (patients.length === 0) return;

        const url = `http://localhost:3000/medical-records/${patients[0].patientID}`;
        axios.get(url)
            .then(response => {
                const sorted = [...response.data].sort(
                    (a, b) => new Date(b.timeCreate).getTime() - new Date(a.timeCreate).getTime()
                );
                setAllRecords(sorted);
                setRecord(sorted[0]);
            })
            .catch(error => console.error('Error fetching records:', error));
    }, [patients]);

    const handleRecordSelect = (recordID: number) => {
        axios.get(`http://localhost:3000/medical-records/by-recordId/${recordID}`)
            .then(response => setRecord(response.data))
            .catch(error => console.error('Error fetching selected record:', error));
    };

    if (!userID) return <div>Unauthorized. Please log in.</div>;
    if (patients.length === 0) return <div>Loading patient data...</div>;
    if (!record) return <div>Loading medical record...</div>;

    const patient = patients[0];

    return (
        <div className="container-fluid mainBg main-content h-100">
            <div className="row">
                <div className="col-9">
                    <div className="row">
                        <div className="col-6">
                            <div className="border whiteBg marginBottom dropShadow p-3">
                                <PatientInformation
                                    image={patient.image || ""}
                                    fullName={patient.fullName || "N/A"}
                                    gender={patient.gender === 1 ? 'Male' : 'Female'}
                                    dob={patient.dob?.split('T')[0] || ""}
                                    phone={patient.phone || ""}
                                    patientID={patient.patientID}
                                    address={patient.address || "Unknown"}
                                    email={patient.email || ""}
                                    BHYT={patient.BHYT || ""}
                                    admissionDate={patient.admissionDate?.split('T')[0] || ""}
                                    relativeName={patient.relativeName || ""}
                                    relativeNumber={patient.relativeNumber || 0}
                                />
                            </div>
                        </div>
                        <div className="col-6 noPl ">
                            <div className="hasSchedule padding border whiteBg marginBottom dropShadow">
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
                            <div className="hasSchedule padding border whiteBg dropShadow h-59">
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

                    <div className="row padding">
                        <div className="col-12 border whiteBg dropShadow">
                            <div className="row">
                                <div className="col-12 padding">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="dropdown">
                                                <button
                                                    className="btn border btn-secondary dropdown-toggle"
                                                    type="button"
                                                    data-bs-toggle="dropdown"
                                                >
                                                    Record Date
                                                </button>
                                                <ul className="dropdown-menu">
                                                    {allRecords.map((rec) => (
                                                        <li key={rec.recordID}>
                                                            <button
                                                                className="dropdown-item"
                                                                type="button"
                                                                onClick={() => handleRecordSelect(rec.recordID)}
                                                            >
                                                                {new Date(rec.timeCreate).toLocaleString()}
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <button
                                                type="button"
                                                className={`btn btn-primary ${showMore ? 'active' : ''}`}
                                                data-bs-toggle="button"
                                                onClick={() => setShowMore(!showMore)}
                                            >
                                                {showMore ? 'Hide' : 'Show'}
                                            </button>
                                        </div>

                                    </div>
                                    <div className="container">
                                        <div className="row">

                                            <div className="col-4">
                                                <div className="row">
                                                    <div className="col-12 padding">
                                                        <div className="border whiteBg dropShadow padding">
                                                            <p className="blueText">Pulse</p>
                                                            <div className="d-flex align-items-center">
                                                                <img src={pluseImg} className="pluseImg me-2" />
                                                                <h4 className="blueText mb-0 paddingLeft20">{record.pulse}</h4>
                                                                <span className='blueText'> L/ph</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 padding">
                                                        <div className="border whiteBg dropShadow padding">
                                                            <p className="blueText">Temperature</p>
                                                            <div className="d-flex align-items-center">
                                                                <img src={tempImg} className="tempImg me-2" />
                                                                <h4 className="blueText mb-0 paddingLeft20">{record.temperature}</h4>
                                                                <span className='blueText'> °C</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-4 d-flex justify-content-center align-items-center">
                                                {record.healthStatus === '1'
                                                    ? <img src={patientImg} className='patientImg' />
                                                    : <img src={notgoodpatientImg} className='patientImg' />}
                                            </div>

                                            <div className="col-4">
                                                <div className="row">
                                                    <div className="col-12 padding">
                                                        <div className="border whiteBg dropShadow padding">
                                                            <p className="blueText">Respiratory Rate</p>
                                                            <div className="d-flex align-items-center">
                                                                <img src={ntImg} className="ntImg me-2" />
                                                                <h4 className="blueText mb-0 paddingLeft20">{record.respiratoryRate}</h4>
                                                                <span className='blueText'> times/min</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 padding">
                                                        <div className="border whiteBg dropShadow padding">
                                                            <p className="blueText">Blood Pressure</p>
                                                            <div className="d-flex align-items-center">
                                                                <img src={bpImg} className="bpImg me-2" />
                                                                <h4 className="blueText mb-0 paddingLeft20">{record.bloodPressure}</h4>
                                                                <span className='blueText'> mmHg</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {showMore && (
                                                        <div className="col-12 padding">
                                                            <div className="border whiteBg dropShadow padding">
                                                                <p className="blueText">Weight</p>
                                                                <div className="d-flex align-items-center">
                                                                    <img src={pluseImg} className="pluseImg me-2" alt="pulse" />
                                                                    <h4 className="blueText mb-0 paddingLeft20">{record.weight}</h4>
                                                                    <span className="blueText"> Kg</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-3 noPl">
                    <div className="leftBody border whiteBg marginBottom dropShadow">
                        <div className="row">
                            <div className="col-12 login">
                                <SidebarLogin
                                    phone={patient.phone}
                                    fullName={patient.fullName}
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
                                <h6 className='whiteText blueBg announceHead'>Latest announcements</h6>
                                <div className='padding20'>
                                    <div className="card border-light mb-3 dropShadow">
                                        <div className="card-body p-2 card-header">
                                            <p className="card-title p-0"><b>Light card title</b></p>
                                            <p className="card-text p-0">Description</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
