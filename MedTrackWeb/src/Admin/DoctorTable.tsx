// MedTrackWeb/src/Admin/DoctorTable.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface Doctor {
    doctorID: number;
    department: string | null;
    nurseID: number | null;
    userID: number;
    office: string | null;
    fullName?: string;
    email?: string;
    phone?: string;
}

export default function DoctorTable() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const [form, setForm] = useState({
        username: "",
        password: "",
        fullName: "",
        dob: "",
        phone: "",
        email: "",
        CCCD: "",
        address: "",
        gender: "1",
        department: "",
        nurseID: "",
        office: "",
    });

    const token = sessionStorage.getItem("token");

    const loadDoctors = async () => {
        try {
            setLoading(true);
            const res = await axios.get<Doctor[]>("http://localhost:3000/doctors");
            setDoctors(res.data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load doctors");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDoctors();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) {
            toast.error("Unauthorized - please log in as admin");
            return;
        }
        if (!form.username || !form.password || !form.fullName || !form.email) {
            toast.error("Please fill required fields");
            return;
        }

        try {
            await axios.post(
                "http://localhost:3000/admin/doctors",
                {
                    username: form.username,
                    password: form.password,
                    fullName: form.fullName,
                    dob: form.dob || null,
                    phone: form.phone || null,
                    email: form.email,
                    CCCD: form.CCCD || null,
                    address: form.address || null,
                    gender: form.gender,
                    department: form.department || null,
                    nurseID: form.nurseID ? Number(form.nurseID) : null,
                    office: form.office || null,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Doctor account created");
            setShowForm(false);
            setForm({
                username: "",
                password: "",
                fullName: "",
                dob: "",
                phone: "",
                email: "",
                CCCD: "",
                address: "",
                gender: "1",
                department: "",
                nurseID: "",
                office: "",
            });
            loadDoctors();
        } catch (err: any) {
            console.error(err);
            toast.error(err?.response?.data?.message || "Failed to create doctor");
        }
    };

    const handleDelete = async (doctorID: number) => {
        if (!window.confirm("Delete this doctor?")) return;
        try {
            await axios.delete(`http://localhost:3000/doctors/${doctorID}`);
            toast.success("Doctor deleted");
            setDoctors((prev) => prev.filter((d) => d.doctorID !== doctorID));
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete doctor");
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="blueText mb-0">Doctor Accounts</h4>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowForm((prev) => !prev)}
                >
                    {showForm ? "Close Form" : "Create Doctor"}
                </button>
            </div>

            {showForm && (
                <form className="row g-3 mb-4" onSubmit={handleCreate}>
                    <div className="col-md-4">
                        <label className="form-label">Username*</label>
                        <input
                            name="username"
                            className="form-control"
                            value={form.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Password*</label>
                        <input
                            name="password"
                            type="password"
                            className="form-control"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Full Name*</label>
                        <input
                            name="fullName"
                            className="form-control"
                            value={form.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Email*</label>
                        <input
                            name="email"
                            type="email"
                            className="form-control"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Phone</label>
                        <input
                            name="phone"
                            className="form-control"
                            value={form.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Date of Birth</label>
                        <input
                            name="dob"
                            type="date"
                            className="form-control"
                            value={form.dob}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Citizen ID (CCCD)</label>
                        <input
                            name="CCCD"
                            className="form-control"
                            value={form.CCCD}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Gender</label>
                        <select
                            name="gender"
                            className="form-select"
                            value={form.gender}
                            onChange={handleChange}
                        >
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Department</label>
                        <input
                            name="department"
                            className="form-control"
                            value={form.department}
                            onChange={handleChange}
                            placeholder="Internal Medicine..."
                        />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Office</label>
                        <input
                            name="office"
                            className="form-control"
                            value={form.office}
                            onChange={handleChange}
                            placeholder="301B10..."
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">NurseID (optional)</label>
                        <input
                            name="nurseID"
                            className="form-control"
                            value={form.nurseID}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-12">
                        <label className="form-label">Address</label>
                        <input
                            name="address"
                            className="form-control"
                            value={form.address}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-12">
                        <button type="submit" className="btn btn-success">
                            Save Doctor
                        </button>
                    </div>
                </form>
            )}

            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="table-light">
                        <tr>
                            <th>ID</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Department</th>
                            <th>Office</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && (
                            <tr>
                                <td colSpan={7} className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        )}
                        {!loading && doctors.length === 0 && (
                            <tr>
                                <td colSpan={7} className="text-center text-muted">
                                    No doctors
                                </td>
                            </tr>
                        )}
                        {doctors.map((d) => (
                            <tr key={d.doctorID}>
                                <td>{d.doctorID}</td>
                                <td>{d.fullName}</td>
                                <td>{d.email}</td>
                                <td>{d.phone}</td>
                                <td>{d.department}</td>
                                <td>{d.office}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => handleDelete(d.doctorID)}
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
