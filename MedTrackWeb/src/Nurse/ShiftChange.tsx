import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './../AllDesign.css';
import SidebarLogin from "../SidebarLogin";


export default function ShiftChange() {
    const storedInfo = sessionStorage.getItem("info");
    const info = storedInfo ? JSON.parse(storedInfo) : null;
    const [workingDate, setWorkingDate] = useState("");
    const [reason, setReason] = useState("");
    const [loading, setLoading] = useState(false); // Prevent double submission

    const urlPost = "http://localhost:3000/requestShiftChange";
    const token = sessionStorage.getItem("token");
    const nurseID = JSON.parse(sessionStorage.getItem("nurseID") || "null"); // Ensure correct data type
    const requestType = 1;

    const postData = async () => {
        if (loading) return; // Prevent multiple clicks
        setLoading(true);

        try {
            const newData = {
                dateTime: workingDate,
                requestContent: reason,
                nurseID: nurseID,
                requestType: requestType,
            };

            const response = await axios.post(urlPost, newData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Show success toast
            toast.success("Shift change request submitted successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            // Clear fields after successful submission
            setWorkingDate("");
            setReason("");
            console.log(`Shift change request submitted successfully! Data:`, response.data);

        } catch (error) {
            console.error("Error posting data:", error);
            console.log("Failed to submit shift change request. Error posting data:", error);
            // Show error toast
            toast.error("Failed to submit shift change request.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        } finally {
            setLoading(false); // Enable button again
        }
    };

    return (
        <div>
            <div className="container-fluid pt-5 mt-5 padding vh-100">
                <div className="row">
                    <div className="col-lg-9 col-sm-12 mb-5 mt-5 order-2 order-lg-1">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <h1 className="scBlue d-inline">
                                Shift change registration
                                <i className="fa fa-hand-paper-o" aria-hidden="true"></i>
                            </h1>
                            <form className='w-75'>
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
                                <div className="form-group mb-3">
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
                                        onClick={postData}
                                        disabled={loading} // Disable button while submitting
                                    >
                                        {loading ? "Submitting..." : "Submit"}
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
