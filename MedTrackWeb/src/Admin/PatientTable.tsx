// import React, { useState } from "react";
// import { PatientProps } from "../interface";
// import axios from "axios";
// import { toast } from "react-toastify";

// interface PatientTableProps {
//     patients: PatientProps[];
//     onDelete: (id: number, type: string) => void;
//     onUpdate: () => void; // Add this to refresh patient list after update
// }

// const PatientTable: React.FC<PatientTableProps> = ({ patients, onDelete, onUpdate }) => {
//     const formatDate = (dateString: string | null): string => {
//         if (!dateString) return "N/A";
//         const date = new Date(dateString);
//         return date.toLocaleDateString("en-GB"); // Formats as DD/MM/YYYY
//     };

//     const [selectedPatient, setSelectedPatient] = useState<PatientProps | null>(null);
//     const [editedPatient, setEditedPatient] = useState<PatientProps | null>(null);

//     const handleEdit = (patient: PatientProps) => {
//         setSelectedPatient(patient);
//         setEditedPatient({ ...patient });
//     };

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         if (editedPatient) {
//             setEditedPatient({ ...editedPatient, [e.target.name]: e.target.value });
//         }
//     };

//     const handleSave = () => {
//         if (!editedPatient) return;
//         axios.put(`http://localhost:3000/users/${editedPatient.userID}`, editedPatient)
//             .then(() => {
//                 toast.success("Patient updated successfully!");
//                 setSelectedPatient(null);
//                 onUpdate(); // Refresh patient list
//             })
//     };

//     return (
//         <div className="row mt-5">
//             <h2>Patients List</h2>
//             <div className="table-responsive">
//                 <table className="table table-striped">
//                     <thead>
//                         <tr>
//                             <th>Patient ID</th>
//                             <th>Username</th>
//                             <th>Full Name</th>
//                             <th>BHYT</th>
//                             <th>Admission Date</th>
//                             <th>Discharge Date</th>
//                             <th>Diagnosis</th>
//                             <th>Condition</th>
//                             <th>Relative Name</th>
//                             <th>Relative Number</th>
//                             <th>Phone</th>
//                             <th>Email</th>
//                             <th>CCCD</th>
//                             <th>Address</th>
//                             <th>Gender</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {patients.map((patient) => (
//                             <tr key={patient.patientID}>
//                                 <td>{patient.patientID}</td>
//                                 <td>{patient.username}</td>
//                                 <td>{patient.fullName}</td>
//                                 <td>{patient.BHYT ?? "N/A"}</td>
//                                 <td>{formatDate(patient.admissionDate)}</td>
//                                 <td>{formatDate(patient.dischargeDate)}</td>
//                                 <td>{patient.hospitalizationsDiagnosis ?? "N/A"}</td>
//                                 <td>{patient.summaryCondition ?? "N/A"}</td>
//                                 <td>{patient.relativeName ?? "N/A"}</td>
//                                 <td>{patient.relativeNumber ?? "N/A"}</td>
//                                 <td>{patient.phone ?? "N/A"}</td>
//                                 <td>{patient.email ?? "N/A"}</td>
//                                 <td>{patient.CCCD ?? "N/A"}</td>
//                                 <td>{patient.address ?? "N/A"}</td>
//                                 <td>{patient.gender === 1 ? "Male" : "Female"}</td>
//                                 <td>
//                                     <button
//                                         className="btn btn-danger"
//                                         onClick={() => onDelete(patient.patientID, "patients")}
//                                     >
//                                         Delete
//                                     </button>
//                                     <button className="btn btn-warning" onClick={() => handleEdit(patient)}>Edit</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Edit Modal */}
//             {selectedPatient && editedPatient && (
//                 <div className="modal" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
//                     <div className="modal-dialog">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <h5 className="modal-title">Edit Patient</h5>
//                                 <button className="btn-close" onClick={() => setSelectedPatient(null)}></button>
//                             </div>
//                             <div className="modal-body">
//                                 <label>Full Name</label>
//                                 <input type="text" name="fullName" className="form-control" value={editedPatient.fullName} onChange={handleChange} />
//                                 <label>Phone</label>
//                                 <input type="text" name="phone" className="form-control" value={editedPatient.phone} onChange={handleChange} />
//                                 <label>Email</label>
//                                 <input type="email" name="email" className="form-control" value={editedPatient.email} onChange={handleChange} />
//                             </div>
//                             <div className="modal-footer">
//                                 <button className="btn btn-secondary" onClick={() => setSelectedPatient(null)}>Cancel</button>
//                                 <button className="btn btn-success" onClick={handleSave}>Save Changes</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default PatientTable;
