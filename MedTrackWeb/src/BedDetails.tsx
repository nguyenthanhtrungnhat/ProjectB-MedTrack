import axios from 'axios';
import './AllDesign.css';
import PatientInformation from './PatientInformation';
import { useEffect, useState } from 'react';
import { PatientProps, RecordProps } from './interface';
import patientImg from './images/Untitled-1.png';
import notgoodpatientImg from './images/red_body.png';
import pluseImg from './images/pulseReal.png';
import tempImg from './images/nhietdo.png';
import bpImg from './images/bloodPressure.png';
import ntImg from './images/nhiptho.png';
import { Link, useParams } from 'react-router-dom';
import SidebarLogin from './SidebarLogin';

export default function BedDetails() {
    const [user, setUser] = useState<PatientProps | null>(null);
    const [allRecords, setAllRecords] = useState<RecordProps[]>([]);
    const [record, setRecord] = useState<RecordProps | null>(null);

    const { patientID } = useParams();
    const storedInfo = sessionStorage.getItem("info");
    const info = storedInfo ? JSON.parse(storedInfo) : null;
    const patientByIdUrl = `http://26.184.100.176:3000/patients/${patientID}`;
    const recordBypatientIdUrl = `http://26.184.100.176:3000/medical-records/${patientID}`;

    useEffect(() => {
        axios.get(patientByIdUrl)
            .then(response => {
                setUser(response.data);
                console.log("Patient Data:", response.data);
            })
            .catch(error => console.error('Error fetching user:', error));

        axios.get(recordBypatientIdUrl)
            .then(response => {
                const sorted = [...response.data].sort(
                    (a, b) => new Date(b.timeCreate).getTime() - new Date(a.timeCreate).getTime()
                );
                setAllRecords(sorted);
                setRecord(sorted[0]); // default to the latest record
                console.log("Medical Records:", sorted);
            })
            .catch(error => console.error('Error fetching records:', error));
    }, [patientByIdUrl, recordBypatientIdUrl]);

    const handleRecordSelect = (recordID: number) => {
        axios.get(`http://26.184.100.176:3000/medical-records/by-recordId/${recordID}`)
            .then(response => {
                setRecord(response.data);
                console.log("Selected Record:", response.data);
            })
            .catch(error => console.error('Error fetching selected record:', error));
    };

    return (
        <div>
            <div className="container-fluid mainBg main-content ">
                <div className="row mainBg">
                    <div className="col-10">
                        <div className="row">
                            <div className="col-6 ">
                                {user && (
                                    <PatientInformation
                                        image={user.image}
                                        fullName={user.fullName}
                                        gender={user.gender === 1 ? 'Male' : 'Female'}
                                        dob={user.dob?.split('T')[0]}
                                        phone={user.phone}
                                        patientID={user.patientID}
                                        address={user.address}
                                        email={user.email}
                                        BHYT={user.BHYT}
                                        admissionDate={user.admissionDate?.split('T')[0]}
                                        relativeName={user.relativeName}
                                        relativeNumber={user.relativeNumber}
                                    />
                                )}
                            </div>
                            <div className="col-6 noPl ">
                                <div className="padding border whiteBg marginBottom dropShadow h-627px">
                                    <h5 className='blueText'>Diagnose</h5>
                                    <p className="blueText">Hospitalization diagnosis:</p>
                                    <p>{user?.hospitalizationsDiagnosis}</p>
                                    <p className="blueText">Summary of disease process and clinical course
                                        ( Onset characteristic, clinical symptoms,
                                        disease course,...):</p>
                                    <p>{user?.summaryCondition}</p>
                                    <p className="blueText">Discharge diagnosis: </p>
                                    <p>{user?.dischargeDiagnosis}</p>
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
                                                                onClick={() => handleRecordSelect(rec.recordID)}
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
                                        <div className="col-4">
                                            <div className="row">
                                                <div className="col-12 padding">
                                                    <div className="border whiteBg dropShadow padding">
                                                        <p className="blueText">Pulse</p>
                                                        <div className="d-flex align-items-center">
                                                            <img src={pluseImg} className="pluseImg me-2" alt="Pulse" />
                                                            <h4 className="blueText mb-0 paddingLeft20">{record?.pulse}</h4>
                                                            <span className='blueText'> L/ph</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 padding">
                                                    <div className="border whiteBg dropShadow padding">
                                                        <p className="blueText">Temperature</p>
                                                        <div className="d-flex align-items-center">
                                                            <img src={tempImg} className="tempImg me-2" alt="Temperature" />
                                                            <h4 className="blueText mb-0 paddingLeft20">{record?.temperature}</h4>
                                                            <span className='blueText'> °C</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-4 d-flex justify-content-center align-items-center">
                                            {record?.healthStatus === '1' ? (
                                                <img src={patientImg} className='patientImg' alt="Good Health" />
                                            ) : (
                                                <img src={notgoodpatientImg} className='patientImg' alt="Not Good Health" />
                                            )}
                                        </div>
                                        <div className="col-4">
                                            <div className="row">
                                                <div className="col-12 padding">
                                                    <div className="border whiteBg dropShadow padding">
                                                        <p className="blueText">Respiratory Rate</p>
                                                        <div className="d-flex align-items-center">
                                                            <img src={ntImg} className="ntImg me-2" alt="Respiratory Rate" />
                                                            <h4 className="blueText mb-0 paddingLeft20">{record?.respiratoryRate}</h4>
                                                            <span className='blueText'> times/min</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 padding">
                                                    <div className="border whiteBg dropShadow padding">
                                                        <p className="blueText">Blood Pressure</p>
                                                        <div className="d-flex align-items-center">
                                                            <img src={bpImg} className="bpImg me-2" alt="Blood Pressure" />
                                                            <h4 className="blueText mb-0 paddingLeft20">{record?.bloodPressure}</h4>
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
                    <div className="col-2 noPl">
                        <div className="leftBody border whiteBg marginBottom dropShadow">
                            <div className="row">
                                <div className="col-12 login ">
                                    <SidebarLogin
                                        phone={info?.phone || ""}
                                        fullName={info?.fullName || ""}
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
                                                <Link to="/home/shift-change" className="text-decoration-none">
                                                    Shift change registration
                                                </Link>
                                            </li>

                                            <li>
                                                <Link to="/home/daily-checking" className="text-decoration-none">
                                                    Daily checking health
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
        </div>
    );
}
