import axios from 'axios';
import Header from './Header';
import Room from './Room';
import './AllDesign.css';
import NurseInformation from './NurseInformation';
import { useEffect, useState } from 'react';
import { NurseProps, RoomProps } from './interface';
import { Link } from 'react-router-dom';



export default function NurseScreen() {
    const [user, setUser] = useState<NurseProps | null>(null);
    const url = 'http://26.184.100.176:3000/nurses/1';
    const [rooms, setRooms] = useState<RoomProps[]>([]); // Store rooms from API
    const roomsUrl = 'http://26.184.100.176:3000/rooms'; // API to get all rooms
    useEffect(() => {
        axios.get(url)
            .then(response => setUser(response.data)) // Axios auto-parses JSON
            .catch(error => console.error('Error fetching user:', error));
        axios.get(roomsUrl)
            .then(response => setRooms(response.data)) // Set rooms in state
            .catch(error => console.error('Error fetching rooms:', error));
    }, []);

    return (
        <div >
            <Header />
            <div className="container-fluid mainBg main-content vh-100">
                <div className="row">
                    <div className="col-10">
                        <div className="row">
                            {/* ✅ Only render Information when user is not null */}
                            {user && (
                                <NurseInformation
                                    image={'blank'}
                                    nurseFullName={user.nurseFullName}
                                    gender={user.gender = 1 ? 'Male' : 'Female'}
                                    dob={user.nurseDob?.split('T')[0]} // Extract only the date part (YYYY-MM-DD)
                                    phone={user.nursePhone}
                                    id={user.nurseID}
                                    address={user.address} // ✅ Optional chaining
                                    email={user.nurseEmail}
                                />
                            )}

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
                                <div className="hasSchedule padding border whiteBg dropShadow">
                                    <div className="row">
                                        <div className="col-12 medicineScheduleDetail">
                                            <div className="row ">
                                                <div className="col-6 d-flex justify-content-center">
                                                    <div className="border border-success square170-250 padding20">
                                                        <h5 className=' medSche greenText'>Assigned Task</h5>
                                                        <div className="d-flex bd-highlight mb-3">
                                                            <p className='p-2 bd-highlight size25'>0</p>
                                                            <i className="ml-auto p-2 bd-highlight fa fa-calendar size25 greenText" aria-hidden="true"></i>
                                                        </div>
                                                        <a href="" className='greenText'>More detail</a>
                                                    </div>
                                                </div>
                                                <div className="col-6 d-flex justify-content-center">
                                                    <div className="border border-info square170-250 padding20">
                                                        <h5 className=' medSche blueText'>Patient's requirements</h5>
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
                            <div className="col-12 padding">
                                <div className="hasRoomList border padding whiteBg dropShadow">
                                    <h2 className='blueText text-center marginBottom'>Room list</h2>
                                    <div>
                                        <div className="row">
                                            {/* ✅ Dynamically render rooms using .map() */}
                                            {rooms.map((room) => (
                                                <Room key={room.roomID} {...room} />
                                            ))}
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
