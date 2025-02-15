import Header from "./Header"

export default function DailyCheckingForm() {
    return (<>
        <Header />
        <div className="dlcForm h1359 main-content padding ">
            <div className="d-flex justify-content-center align-items-center">
                <div className="tracking-sheet">
                    <h1 className="whiteText">Life function tracking sheet <i className="fa fa-file-text" aria-hidden="true"></i></h1>
                    <span className=" dlcgray">Update patient diagnostic indicators</span>
                    <div className="mb80"></div>
                    <form>
                        <div className="row">
                            <div className="col">
                                <p>Choose patient</p>
                                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <p>Pulse</p>
                                <input type="text" className="form-control" placeholder="First name" />
                            </div>
                            <div className="col">
                                <p>SpO2</p>
                                <input type="text" className="form-control" placeholder="Last name" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <p>Pulse</p>
                                <input type="text" className="form-control" placeholder="First name" />
                            </div>
                            <div className="col">
                                <p>SpO2</p>
                                <input type="text" className="form-control" placeholder="Last name" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <p>Pulse</p>
                                <input type="text" className="form-control" placeholder="First name" />
                            </div>
                            <div className="col">
                                <p>SpO2</p>
                                <input type="text" className="form-control" placeholder="Last name" />
                            </div>

                        </div>
                        <div className="row">
                            <div className="col">
                                <p>Pulse</p>
                                <input type="text" className="form-control" placeholder="First name" />
                            </div>
                            <div className="col">
                                <p>SpO2</p>
                                <input type="text" className="form-control" placeholder="Last name" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <p>Pulse</p>
                                <input type="text" className="form-control" placeholder="First name" />
                            </div>
                            <div className="col">
                                <p>SpO2</p>
                                <input type="text" className="form-control" placeholder="Last name" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <p>Pulse</p>
                                <input type="text" className="form-control" placeholder="First name" />
                            </div>
                            <div className="col">
                                <p>SpO2</p>
                                <input type="text" className="form-control" placeholder="Last name" />
                            </div>
                        </div>
                        <div className="row marginBottom">
                            <div className="col">
                                <p>Current condition</p>
                                <textarea className="form-control" aria-label="Current condition"></textarea>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col padding">
                                <button className="btn btn-outline-secondary dlcBtn w-100 dropShadow" type="submit">Submit and continue</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div >
        </div >
    </>
    );
}
