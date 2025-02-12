
import Header from './Header';
import Room from './Room';
import './AllDesign.css';


export default function BedsInRoom() {



    return (
        <div className='vh-100'>
            <Header />
            <div className="container-fluid mainBg main-content">
                <div className="row">
                    <div className="col-10">
                        <div className="hasRoomList border padding whiteBg dropShadow marginBottom">
                            <h2 className='blueText text-center marginBottom'>Bed list</h2>
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
                            <h2 className='greenText text-center marginBottom'>Empty bed</h2>
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
