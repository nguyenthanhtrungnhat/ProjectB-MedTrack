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
    const [showMore, setShowMore] = useState(false);
    const { patientID } = useParams();
    const storedInfo = sessionStorage.getItem("info");
    const info = storedInfo ? JSON.parse(storedInfo) : null;
    const patientByIdUrl = `http://localhost:3000/patients/${patientID}`;
    const recordBypatientIdUrl = `http://localhost:3000/medical-records/${patientID}`;

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
        axios.get(`http://localhost:3000/medical-records/by-recordId/${recordID}`)
            .then(response => {
                setRecord(response.data);
                console.log("Selected Record:", response.data);
            })
            .catch(error => console.error('Error fetching selected record:', error));
    };

    return (
        <div>
            <div className="container-fluid mainBg pt-5 mt-4">
                <div className="row mainBg">
                    <div className="col-9">
                        <div className="row align-items-stretch">
                            {/* Left column */}
                            <div className="col-lg-6 col-sm-12 d-flex">
                                <div className="w-100 d-flex flex-column border whiteBg marginBottom dropShadow p-3">
                                    {user && (
                                        <PatientInformation
                                            image={user.image}
                                            fullName={user.fullName}
                                            gender={user.gender == "1" ? 'Male' : 'Female'}
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
                            </div>

                            {/* Right column */}
                            <div className="col-lg-6 col-sm-12 d-flex">
                                <div className="w-100 d-flex flex-column border whiteBg marginBottom dropShadow p-3">
                                    <h5 className="blueText">Diagnose</h5>

                                    <p className="blueText">Hospitalization diagnosis:</p>
                                    <p>{user?.hospitalizationsDiagnosis}</p>

                                    <p className="blueText">
                                        Summary of disease process and clinical course
                                        ( Onset characteristic, clinical symptoms, disease course,...):
                                    </p>
                                    <p>{user?.summaryCondition}</p>

                                    <p className="blueText">Discharge diagnosis:</p>
                                    <p>{user?.dischargeDiagnosis}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-3 noPl">
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
                                <div className="col-5">
                                    <div className="row">
                                        <div className="col-lg-6 col-sm-12 padding">
                                            <div className="border whiteBg dropShadow padding">
                                                <p className="blueText">Pulse <span className="badge text-bg-success">Good</span></p>
                                                <div className="d-flex align-items-center">
                                                    <img src={pluseImg} className="pluseImg me-2" alt="Pulse" />
                                                    <h4 className="blueText mb-0 paddingLeft20">
                                                        {record?.pulse !== null && record?.pulse !== undefined ? (
                                                            record.pulse
                                                        ) : (
                                                            <div className="spinner-border" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                        )}
                                                    </h4>
                                                    <span className='blueText'> L/ph</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-sm-12 padding">
                                            <div className="border whiteBg dropShadow padding">
                                                <p className="blueText">Temperature <span className="badge text-bg-success">Success</span></p>
                                                <div className="d-flex align-items-center">
                                                    <img src={tempImg} className="tempImg me-2" alt="Temperature" />
                                                    <h4 className="blueText mb-0 paddingLeft20">
                                                        {record?.temperature !== null && record?.temperature !== undefined ? (
                                                            record.temperature
                                                        ) : (
                                                            <div className="spinner-border" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                        )}
                                                    </h4>
                                                    <span className='blueText'> °C</span>
                                                </div>
                                            </div>
                                        </div>
                                        {showMore && (
                                            <>
                                                <div className="col-lg-6 col-sm-12 padding">
                                                    <div className="border whiteBg dropShadow padding">
                                                        <p className="blueText">Height </p>
                                                        <div className="d-flex align-items-center">
                                                            <img src={pluseImg} className="pluseImg me-2" alt="pulse" />
                                                            <h4 className="blueText mb-0 paddingLeft20">
                                                                {record?.height !== null && record?.height !== undefined ? (
                                                                    record.height
                                                                ) : (
                                                                    <div className="spinner-border" role="status">
                                                                        <span className="visually-hidden">Loading...</span>
                                                                    </div>
                                                                )}
                                                            </h4>
                                                            <span className="blueText"> cm</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-sm-12 padding">
                                                    <div className="border whiteBg dropShadow padding">
                                                        <p className="blueText">Heart rate </p>
                                                        <div className="d-flex align-items-center">
                                                            <img src={pluseImg} className="pluseImg me-2" alt="pulse" />
                                                            <h4 className="blueText mb-0 paddingLeft20">
                                                                {record?.heartRate !== null && record?.heartRate !== undefined ? (
                                                                    record.heartRate
                                                                ) : (
                                                                    <div className="spinner-border" role="status">
                                                                        <span className="visually-hidden">Loading...</span>
                                                                    </div>
                                                                )}
                                                            </h4>
                                                            <span className="blueText"> bpm</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-sm-12 padding">
                                                    <div className="border whiteBg dropShadow padding">
                                                        <p className="blueText">Pain Scale</p>
                                                        <div className="d-flex align-items-center">
                                                            <img src={pluseImg} className="pluseImg me-2" alt="pulse" />
                                                            <h4 className="blueText mb-0 paddingLeft20">
                                                                {record?.hurtScale !== null && record?.hurtScale !== undefined ? (
                                                                    record.hurtScale
                                                                ) : (
                                                                    <div className="spinner-border" role="status">
                                                                        <span className="visually-hidden">Loading...</span>
                                                                    </div>
                                                                )}
                                                            </h4>
                                                            <span className="blueText"></span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 col-sm-12 padding">
                                                    <div className="border whiteBg dropShadow padding">
                                                        <p className="blueText">Sensorium</p>
                                                        <div className="d-flex align-items-center">
                                                            <img src={pluseImg} className="pluseImg me-2" alt="pulse" />
                                                            <h4 className="blueText mb-0 paddingLeft20">
                                                                {record?.sensorium !== null && record?.sensorium !== undefined ? (
                                                                    record.sensorium
                                                                ) : (
                                                                    <div className="spinner-border" role="status">
                                                                        <span className="visually-hidden">Loading...</span>
                                                                    </div>
                                                                )}
                                                            </h4>
                                                            <span className="blueText"> L/min</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                </div>
                                <div className="col-2 d-flex justify-content-center align-items-center">
                                    {record?.healthStatus == 1 ? (
                                        <img src={patientImg} className='patientImg' alt="Good Health" />
                                    ) : (
                                        <img src={notgoodpatientImg} className='patientImg' alt="Not Good Health" />
                                    )}
                                </div>
                                <div className="col-5">
                                    <div className="row">
                                        <div className="col-lg-6 col-sm-12 padding">
                                            <div className="border whiteBg dropShadow padding">
                                                <p className="blueText">Respiratory Rate <span className="badge text-bg-warning">Warning</span></p>
                                                <div className="d-flex align-items-center">
                                                    <img src={ntImg} className="ntImg me-2" alt="Respiratory Rate" />
                                                    <h4 className="blueText mb-0 paddingLeft20">
                                                        {record?.respiratoryRate !== null && record?.respiratoryRate !== undefined ? (
                                                            record.respiratoryRate
                                                        ) : (
                                                            <div className="spinner-border" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                        )}
                                                    </h4>
                                                    <span className='blueText'> times/min</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-sm-12 padding">
                                            <div className="border whiteBg dropShadow padding">
                                                <p className="blueText">Blood Pressure <span className="badge text-bg-danger">Bad</span></p>
                                                <div className="d-flex align-items-center">
                                                    <img src={bpImg} className="bpImg me-2" alt="Blood Pressure" />
                                                    <h4 className="blueText mb-0 paddingLeft20">
                                                        {record?.bloodPressure !== null && record?.bloodPressure !== undefined ? (
                                                            record.bloodPressure
                                                        ) : (
                                                            <div className="spinner-border" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                        )}
                                                    </h4>
                                                    <span className='blueText'> mmHg</span>
                                                </div>
                                            </div>
                                        </div>
                                        {showMore && (
                                            <>
                                                <div className="col-lg-6 col-sm-12 padding">
                                                    <div className="border whiteBg dropShadow padding">
                                                        <p className="blueText">Weight</p>
                                                        <div className="d-flex align-items-center">
                                                            <img src={pluseImg} className="pluseImg me-2" alt="pulse" />
                                                            <h4 className="blueText mb-0 paddingLeft20">
                                                                {record?.weight !== null && record?.weight !== undefined ? (
                                                                    record.weight
                                                                ) : (
                                                                    <div className="spinner-border" role="status">
                                                                        <span className="visually-hidden">Loading...</span>
                                                                    </div>
                                                                )}
                                                            </h4>
                                                            <span className="blueText"> Kg</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-sm-12 padding">
                                                    <div className="border whiteBg dropShadow padding">
                                                        <p className="blueText">SpO2</p>
                                                        <div className="d-flex align-items-center">
                                                            <img src={pluseImg} className="pluseImg me-2" alt="pulse" />
                                                            <h4 className="blueText mb-0 paddingLeft20">
                                                                {record?.SP02 !== null && record?.SP02 !== undefined ? (
                                                                    record.SP02
                                                                ) : (
                                                                    <div className="spinner-border" role="status">
                                                                        <span className="visually-hidden">Loading...</span>
                                                                    </div>
                                                                )}
                                                            </h4>
                                                            <span className="blueText"> %</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-sm-12 padding">
                                                    <div className="border whiteBg dropShadow padding">
                                                        <p className="blueText">Urine</p>
                                                        <div className="d-flex align-items-center">
                                                            <img src={pluseImg} className="pluseImg me-2" alt="pulse" />
                                                            <h4 className="blueText mb-0 paddingLeft20">
                                                                {record?.urine !== null && record?.urine !== undefined ? (
                                                                    record.urine
                                                                ) : (
                                                                    <div className="spinner-border" role="status">
                                                                        <span className="visually-hidden">Loading...</span>
                                                                    </div>
                                                                )}
                                                            </h4>
                                                            <span className="blueText"> ml/h</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 col-sm-12 padding">
                                                    <div className="border whiteBg dropShadow padding">
                                                        <p className="blueText">Oxygen therapy</p>
                                                        <div className="d-flex align-items-center">
                                                            <img src={pluseImg} className="pluseImg me-2" alt="pulse" />
                                                            <h4 className="blueText mb-0 paddingLeft20">
                                                                {record?.oxygenTherapy !== null && record?.oxygenTherapy !== undefined ? (
                                                                    record.oxygenTherapy
                                                                ) : (
                                                                    <div className="spinner-border" role="status">
                                                                        <span className="visually-hidden">Loading...</span>
                                                                    </div>
                                                                )}
                                                            </h4>
                                                            <span className="blueText"> L/min</span>
                                                        </div>
                                                    </div>
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
        </div>
    );
}
