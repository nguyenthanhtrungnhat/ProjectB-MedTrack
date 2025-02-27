import './AllDesign.css';
import Bed from './Bed';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { PatientProps } from './interface';
export default function BedsInRoom() {
    const { roomID } = useParams();
    const [patients, setPatients] = useState<PatientProps[]>([]);
    const url = `http://26.184.100.176:3000/rooms/${roomID}/patients`;
    useEffect(() => {
        axios.get(url)
            .then(response => {
                setPatients(response.data);
                console.log("Patient Data:", response.data);
            })
            .catch(error => console.error("Error fetching patients:", error));
    }, [roomID]);

    return (
        <div >
            <div className="container-fluid mainBg main-content h-100">
                <div className="row">
                    <div className="col-10">
                        <div className="hasRoomList border padding whiteBg dropShadow marginBottom">
                            {patients.length == 0 ?
                                (
                                    <>
                                        <h2 className='greenText text-center marginBottom'>Empty bed</h2>
                                        <div>
                                            <div className="row">
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <h2 className='blueText text-center marginBottom'>Bed list</h2>
                                        <div>
                                            <div className="row">
                                                {patients.map(patient => <Bed key={patient.patientID} {...patient} />)}
                                            </div>
                                        </div>
                                    </>
                                )
                            }
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
