import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../AllDesign.css";
import SidebarLogin from "../SidebarLogin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ShiftChange() {
    const storedInfo = sessionStorage.getItem("info");
    const info = storedInfo ? JSON.parse(storedInfo) : null;
    const nurseID = JSON.parse(sessionStorage.getItem("nurseID") || "null");

    const [schedules, setSchedules] = useState<any[]>([]);
    const [requests, setRequests] = useState<any[]>([]);

    const [selectedScheduleID, setSelectedScheduleID] = useState("");
    const [newDate, setNewDate] = useState(""); // ⬅ Ngày muốn đổi
    const [reason, setReason] = useState("");

    // Load schedules
    useEffect(() => {
        axios.get(`http://localhost:3000/api/schedules/${nurseID}`)
            .then(res => setSchedules(res.data))
            .catch(() => toast.error("❌ Cannot load schedules"));

        fetchRequests();
    }, []);

    // Load requests
    const fetchRequests = () => {
        axios.get(`http://localhost:3000/api/shift-change/status/${nurseID}`)
            .then(res => setRequests(res.data))
            .catch(() => toast.error("❌ Cannot load requests"));
    };

    // Submit shift change
    const submitRequest = () => {
        if (!selectedScheduleID || !newDate || !reason)
            return toast.warn("⚠ Please fill all fields!");

        axios.post("http://localhost:3000/api/shift-change/request", {
            scheduleID: selectedScheduleID,
            newDate,    // ⬅ Gửi ngày đổi sang cho backend
            reason,
            nurseID
        })
        .then(() => {
            toast.success("✔ Shift request submitted!");
            setReason("");
            setSelectedScheduleID("");
            setNewDate("");
            fetchRequests();
        })
        .catch(() => toast.error("❌ Submit failed"));
    };

    return (
        <div className="container-fluid pt-5 mt-5 padding">
        <ToastContainer /> {/* TOAST HERE */}

            <div className="row">
                <div className="col-lg-9 col-sm-12 mb-5">

                    <div className="border whiteBg dropShadow p-4">

                        {/* Schedule Table */}
                        <h3 className="scBlue">Your Schedules</h3>
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
                                {schedules.map(s => (
                                    <tr key={s.scheduleID}>
                                        <td>{s.scheduleID}</td>
                                        <td>{s.date}</td>
                                        <td>{s.start_at}</td>
                                        <td>{s.working_hours}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Request Table */}
                        <h3 className="mt-5 scBlue">Your Requests</h3>
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Schedule</th>
                                    <th>Old Date</th>
                                    <th>New Date</th>
                                    <th>Start</th>
                                    <th>Hours</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map(r => (
                                    <tr key={r.shiftchangerequestID}>
                                        <td>{r.shiftchangerequestID}</td>
                                        <td>#{r.scheduleID}</td>
                                        <td>{r.date}</td>
                                        <td>{r.newDate}</td>
                                        <td>{r.start_at}</td>
                                        <td>{r.working_hours}</td>
                                        <td>
                                            {r.status === 0 && <span className="text-warning">⏳ Pending</span>}
                                            {r.status === 1 && <span className="text-success">✔ Approved</span>}
                                            {r.status === 2 && <span className="text-danger">❌ Rejected</span>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Form */}
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <h2 className="scBlue mt-4">Shift Change Request</h2>

                            <form className="w-75">

                                <label>Select Schedule</label>
                                <select className="form-select"
                                    value={selectedScheduleID}
                                    onChange={e => setSelectedScheduleID(e.target.value)}>
                                    <option value="">-- Select --</option>
                                    {schedules.map(s => (
                                        <option key={s.scheduleID} value={s.scheduleID}>
                                            #{s.scheduleID} | {s.date} - {s.start_at}
                                        </option>
                                    ))}
                                </select>

                                <label className="mt-3">New Date (change to)</label>
                                <input type="date"
                                    className="form-control"
                                    value={newDate}
                                    onChange={e => setNewDate(e.target.value)}
                                />

                                <label className="mt-3">Reason</label>
                                <textarea className="form-control"
                                    value={reason}
                                    onChange={e => setReason(e.target.value)}>
                                </textarea>

                                <button type="button" className="btn btn-success w-100 mt-4"
                                    onClick={submitRequest}>
                                    Submit Request
                                </button>
                            </form>
                        </div>

                    </div>
                </div>

                {/* Sidebar */}
                <div className="col-lg-3 col-sm-12">
                    <div className="leftBody border whiteBg marginBottom dropShadow">
                        <SidebarLogin phone={info?.phone} fullName={info?.fullName}/>
                    </div>
                    <div className="leftBody border whiteBg dropShadow marginBottom">
                        <h6 className='whiteText blueBg featureHead'>Feature</h6>
                        <ul className='list-unstyled padding'>
                            <li><Link to="/home/shift-change">Shift Change</Link></li>
                            <li><Link to="/home/daily-checking">Daily Checking</Link></li>
                            <li><Link to="/home/schedule">Schedule</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
