import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import QRScanner from "../QRScanner";

const getUserIDFromToken = () => {
    const token = sessionStorage.getItem("token");
    if (!token) return null;
    try {
        const decoded: any = jwtDecode(token);
        return decoded.userID;
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
};

export default function CompletePatientForm({
    onCompleted,
}: {
    onCompleted?: () => void;
}) {
    const [form, setForm] = useState({
        cccd: "", // 🔹 NEW field
        fullName: "",
        gender: "",
        dob: "",
        phone: "",
        address: "",
        BHYT: "",
        relativeName: "",
        relativeNumber: "",
    });

    const [loading, setLoading] = useState(false);
    const userID = getUserIDFromToken();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // 🔹 Handle QR scan result (CCCD + others)
    const handleQRScan = (decodedText: string) => {
        const data = decodedText.split("|");

        // Vietnamese ID card format: [0]=CCCD, [1]=BHYT, [2]=Full name, [3]=DOB, [4]=Gender, [5]=Address, [6]=Create date
        setForm((prev) => ({
            ...prev,
            cccd: data[0] || prev.cccd,
            BHYT: data[1] || prev.BHYT,
            fullName: data[2] || prev.fullName,
            dob:
                data[3] && data[3].length === 8
                    ? `${data[3].slice(4, 8)}-${data[3].slice(2, 4)}-${data[3].slice(0, 2)}`
                    : prev.dob,
            gender:
                data[4] === "Nam" || data[4] === "1"
                    ? "1"
                    : data[4] === "Nữ" || data[4] === "2"
                        ? "2"
                        : prev.gender,
            address: data[5] || prev.address,
        }));

        toast.info("QR data filled into the form!");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = sessionStorage.getItem("token");
            if (!token) {
                toast.error("You must be logged in to complete your information");
                setLoading(false);
                return;
            }

            // ✅ Send correct field names (CCCD uppercase + include userID)
            await axios.put(
                `https://projectb-medtrack.onrender.com/api/patient/complete`,
                {
                    ...form,
                    CCCD: form.cccd, // ✅ backend expects uppercase
                    userID,           // ✅ needed for query WHERE userID
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            toast.success("Personal information saved successfully!");
            if (onCompleted) onCompleted();
        } catch (err: any) {
            if (err.response?.status === 401 || err.response?.status === 403) {
                toast.error("Session expired. Please log in again.");
                sessionStorage.removeItem("token");
                setTimeout(() => (window.location.href = "/login"), 2000);
            } else if (err.response?.status === 400) {
                toast.error(err.response.data?.message || "Missing required fields");
            } else {
                toast.error("Failed to save information");
            }
        } finally {
            setLoading(false);
        }
    };

    if (!userID) {
        return (
            <h4 className="p-5 mt-5 text-center text-danger">
                Unauthorized. Please log in again.
            </h4>
        );
    }

    return (
        <div className="container pt-5 mt-5 mb-5">
            <div className="row border whiteBg dropShadow padding">
                <h4 className="blueText mb-3">Complete Your Personal Information</h4>

                {/* 🔹 Left side: QR scanner */}
                <div className="col-lg-6">
                    <QRScanner onScanComplete={handleQRScan} />
                </div>

                {/* 🔹 Right side: Manual form */}
                <div className="col-lg-6">
                    <form onSubmit={handleSubmit} className="row g-3">
                        {/* CCCD field */}
                        <div className="col-md-6">
                            <label className="form-label">Citizen ID (CCCD)</label>
                            <input
                                type="text"
                                name="cccd"
                                className="form-control"
                                value={form.cccd}
                                onChange={handleChange}
                                readOnly // since scanned data should not be edited
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

                        <div className="col-12">
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
                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span
                                            className="spinner-border spinner-border-sm me-2"
                                            role="status"
                                            aria-hidden="true"
                                        ></span>
                                        Saving...
                                    </>
                                ) : (
                                    "Save Information"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
