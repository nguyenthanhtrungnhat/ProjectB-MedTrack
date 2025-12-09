import { useEffect, useState } from "react";
import axios from "axios";
import { AppointmentProps } from "../interface";
import SidebarLogin from "../SidebarLogin";
import { Link } from "react-router-dom";

export default function AllAppointment() {
    const storedInfo = sessionStorage.getItem("info");
    const info = storedInfo ? JSON.parse(storedInfo) : null;
    // Get doctorID from sessionStorage
    const doctorID = Number(sessionStorage.getItem("doctorID"));
    const [appointments, setAppointments] = useState<AppointmentProps[]>([]);

    useEffect(() => {
        if (!doctorID) return;

        axios
            .get(`http://localhost:3000/api/all-appointment/doctor/${doctorID}`)
            .then(res => setAppointments(res.data))
            .catch(err => console.error("Failed to load appointments:", err));
    }, [doctorID]);

    return (
        <div className="container-fluid pt-5 mt-5 padding mainBg">
            <div className="row">
                <div className="col-lg-9 col-sm-12 mb-5 order-2 order-lg-1">
                    <div className="border whiteBg dropShadow p-4">
                        <h4 className="blueText">Appointments</h4>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>#</th><th>Date</th><th>Location</th><th>Status</th><th>Patient</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.length > 0 ? (
                                    appointments.map(a => (
                                        <tr key={a.appointmentID}>
                                            <td className={a.appointmentStatus ? "bg-danger" : "bg-success"}>
                                                {a.appointmentID}
                                            </td>

                                            <td className={a.appointmentStatus ? "bg-danger" : "bg-success"}>
                                                {new Date(a.dateTime).toLocaleDateString()}  {/* only shows date */}
                                            </td>

                                            <td className={a.appointmentStatus ? "bg-danger" : "bg-success"}>
                                                {a.location || "-"}
                                            </td>

                                            <td className={a.appointmentStatus ? "bg-danger" : "bg-success"}>
                                                {a.appointmentStatus ? "Overdue" : "Coming"}
                                            </td>
                                            <td className={a.appointmentStatus ? "bg-danger" : "bg-success"}>
                                                {a.patientName}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="text-center text-muted">
                                            No appointments
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* ================= SIDEBAR ================= */}
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
                                 <li>
                                    <Link to="/doctor/allshiftrequest" className="text-decoration-none">
                                        <i className="fa fa-caret-right" aria-hidden="true"></i> Shift Request
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
