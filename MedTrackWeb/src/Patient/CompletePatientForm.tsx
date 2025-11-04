// 📄 src/components/CompletePatientForm.tsx
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface CompletePatientFormProps {
    userID: number;
    onCompleted: () => void;
}

export default function CompletePatientForm({ userID, onCompleted }: CompletePatientFormProps) {
    const [form, setForm] = useState({
        fullName: "",
        gender: "",
        dob: "",
        phone: "",
        address: "",
        BHYT: "",
        relativeName: "",
        relativeNumber: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("You must be logged in to complete your information");
                return;
            }

            await axios.post(
                `https://projectb-medtrack.onrender.com/api/patient/complete`,
                { userID, ...form },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            toast.success("Personal information saved successfully!");
            onCompleted();
        } catch (err: any) {
            if (err.response?.status === 401) {
                toast.error("Session expired. Please log in again.");
            } else if (err.response?.status === 400) {
                toast.error(err.response.data?.message || "Missing required fields");
            } else {
                toast.error("Failed to save information");
            }
        }
    };

    return (
        <div className="container pt-5 mt-5 mb-5 pt-5">
            <div className="row border whiteBg dropShadow padding">
                <h4 className="blueText">
                    Please Complete Your Personal Information to Access Other Functions
                </h4>

                <form onSubmit={handleSubmit} className="row g-3 mt-">
                    <div className="col-md-6">
                        <label className="form-label">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            className="form-control"
                            value={form.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Gender</label>
                        <select
                            name="gender"
                            className="form-select"
                            value={form.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select</option>
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Date of Birth</label>
                        <input
                            type="date"
                            name="dob"
                            className="form-control"
                            value={form.dob}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            className="form-control"
                            value={form.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Address</label>
                        <input
                            type="text"
                            name="address"
                            className="form-control"
                            value={form.address}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Health Insurance (BHYT)</label>
                        <input
                            type="text"
                            name="BHYT"
                            className="form-control"
                            value={form.BHYT}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Relative’s Name</label>
                        <input
                            type="text"
                            name="relativeName"
                            className="form-control"
                            value={form.relativeName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Relative’s Phone</label>
                        <input
                            type="text"
                            name="relativeNumber"
                            className="form-control"
                            value={form.relativeNumber}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-12">
                        <button type="submit" className="btn btn-primary w-100">
                            Save Information
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
