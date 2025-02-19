import axios from 'axios';
import Header from './Header';
import './AllDesign.css';
import PatientInformation from './PatientInformation';
import { useEffect, useState } from 'react';
import { PatientProps } from './interface';
import patientImg from './images/Untitled-1.png';
import pluseImg from './images/pluse.png';
import tempImg from './images/nhietdo.png';
import { Link, useParams } from 'react-router-dom';
export default function BedDetails() {
    const [user, setUser] = useState<PatientProps | null>(null);
    const { patientID } = useParams();
    useEffect(() => {
        axios.get(`http://localhost:3000/patients/${patientID}`)
            .then(response => setUser(response.data)) // Axios auto-parses JSON
            .catch(error => console.error('Error fetching user:', error));
    }, []);

    return (
        <div >
            <Header />
            <div className="container-fluid mainBg main-content vh-100">
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
                                            <div className="row">
                                                <div className="col-4">
                                                    <div className="row">
                                                        <div className="col-12 padding">
                                                            <div className="border whiteBg dropShadow padding">
                                                                <p className="blueText">Pluse</p>
                                                                <div className="d-flex align-items-center">
                                                                    <img src={pluseImg} className="pluseImg me-2" />
                                                                    <h4 className="blueText mb-0 paddingLeft20">0</h4>
                                                                    <span className='blueText'>L/ph</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 padding">
                                                            <div className="border whiteBg dropShadow padding">
                                                                <p className="blueText">Temperature</p>
                                                                <div className="d-flex align-items-center">
                                                                    <img src={tempImg} className="tempImg me-2" />
                                                                    <h4 className="blueText mb-0 paddingLeft20">0</h4>
                                                                    <span className='blueText'>*C</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-4 d-flex justify-content-center align-items-center">
                                                    <img src={patientImg} className='patientImg ' />
                                                </div>
                                                <div className="col-4">
                                                    <div className="row">
                                                        <div className="col-12 padding">
                                                            <div className="border whiteBg dropShadow padding">
                                                                <p className="blueText">Pluse</p>
                                                                <div className="d-flex align-items-center">
                                                                    <img src={pluseImg} className="pluseImg me-2 " />
                                                                    <h4 className="blueText mb-0 paddingLeft20">0</h4>
                                                                    <span className='blueText'>L/ph</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 padding">
                                                            <div className="border whiteBg dropShadow padding">
                                                                <p className="blueText">Temperature</p>
                                                                <div className="d-flex align-items-center">
                                                                    <img src={tempImg} className="tempImg me-2" />
                                                                    <h4 className="blueText mb-0 paddingLeft20">0</h4>
                                                                    <span className='blueText'>*C</span>
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
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                    <p className="blueText">Sumary of disease process and clinical course
                                        ( Onset characteristic, clinical symptoms,
                                        disease course,...):</p>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                    <p className="blueText">Discharge diagnosis: </p>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
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
