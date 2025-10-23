import './AllDesign.css';
import Bed from './Bed';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { PatientProps } from './interface';
import SidebarLogin from './SidebarLogin';
export default function BedsInRoom() {
    const storedInfo = sessionStorage.getItem("info");
    const info = storedInfo ? JSON.parse(storedInfo) : null;
    const { roomID } = useParams();
    const [patients, setPatients] = useState<PatientProps[]>([]);
    const url = `http://localhost:3000/rooms/${roomID}/patients`;
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
            <div className="container-fluid mt-5 pt-5 vh-100">
                <div className="row">
                    <div className="col-lg-9 order-2 order-lg-1">
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
                    <div className="col-lg-3 order-1 order-lg-2">
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
                        <div className="leftBody  border whiteBg dropShadow marginBottom">
                            <div className="row">
                                <div className="col-12">
                                    <h6 className='whiteText blueBg featureHead'>Feature</h6>
                                    <div className="padding">
                                        <ul className='list-unstyled'>
                                            <li>
                                                <Link to="/home/shift-change" className="text-decoration-none">
                                                    <i className="fa fa-caret-right" aria-hidden="true"></i> Shift change registration
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/home/daily-checking" className="text-decoration-none">
                                                    <i className="fa fa-caret-right" aria-hidden="true"></i> Daily checking health
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/home/schedule" className="text-decoration-none">
                                                    <i className="fa fa-caret-right" aria-hidden="true"></i> Schedule
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
