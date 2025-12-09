import { Link } from "react-router-dom";
import SidebarLogin from "../SidebarLogin";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ScheduleRequest } from "../interface";

export default function AllShiftRequest() {
    const storedInfo = sessionStorage.getItem("info");
    const info = storedInfo ? JSON.parse(storedInfo) : null;
    const doctorID = Number(sessionStorage.getItem("doctorID"));

    const [requests, setRequests] = useState<ScheduleRequest[]>([]);

    useEffect(() => {
        if (!doctorID) return;
        fetchRequests();
    }, [doctorID]);

    const fetchRequests = () => {
        axios
            .get<ScheduleRequest[]>(`http://localhost:3000/schedulerequest`)
            .then(res => setRequests(res.data))
            .catch(err => console.error("Failed to load requests:", err));
    };

    // Unified function for approve/reject
    const handleStatusChange = (requestID: number, status: 1 | 2) => {
        axios
            .patch(`http://localhost:3000/schedule-request/${requestID}/status`, { status })
            .then(res => {
                toast.success(res.data.message);
                fetchRequests(); // reload table
            })
            .catch(err => {
                toast.error("Failed to update request");
                console.error(err);
            });
    };

    return (
        <div className="container-fluid pt-5 mt-5 padding mainBg">
            <div className="row">
                <div className="col-lg-9 col-sm-12 mb-5 order-2 order-lg-1">
                    <div className="border whiteBg dropShadow p-4">
                        <h4>Shift Requests</h4>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Schedule ID</th>
                                    <th>Reason</th>
                                    <th>New Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="text-center">No requests found</td>
                                    </tr>
                                )}
                                {requests.map((r: ScheduleRequest) => (
                                    <tr key={r.requestID}>
                                        <td>{r.requestID}</td>
                                        <td>{r.scheduleID}</td>
                                        <td>{r.reason || "-"}</td>
                                        <td>{r.newDate || "-"}</td>
                                        <td>
                                            {r.status === 0 ? "Pending" : r.status === 1 ? "Approved" : "Rejected"}
                                        </td>
                                        <td>
                                            {r.status === 0 && (
                                                <>
                                                    <button
                                                        className="btn btn-sm btn-success me-2"
                                                        onClick={() => handleStatusChange(r.requestID, 1)}
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() => handleStatusChange(r.requestID, 2)}
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-12 order-1 order-lg-2">
                    <div className="leftBody border whiteBg marginBottom dropShadow">
                        <SidebarLogin phone={info?.phone || ""} fullName={info?.fullName || ""} />
                    </div>
                    <div className="leftBody border whiteBg dropShadow marginBottom">
                        <h6 className='whiteText blueBg featureHead'>Feature</h6>
                        <div className="padding">
                            <ul className='list-unstyled'>
                                <li>
                                    <Link to="/doctor/allappointment" className="text-decoration-none">
                                        <i className="fa fa-caret-right" aria-hidden="true"></i> Appointments
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
