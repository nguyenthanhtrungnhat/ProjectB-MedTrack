import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import './../AllDesign.css';
import SidebarLogin from "../SidebarLogin";
import { Schedule } from "../interface";

export default function ShiftChange() {
    const storedInfo = sessionStorage.getItem("info");
    const info = storedInfo ? JSON.parse(storedInfo) : null;
    const [workingDate, setWorkingDate] = useState("");
    const [reason, setReason] = useState("");
    const nurseID = JSON.parse(sessionStorage.getItem("nurseID") || "null"); // Ensure correct data type
    const [selectedScheduleID, setSelectedScheduleID] = useState("");
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/schedules/${nurseID}`)
            .then(res => setSchedules(res.data))
            .catch(err => console.error("Error fetching schedules:", err));
    }, [nurseID]);
    return (
        <div>
            <div className="container-fluid pt-5 mt-5 padding vh-100">
                <div className="row">
                    <div className="col-lg-9 col-sm-12 mb-5 mt-5 order-2 order-lg-1">
                        <table className="table table-striped table-bordered mt-3">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Date</th>
                                    <th>Start at</th>
                                    <th>Working Hours</th>
                                </tr>
                            </thead>
                            <tbody>
                                {schedules.map((s) => (
                                    <tr key={s.scheduleID}>
                                        <td>{s.scheduleID}</td>
                                        <td>{s.date}</td>
                                        <td>{s.start_at}</td>
                                        <td>{s.working_hours}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <h1 className="scBlue d-inline">
                                Shift change registration
                                <i className="fa fa-hand-paper-o" aria-hidden="true"></i>
                            </h1>
                            <form className='w-75'>
                                <div className="form-group">
                                    <label htmlFor="workingDate">Choose a task</label>
                                    <select
                                        className="form-select"
                                        aria-label="Select schedule"
                                        value={selectedScheduleID}
                                        onChange={(e) => setSelectedScheduleID(e.target.value)}
                                    >
                                        <option value="">-- Select a schedule --</option>
                                        {schedules.map((s) => (
                                            <option key={s.scheduleID} value={s.scheduleID}>
                                                {s.scheduleID} - {s.subject}
                                            </option>
                                        ))}
                                    </select>

                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="workingDate">Expected working date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="workingDate"
                                        value={workingDate}
                                        onChange={(e) => setWorkingDate(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group mt-3 mb-3">
                                    <label htmlFor="reason">Reason for transfer</label>
                                    <textarea
                                        className="form-control"
                                        id="reason"
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                                <div className="form-group">
                                    <button
                                        type="button"
                                        className="btn btn-success w-100"
                                    >
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-12 order-1 order-lg-2">
                        <div className="leftBody border whiteBg marginBottom dropShadow">
                            <div className="row">
                                <div className="col-12 login">
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
                                    <h6 className='whiteText blueBg announceHead'>Latest announcements</h6>
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
