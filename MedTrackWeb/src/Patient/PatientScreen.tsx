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
const getUserIDFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const decoded: any = jwtDecode(token);
        return decoded.userID; // Extract userID from token
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
};

export default function PatientScreen() {
    const [patients, setPatients] = useState<PatientProps[]>([]);
    const userID = getUserIDFromToken();
    useEffect(() => {
        axios.get(`http://localhost:3000/api/patientByUserID/${userID}`)
            .then(response => {
                console.log("Fetched data:", response.data);
                setPatients(response.data)
            })
            .catch(() => toast.error("Failed to fetch patients data"));
        console.log("test fetching times");
        console.log(`http://26.184.100.176:3000/api/patientByUserID/${userID}`);
    }, []);
    const [record, setRecord] = useState<RecordProps | null>(null);
    useEffect(() => {
        if (patients.length === 0) return; // Ensure there is at least one patient before fetching records

        const recordBypatientIdUrl = `http://26.184.100.176:3000/medical-records/${patients[0].patientID}`;

        axios.get(recordBypatientIdUrl)
            .then(response => {
                setRecord(response.data);
                console.log("Medical Record:", response.data);
            })
            .catch(error => console.error('Error fetching record:', error));
    }, [patients]); // <-- Depend on `patients` to wait until it's populated

    return (
        <div>
            <div className="container-fluid mainBg main-content h-100">
                <div className="row">
                    <div className="col-10">
                        <div className="row">
                            <div className="col-6 ">
                                {userID && (
                                    <PatientInformation
                                        image={patients[0]?.image || ""}
                                        fullName={patients[0]?.fullName || "N/A"}
                                        gender={patients[0]?.gender === 1 ? 'Male' : 'Female'}
                                        dob={patients[0]?.dob?.split('T')[0] || ""}
                                        phone={patients[0]?.phone || ""}
                                        patientID={patients[0]?.patientID || 0}
                                        address={patients[0]?.address || "Unknown"}
                                        email={patients[0]?.email || ""}
                                        BHYT={patients[0]?.BHYT || ""}
                                        admissionDate={patients[0]?.admissionDate?.split('T')[0] || ""}
                                        relativeName={patients[0]?.relativeName || ""}
                                        relativeNumber={patients[0]?.relativeNumber || 0}
                                    />
                                )}
                            </div>
                            <div className="col-6 noPl">
                                <div className="hasSchedule padding border whiteBg marginBottom dropShadow">
                                    <div className="row">
                                        <div className="col-12 medicineSchedule padding50">
                                            <h5 className='blueText medSche'>Medicine schedule</h5>
                                            <div className="d-flex bd-highlight mb-3">
                                                <p className='p-2 bd-highlight size50'>0</p>
                                                <i className="ml-auto p-2 bd-highlight fa fa-bell-o blueText size50" aria-hidden="true"></i>
                                            </div>
                                            <a href="">More detail</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="hasSchedule padding border whiteBg dropShadow h-400px">
                                    <div className="row">
                                        <div className="col-12 medicineScheduleDetail">
                                            <div className="row">
                                                <div className="col-6 d-flex justify-content-center">
                                                    <div className="border border-success square170-250 padding20">
                                                        <h5 className='medSche greenText'>Assigned Task</h5>
                                                        <div className="d-flex bd-highlight mb-3">
                                                            <p className='p-2 bd-highlight size25'>0</p>
                                                            <i className="ml-auto p-2 bd-highlight fa fa-calendar size25 greenText" aria-hidden="true"></i>
                                                        </div>
                                                        <a href="" className='greenText'>More detail</a>
                                                    </div>
                                                </div>
                                                <div className="col-6 d-flex justify-content-center">
                                                    <div className="border border-info square170-250 padding20">
                                                        <h5 className='medSche blueText'>Patient's requirements</h5>
                                                        <div className="d-flex bd-highlight mb-3">
                                                            <p className='p-2 bd-highlight size25'>0</p>
                                                            <i className="ml-auto p-2 bd-highlight fa fa-calendar blueText size25" aria-hidden="true"></i>
                                                        </div>
                                                        <a href="">More detail</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="col-2 noPl">
                        <div className="leftBody border whiteBg marginBottom dropShadow">
                            <div className="row">
                                <div className="col-12 login">
                                    <SidebarLogin
                                        phone={patients.length > 0 ? patients[0].phone : ""}
                                        fullName={patients.length > 0 ? patients[0].fullName : ""}
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
                                                    Developing ...
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <h6 className='whiteText blueBg announceHead'>Latest announcements</h6>
                                    <div className='padding20'>
                                        {[...Array(1)].map((_, index) => (
                                            <div key={index} className="card border-light mb-3 dropShadow">
                                                <div className="card-body p-2 card-header">
                                                    <p className="card-title p-0"><b>Light card title</b></p>
                                                    <p className="card-text p-0">Description</p>
                                                </div>
                                            </div>
                                        ))}
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

                                <div className="row"><div className="col-12">
                                    <div className="dropdown ">
                                        <Link className="btn border btn-secondary  dropdown-toggle" to={"#"} role="button" data-toggle="dropdown" aria-expanded="false">
                                            Record Date
                                        </Link>

                                        <div className="dropdown-menu">
                                            <Link className="dropdown-item" to={"#"}>Action</Link>
                                            <Link className="dropdown-item" to={"#"}>Another action</Link>
                                            <Link className="dropdown-item" to={"#"}>Something else here</Link>
                                        </div>
                                    </div></div></div>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-4">
                                            <div className="row">
                                                <div className="col-12 padding">
                                                    <div className="border whiteBg dropShadow padding">
                                                        <p className="blueText">Pluse</p>
                                                        <div className="d-flex align-items-center">
                                                            <img src={pluseImg} className="pluseImg me-2" />
                                                            <h4 className="blueText mb-0 paddingLeft20">{record && record.pulse}</h4>
                                                            <span className='blueText'> L/ph</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 padding">
                                                    <div className="border whiteBg dropShadow padding">
                                                        <p className="blueText">Temperature</p>
                                                        <div className="d-flex align-items-center">
                                                            <img src={tempImg} className="tempImg me-2" />
                                                            <h4 className="blueText mb-0 paddingLeft20">{record && record.temperature}</h4>
                                                            <span className='blueText'> *C</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-4 d-flex justify-content-center align-items-center">
                                            {record && record.healthStatus == '1' ? (<img src={patientImg} className='patientImg ' />) : (<img src={notgoodpatientImg} className='patientImg ' />)}
                                        </div>
                                        <div className="col-4">
                                            <div className="row">
                                                <div className="col-12 padding">
                                                    <div className="border whiteBg dropShadow padding">
                                                        <p className="blueText">Pluse</p>
                                                        <div className="d-flex align-items-center">
                                                            <img src={ntImg} className="ntImg me-2 " />
                                                            <h4 className="blueText mb-0 paddingLeft20">{record && record.respiratoryRate}</h4>
                                                            <span className='blueText'> times/min</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 padding">
                                                    <div className="border whiteBg dropShadow padding">
                                                        <p className="blueText">Blood pressure</p>
                                                        <div className="d-flex align-items-center">
                                                            <img src={bpImg} className="bpImg me-2" />
                                                            <h4 className="blueText mb-0 paddingLeft20">{record && record.bloodPressure}</h4>
                                                            <span className='blueText'> mmHg</span>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
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
