// MedTrackWeb/src/Admin/PatientTable.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface Patient {
    patientID: number;
    BHYT?: string;
    admissionDate?: string;
    dischargeDate?: string;
    hospitalizationsDiagnosis?: string;
    summaryCondition?: string;
    dischargeDiagnosis?: string;
    relativeName?: string;
    relativeNumber?: number;
    userID: number;
    image?: string;
    fullName?: string;
    email?: string;
    phone?: string;
}

export default function PatientTable() {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [loading, setLoading] = useState(false);

    const loadPatients = async () => {
        try {
            setLoading(true);
            const res = await axios.get<Patient[]>("http://localhost:3000/patients");
            setPatients(res.data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load patients");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPatients();
    }, []);

    const handleDelete = async (patientID: number) => {
        if (!window.confirm("Delete this patient?")) return;
        try {
            await axios.delete(`http://localhost:3000/patients/${patientID}`);
            toast.success("Patient deleted");
            setPatients((prev) => prev.filter((p) => p.patientID !== patientID));
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete patient");
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="blueText mb-0">Patient Accounts</h4>
                <span className="dlcgray">Patients register via Sign Up page</span>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="table-light">
                        <tr>
                            <th>ID</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>BHYT</th>
                            <th>Admission</th>
                            <th>Discharge</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && (
                            <tr>
                                <td colSpan={8} className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        )}
                        {!loading && patients.length === 0 && (
                            <tr>
                                <td colSpan={8} className="text-center text-muted">
                                    No patients
                                </td>
                            </tr>
                        )}
                        {patients.map((p) => (
                            <tr key={p.patientID}>
                                <td>{p.patientID}</td>
                                <td>{p.fullName}</td>
                                <td>{p.email}</td>
                                <td>{p.phone}</td>
                                <td>{p.BHYT}</td>
                                <td>{p.admissionDate}</td>
                                <td>{p.dischargeDate}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => handleDelete(p.patientID)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
