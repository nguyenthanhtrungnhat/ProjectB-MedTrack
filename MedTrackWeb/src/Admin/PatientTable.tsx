import React, { useState } from "react";
import { PatientProps } from "../interface";



interface PatientTableProps {
    patients: PatientProps[];
    onDelete: (id: number, type: string) => void;
}

const PatientTable: React.FC<PatientTableProps> = ({ patients, onDelete }) => {
    const formatDate = (dateString: string | null): string => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return (
            ("0" + date.getDate()).slice(-2) +
            "/" +
            ("0" + (date.getMonth() + 1)).slice(-2) +
            "/" +
            date.getFullYear()
        );
    };
    const [selectedPatient, setSelectedPatient] = useState<PatientProps | null>(null);
    const [editedPatient, setEditedPatient] = useState<PatientProps | null>(null);
    const handleEdit = (patient: PatientProps) => {
        setSelectedPatient(patient);
        setEditedPatient({ ...patient });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (editedPatient) {
            setEditedPatient({ ...editedPatient, [e.target.name]: e.target.value });
        }
    };

    const handleSave = () => {
        if (!editedPatient) return;

        axios.put(`http://localhost:3000/patients/${editedPatient.patientID}`, editedPatient)
            .then(() => {
                alert("Patient updated successfully!");
                setSelectedPatient(null);
            })
            .catch(() => alert("Failed to update patient"));
    };
    return (
        <div className="row mt-5">
            <h2>Patients List</h2>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Patient ID</th>
                            <th>Username</th>
                            <th>Full Name</th>
                            <th>BHYT</th>
                            <th>Admission Date</th>
                            <th>Discharge Date</th>
                            <th>Diagnosis</th>
                            <th>Condition</th>
                            <th>Relative Name</th>
                            <th>Relative Number</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>CCCD</th>
                            <th>Address</th>
                            <th>Gender</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((patient) => (
                            <tr key={patient.patientID}>
                                <td>{patient.patientID}</td>
                                <td>{patient.username}</td>
                                <td>{patient.fullName}</td>
                                <td>{patient.BHYT}</td>
                                <td>{formatDate(patient.admissionDate)}</td>
                                <td>{formatDate(patient.dischargeDate)}</td>
                                <td>{patient.hospitalizationsDiagnosis}</td>
                                <td>{patient.summaryCondition}</td>
                                <td>{patient.relativeName}</td>
                                <td>{patient.relativeNumber}</td>
                                <td>{patient.phone}</td>
                                <td>{patient.email}</td>
                                <td>{patient.CCCD}</td>
                                <td>{patient.address}</td>
                                <td>{patient.gender === 1 ? "Male" : "Female"}</td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => onDelete(patient.patientID, "patients")}
                                    >
                                        Delete
                                    </button>
                                    <button className="btn btn-warning" onClick={() => handleEdit(patient)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Edit Modal */}
            {selectedPatient && editedPatient && (
                <div className="modal" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Patient</h5>
                                <button className="btn-close" onClick={() => setSelectedPatient(null)}></button>
                            </div>
                            <div className="modal-body">
                                <label>Full Name</label>
                                <input type="text" name="fullName" className="form-control" value={editedPatient.fullName} onChange={handleChange} />
                                <label>Phone</label>
                                <input type="text" name="phone" className="form-control" value={editedPatient.phone} onChange={handleChange} />
                                <label>Email</label>
                                <input type="email" name="email" className="form-control" value={editedPatient.email} onChange={handleChange} />
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setSelectedPatient(null)}>Cancel</button>
                                <button className="btn btn-success" onClick={handleSave}>Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PatientTable;
