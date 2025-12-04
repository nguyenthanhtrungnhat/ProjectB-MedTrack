import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const getUserIDFromToken = (): number | null => {
    const token = sessionStorage.getItem("token");
    if (!token) return null;
    try {
        return (jwtDecode(token) as { userID: number }).userID;
    } catch {
        return null;
    }
};

export default function MakeAppointment() {
    const [doctors, setDoctors] = useState<any[]>([]);
    const [appointments, setAppointments] = useState<any[]>([]);
    const [doctorID, setDoctorID] = useState<number | null>(null);
    const [dateTime, setDateTime] = useState("");
    const [location, setLocation] = useState("");

    const userID = getUserIDFromToken(); // auto get from token

    useEffect(() => {
        if (!userID) {
            alert("You must login first!");
            window.location.href = "/login";
            return;
        }
        loadDoctors();
        loadAppointments();
    }, []);

    const loadDoctors = () => {
        axios.get("http://localhost:3000/doctors")
            .then(res => setDoctors(res.data))
            .catch(console.error);
    };

    const loadAppointments = () => {
        axios.get(`http://localhost:3000/appointments/${userID}`)
            .then(res => setAppointments(res.data))
            .catch(console.error);
    };

    const handleDoctorChange = (id: string) => {
        setDoctorID(Number(id));
        const doctor = doctors.find(d => d.doctorID == id);
        setLocation(doctor?.office ?? ""); // auto office update
    };

    const handleCreate = async () => {
        if (!doctorID || !dateTime) return alert("Please select doctor + date!");

        await axios.post("http://localhost:3000/appointments", {
            doctorID,
            userID,     // UPDATED ✔ matches your appointment table
            dateTime,
            location
        });

        alert("Appointment booked successfully!");
        loadAppointments();
    };

    return (
        <div className="container mt-5 pt-3">
            <h2>Make Appointment</h2>

            <div className="card p-3 mb-4">
                <label><b>Doctor</b></label>
                <select className="form-control mb-3" onChange={(e) => handleDoctorChange(e.target.value)}>
                    <option value="">-- Select Doctor --</option>
                    {doctors.map(d => (
                        <option key={d.doctorID} value={d.doctorID}>
                            Dr. {d.fullName} — {d.department}
                        </option>
                    ))}
                </select>

                <label><b>Date</b></label>
                <input type="date" className="form-control mb-3"
                    value={dateTime} onChange={(e) => setDateTime(e.target.value)} />

                <label><b>Location (auto)</b></label>
                <input type="text" className="form-control mb-3" value={location} disabled />

                <button className="btn btn-primary" onClick={handleCreate}>
                    Book Appointment
                </button>
            </div>

            <h4>My Appointments</h4>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Doctor</th>
                        <th>Date</th>
                        <th>Location</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(a => (
                        <tr key={a.appointmentID}>
                            <td>{a.appointmentID}</td>
                            <td>{a.doctorName}</td> {/* comes from backend JOIN */}
                            <td>{a.dateTime}</td>
                            <td>{a.location}</td>
                            <td>{a.appointmentStatus ? "Approved" : "Pending"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
