// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import PatientsTable from "./PatientTable";
// import NursesTable from "./NurseTable";
// import DoctorsTable from "./DoctorTable";

// export default function AdminScreen() {
//     const navigate = useNavigate();
//     const [nurses, setNurses] = useState([]);
//     const [patients, setPatients] = useState([]);
//     const [doctors, setDoctors] = useState([]);

//     useEffect(() => {
//         axios.get("http://localhost:3000/nurses")
//             .then(response => setNurses(response.data))
//             .catch(() => toast.error("Failed to fetch nurses data"));

//         axios.get("http://localhost:3000/patients")
//             .then(response => setPatients(response.data))
//             .catch(() => toast.error("Failed to fetch patients data"));

//         axios.get("http://localhost:3000/doctors")
//             .then(response => setDoctors(response.data))
//             .catch(() => toast.error("Failed to fetch doctors data"));
//         console.log("test fetching times");
//     },[nurses,doctors,patients]);

//     const handleDelete = (id, type) => {
//         console.log(`Deleting ${type} with ID:`, id);
//         if (window.confirm("Are you sure you want to delete this record?")) {
//             axios.delete(`http://localhost:3000/${type}/${id}`)
//                 .then(() => {
//                     toast.success("Deleted successfully!");
//                     if (type === "nurses") setNurses(nurses.filter(nurse => nurse.nurseID !== id));
//                     if (type === "patients") setPatients(patients.filter(patient => patient.patientID !== id));
//                     if (type === "doctors") setDoctors(doctors.filter(doctor => doctor.doctorID !== id));
//                 })
//                 .catch((error) => {
//                     console.error("Delete request failed:", error);
//                     toast.error("Failed to delete record");
//                 });
//         }
//     };

//     const handleLogout = () => {
//         sessionStorage.clear();
//         toast.success("Logged out successfully!");
//         setTimeout(() => navigate("/"), 1000);
//     };

//     return (
//         <div className="padding">
//             <div className="container-fluid p-3">
//                 <ToastContainer />
//                 <h1>Admin Page</h1>
//                 <button className="btn btn-danger mb-3" onClick={handleLogout}>Logout</button>

//                 <PatientsTable patients={patients} onDelete={handleDelete} />
//                 <NursesTable nurses={nurses} onDelete={handleDelete} />
//                 <DoctorsTable doctors={doctors} onDelete={handleDelete} />
//             </div>
//         </div>
//     );
// }
export default function AdminScreen() {
    return (
        <>
            <h1>Developing</h1>
        </>
    )
}
