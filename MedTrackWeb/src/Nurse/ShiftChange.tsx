import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SidebarLogin from "../SidebarLogin";
import "./../AllDesign.css";

export default function ShiftChange() {
    const storedInfo = localStorage.getItem("info");
    const info = storedInfo ? JSON.parse(storedInfo) : null;
   
    // State for form inputs
    const [workingDate, setWorkingDate] = useState("");
    const [reason, setReason] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!workingDate || !reason.trim()) {
            setMessage("Please fill in all fields.");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const token = localStorage.getItem("token"); // Assuming token is stored

            const response = await axios.post(
                "/submit-shiftchange",
                {
                    requestContent: `Shift Change Request: ${reason}, Date: ${workingDate}`,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMessage("Shift change request submitted successfully!");
            setWorkingDate("");
            setReason("");
        } catch (error) {
            console.error("Error submitting shift change:", error);
            setMessage(error.response?.data?.error || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="container-fluid scBg main-content h-100 padding">
                <div className="row">
                    <div className="col-10">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <h1 className="scBlue h1Sc d-inline w-50">
                                Shift change registration
                                <i className="fa fa-hand-paper-o" aria-hidden="true"></i>
                            </h1>
                            {message && <p className="text-danger">{message}</p>}
                            <form className="w-50" onSubmit={handleSubmit}>
                                <div className="form-group">
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
                                <div className="form-group">
                                    <label htmlFor="reason">Reason for transfer</label>
                                    <textarea
                                        className="form-control"
                                        id="reason"
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-success w-100" disabled={loading}>
                                        {loading ? "Submitting..." : "Submit and continue"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-2 noPl">
                        <div className="leftBody border whiteBg marginBottom dropShadow">
                            <div className="row">
                                <div className="col-12 login">
                                    <SidebarLogin phone={info?.phone || ""} fullName={info?.fullName || ""} />
                                </div>
                            </div>
                        </div>
                        <div className="leftBody border whiteBg dropShadow marginBottom">
                            <div className="row">
                                <div className="col-12">
                                    <h6 className="whiteText blueBg featureHead">Feature</h6>
                                    <div className="padding">
                                        <ul className="list-unstyled">
                                            <li>
                                                <Link to="/home/shift-change" className="text-decoration-none">
                                                    Shift change registration
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/home/daily-checking" className="text-decoration-none">
                                                    Daily checking health
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <h6 className="whiteText blueBg announceHead">Latest announcements</h6>
                                    <div className="padding20">
                                        <div className="card border-light mb-3 dropShadow">
                                            <div className="card-body p-2 card-header">
                                                <p className="card-title p-0">
                                                    <b>Light card title</b>
                                                </p>
                                                <p className="card-text p-0">Description</p>
                                            </div>
                                        </div>
                                        <div className="card border-light mb-3 dropShadow">
                                            <div className="card-body p-2 card-header">
                                                <p className="card-title p-0">
                                                    <b>Light card title</b>
                                                </p>
                                                <p className="card-text p-0">Description</p>
                                            </div>
                                        </div>
                                        <div className="card border-light mb-3 dropShadow">
                                            <div className="card-body p-2 card-header">
                                                <p className="card-title p-0">
                                                    <b>Light card title</b>
                                                </p>
                                                <p className="card-text p-0">Description</p>
                                            </div>
                                        </div>
                                        <div className="card border-light mb-3 dropShadow">
                                            <div className="card-body p-2 card-header">
                                                <p className="card-title p-0">
                                                    <b>Light card title</b>
                                                </p>
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
