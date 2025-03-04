import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './../AllDesign.css';

export default function ShiftChange() {
    const [workingDate, setWorkingDate] = useState("");
    const [reason, setReason] = useState("");
    const [loading, setLoading] = useState(false); // Prevent duplicate submissions

    const urlPost = "http://26.184.100.176:3000/requestShiftChange";
    const token = localStorage.getItem("token");
    const nurseID = JSON.parse(localStorage.getItem("nurseID") || "null"); // Ensure correct data type

    const handleSubmit = async () => {
        if (!workingDate.trim() || !reason.trim()) {
            alert("Please fill out all fields.");
            return;
        }

        if (!token) {
            alert("Authentication error! Please log in again.");
            return;
        }

        setLoading(true); // Disable button while processing

        try {
            const requestData = {
                dateTime: new Date(workingDate).toISOString(),
                requestContent: reason.trim(),
                requestStatus: null,
                nurseID: nurseID,  
                doctorID: null,
                requestType: 1,
            };

            const response = await axios.post(urlPost, requestData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            console.log("Response:", response.data);
            alert("Request submitted successfully!");

            // Clear form
            setWorkingDate("");
            setReason("");
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error("Server responded with:", error.response?.data);
                alert(`Error: ${error.response?.data?.message || "Failed to submit request."}`);
            } else if (error instanceof Error) {
                console.error("Request error:", error.message);
                alert("Network error, please try again.");
            } else {
                console.error("An unexpected error occurred.");
                alert("An unknown error occurred.");
            }
        } finally {
            setLoading(false); // Re-enable button
        }
    };

    return (
        <div>
            <div className="container-fluid scBg main-content vh-100 padding">
                <div className="row">
                    <div className="col-10">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <h1 className="scBlue h1Sc d-inline w-50">
                                Shift change registration
                                <i className="fa fa-hand-paper-o" aria-hidden="true"></i>
                            </h1>
                            <form className='w-50'>
                                <div className="form-group">
                                    <label htmlFor="workingDate">Expected working date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="workingDate"
                                        value={workingDate}
                                        onChange={(e) => setWorkingDate(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="reason">Reason for transfer</label>
                                    <textarea
                                        className="form-control"
                                        id="reason"
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className="form-group">
                                    <button 
                                        type="button" 
                                        className="btn btn-success w-100"
                                        onClick={handleSubmit}
                                        disabled={loading} // Prevent double submissions
                                    >
                                        {loading ? "Submitting..." : "Submit and continue"}
                                    </button>
                                </div>
                            </form>
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
            </div >
        </div >
    );
}
