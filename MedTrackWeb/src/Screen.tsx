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
            <div className="container-fluid mainBg">
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
                                <div className="hasSchedule padding border whiteBg marginBottom">
                                    <div className="row">
                                        <div className="col-12 medicineSchedule">
                                            <h5 className='blueText medSche'>Medicine schedule</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="hasSchedule padding border whiteBg">
                                    <div className="row">
                                        <div className="col-12 medicineScheduleDetail">
                                            <div className="row">
                                                <div className="col-4 border"></div>
                                                <div className="col-4 border"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 padding">
                                <div className="hasRoomList border padding whiteBg">
                                    <h1 className='blueText text-center'>Room list</h1>
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
                        <div className="leftBody padding border whiteBg marginBottom">
                            <div className="row">
                                <div className="col-12 login">
                                    <h5>Account</h5>
                                    <p>0922639956</p>
                                    <p>Nguyen Thanh Trung Nhat</p>
                                    <div className="d-flex justify-content-center">
                                        <button type="button" className="btn btn-danger w-100">Logout</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="leftBody padding border whiteBg">
                            <div className="row">
                                <div className="col-12 feature padding whiteBg">
                                    <h5>Feature</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
