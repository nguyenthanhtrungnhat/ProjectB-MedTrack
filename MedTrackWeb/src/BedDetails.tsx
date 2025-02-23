import axios from 'axios';
import Header from './Header';
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
export default function BedDetails() {
    const [user, setUser] = useState<PatientProps | null>(null);
    const [record, setRecord] = useState<RecordProps | null>(null);
    const { patientID } = useParams();
    // const BASE_URL = `http://${window.location.hostname}:3000`;
    // const patientByIdUrl = `${BASE_URL}/patients/${patientID}`;
    // const recordBypatientIdUrl = `${BASE_URL}/medical-records/${patientID}`;
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
                setRecord(response.data);
                console.log("Medical Record:", response.data);
            }) 
            .catch(error => console.error('Error fetching record:', error));
    }, []);

    return (
        <div >
            <Header />
            <div className="container-fluid mainBg main-content h-100">
                <div className="row">
                    <div className="col-10">
                        <div className="row">
                            <div className="col-6 ">
                                {user && (
                                    <PatientInformation
                                        image={'blank'}
                                        fullName={user.fullName}
                                        gender={user.gender = 1 ? 'Male' : 'Female'}
                                        dob={user.dob?.split('T')[0]} // Extract only the date part (YYYY-MM-DD)
                                        phone={user.phone}
                                        patientID={user.patientID}
                                        address={user.address} // ✅ Optional chaining
                                        email={user.email}
                                    />
                                )}
                                <div className="row">
                                    <div className="col-12 padding">
                                        <div className="hasRoomList border padding whiteBg dropShadow">
                                            <div className="row"><div className="col-12">
                                                <div className="dropdown ">
                                                    <a className="btn border btn-secondary  dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
                                                        Record Date
                                                    </a>

                                                    <div className="dropdown-menu">
                                                        <a className="dropdown-item" href="#">Action</a>
                                                        <a className="dropdown-item" href="#">Another action</a>
                                                        <a className="dropdown-item" href="#">Something else here</a>
                                                    </div>
                                                </div></div></div>
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
                            <div className="col-6 noPl">
                                <div className=" padding border whiteBg marginBottom dropShadow">
                                    <h5 className='blueText'>Diagnose</h5>
                                    <p className="blueText">Hospitalization diagnosis:</p>
                                    <p>{user?.hospitalizationsDiagnosis}</p>
                                    <p className="blueText">Sumary of disease process and clinical course
                                        ( Onset characteristic, clinical symptoms,
                                        disease course,...):</p>
                                    <p>{user?.summaryCondition}</p>
                                    <p className="blueText">Discharge diagnosis: </p>
                                    <p>{user?.dischargeDiagnosis}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-2 noPl">
                        <div className="leftBody border whiteBg marginBottom dropShadow">
                            <div className="row">
                                <div className="col-12 login ">
                                    <h6 className='whiteText blueBg loginHead'>Account</h6>
                                    <div className="padding">
                                        <p className='blueText'>0922639956</p>
                                        <p className='blueText'>Nguyen Thanh Trung Nhat</p>
                                        <div className="d-flex justify-content-center">
                                            <button type="button" className="btn btn-danger w-100">Logout</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="leftBody  border whiteBg dropShadow marginBottom">
                            <div className="row">
                                <div className="col-12">
                                    <h6 className='whiteText blueBg featureHead'>Feature</h6>
                                    <div className="padding">
                                        <ul className='list-unstyled'>
                                            <li>
                                                <Link to="/shift-change" className="text-decoration-none">
                                                    Shift change registration
                                                </Link>
                                            </li>

                                            <li>
                                                <Link to="/daily-checking" className="text-decoration-none">
                                                    Daily checking health
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <h6 className='whiteText blueBg announceHead'>Lastes announcements</h6>
                                    <div className='padding20'>
                                        <div className="card border-light mb-3 dropShadow">
                                            <div className="card-body p-2 card-header">
                                                <p className="card-title p-0"><b>Light card title</b></p>
                                                <p className="card-text p-0">Description</p>
                                            </div>
                                        </div>
                                        <div className="card border-light mb-3 dropShadow">
                                            <div className="card-body p-2 card-header">
                                                <p className="card-title p-0"><b>Light card title</b></p>
                                                <p className="card-text p-0">Description</p>
                                            </div>
                                        </div>
                                        <div className="card border-light mb-3 dropShadow">
                                            <div className="card-body p-2 card-header">
                                                <p className="card-title p-0"><b>Light card title</b></p>
                                                <p className="card-text p-0">Description</p>
                                            </div>
                                        </div>
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
