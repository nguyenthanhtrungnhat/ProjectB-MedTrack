import axios from 'axios';
import Header from './Header';
import Room from './Room';
import './AllDesign.css';
import Information from './Information';
import { useEffect, useState } from 'react';
import { PatientProps } from './interface';

export default function Screen() {
    const [user, setUser] = useState<PatientProps | null>(null);

    useEffect(() => {
        axios.get('https://dummyjson.com/users/1')
            .then(response => setUser(response.data)) // Axios auto-parses JSON
            .catch(error => console.error('Error fetching user:', error));
    }, []);

    return (
        <div className='vh-100'>
            <Header />
            <div className="container-fluid mainBg main-content">
                <div className="row">
                    <div className="col-10">
                        <div className="row">
                            {/* ✅ Only render Information when user is not null */}
                            {user && (
                                <Information
                                    image={user.image}
                                    name={`${user.firstName} ${user.lastName}`}
                                    gender={user.gender}
                                    dob={user.birthDate}
                                    phone={user.phone}
                                    id={user.id}
                                    address={user.address?.address} // ✅ Optional chaining
                                    email={user.email}
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
                                            <Room />
                                            <Room />
                                            <Room />
                                            <Room />
                                            <Room />
                                            <Room />
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
                                            <li><a href="" className="text-decoration-none">Shift change registration</a></li>
                                            <li><a href="" className="text-decoration-none">Daily checking health</a></li>
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
