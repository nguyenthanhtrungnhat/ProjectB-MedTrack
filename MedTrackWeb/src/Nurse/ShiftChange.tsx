import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios
import SidebarLogin from "../SidebarLogin";
import "./../AllDesign.css";

export default function ShiftChange() {
    const storedInfo = localStorage.getItem("info");
    const info = storedInfo ? JSON.parse(storedInfo) : null;

    // State for form inputs
    const [formData, setFormData] = useState({
        workingDate: "",
        reason: ""
    });

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
            const response = await axios.post("http://localhost:5000/api/requests", 
                {
                    dateTime: formData.workingDate, // API expects `dateTime`
                    reason: formData.reason,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attach authentication token
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log("Success:", response.data);
            alert("Request submitted successfully!");

            // Clear form after submission
            setFormData({ workingDate: "", reason: "" });

        } catch (error) {
            console.error("Error submitting request:", error.response?.data || error.message);
            alert("Failed to submit request. Please try again.");
        }
    };

    return (
        <div>
            <div className="container-fluid scBg main-content h-100 padding">
                <div className="row">
                    <div className="col-10">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <h1 className="scBlue h1Sc d-inline w-50">
                                Shift Change Registration
                                <i className="fa fa-hand-paper-o" aria-hidden="true"></i>
                            </h1>
                            <form className="w-50" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="workingDate">Expected Working Date</label>
                                    <input 
                                        type="date" 
                                        className="form-control" 
                                        id="workingDate"
                                        name="workingDate"
                                        value={formData.workingDate}
                                        onChange={handleChange}
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="reason">Reason for Transfer</label>
                                    <textarea 
                                        className="form-control" 
                                        id="reason" 
                                        name="reason"
                                        value={formData.reason}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-success w-100">
                                        Submit and Continue
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="col-2 noPl">
                        <div className="leftBody border whiteBg marginBottom dropShadow">
                            <div className="row">
                                <div className="col-12 login">
                                    <SidebarLogin phone={info?.phone} fullName={info?.fullName} />
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
                                                    Shift Change Registration
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/home/daily-checking" className="text-decoration-none">
                                                    Daily Checking Health
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>

                                    <h6 className="whiteText blueBg announceHead">Latest Announcements</h6>
                                    <div className="padding20">
                                        {/* {[1, 2, 3, 4].map((_, index) => (
                                            <div key={index} className="card border-light mb-3 dropShadow">
                                                <div className="card-body p-2 card-header">
                                                    <p className="card-title p-0"><b>Light Card Title</b></p>
                                                    <p className="card-text p-0">Description</p>
                                                </div>
                                            </div>
                                        ))} */}
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
