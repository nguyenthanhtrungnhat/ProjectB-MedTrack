import './Test.css'
export default function Screen() {
    return (
        <>
            <div className="header">
                <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
                    <a className="navbar-brand " href="#"><h4 className='whiteText'>MedTrack</h4></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <a className="nav-link active " href="#"><h5 className='whiteText hasHomeIcon'>Home</h5> <span className="sr-only">(current)</span></a>
                            <a className="nav-link whiteText " href="#"><h5 className='whiteText hasProfileIcon'>Profile</h5></a>

                        </div>
                    </div>
                </nav>
            </div>
            <div className="container-fluid mainBg vh-100">
                <div className="row">
                    <div className="col-10">
                        <div className="row">
                            <div className="col-6 ">
                                <div className="hasInformation border padding whiteBg ">
                                    <div className="row">
                                        <div className="col-8">
                                            <h5 className='blueText'>Nurse information</h5>
                                            <p className='blueText m-4'>Full name:</p>
                                            <p className='blueText m-4'>Date of birth:</p>
                                            <p className='blueText m-4'>Gender:</p>
                                            <p className='blueText m-4'>Phone number:</p>
                                            <p className='blueText m-4'>ID card:</p>
                                            <p className='blueText m-4'>Email:</p>
                                            <p className='blueText m-4'>Address:</p>
                                        </div>
                                        <div className="col-4">
                                            <img src="" alt="" />
                                            <p className='blueText m-4'>2131200088</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 noPl">
                                <div className="hasSchedule padding border whiteBg marginBottom">
                                    <div className="row">
                                        <div className="col-12  medicineSchedule">
                                            <h5 className='blueText medSche'>Medicine schedule</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="hasSchedule padding border whiteBg ">
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
                                            <div className="col-4 marginBottom">
                                                <div className="card room">
                                                    <div className="card-body">
                                                        <h5 className="card-title">Room 001</h5>
                                                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                                        <h6 className='blueText text-center'>Emergency Department</h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-4 marginBottom">
                                                <div className="card room">
                                                    <div className="card-body">
                                                        <h5 className="card-title">Room 001</h5>
                                                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                                        <h6 className='blueText text-center'>Emergency Department</h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-4 marginBottom">
                                                <div className="card room">
                                                    <div className="card-body">
                                                        <h5 className="card-title">Room 001</h5>
                                                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                                        <h6 className='blueText text-center'>Emergency Department</h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-4 marginBottom">
                                                <div className="card room">
                                                    <div className="card-body">
                                                        <h5 className="card-title">Room 001</h5>
                                                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                                        <h6 className='blueText text-center'>Emergency Department</h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-4 marginBottom">
                                                <div className="card room">
                                                    <div className="card-body">
                                                        <h5 className="card-title">Room 001</h5>
                                                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                                        <h6 className='blueText text-center'>Emergency Department</h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-4 marginBottom">
                                                <div className="card room">
                                                    <div className="card-body">
                                                        <h5 className="card-title">Room 001</h5>
                                                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                                        <h6 className='blueText text-center'>Emergency Department</h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-4 marginBottom">
                                                <div className="card room">
                                                    <div className="card-body">
                                                        <h5 className="card-title">Room 001</h5>
                                                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                                        <h6 className='blueText text-center'>Emergency Department</h6>
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
                        <div className="leftBody padding border whiteBg marginBottom">
                            <div className="row">
                                <div className="col-12 border feature padding whiteBg">
                                    <h5>Feature</h5>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>

    );
}
