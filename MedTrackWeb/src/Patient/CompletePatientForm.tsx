import { useState } from "react";
import axios from "axios";
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

export default function CompletePatientForm({ onCompleted }: { onCompleted?: () => void }) {
    const [form, setForm] = useState({
        cccd: "",
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
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" | null }>({
        message: "",
        type: null,
    });

    const userID = getUserIDFromToken();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // ✅ Handle QR scan result
    const handleQRScan = (decodedText: string) => {
        const data = decodedText.split("|");
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

        setToast({ message: "QR data filled into the form!", type: "success" });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setToast({ message: "", type: null });

        try {
            const token = sessionStorage.getItem("token");
            if (!token) {
                setToast({ message: "You must be logged in to complete your information", type: "error" });
                setLoading(false);
                return;
            }

            const res = await axios.put(
                `http://localhost:3000/api/patient/complete`,
                {
                    ...form,
                    CCCD: form.cccd,
                    userID,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // ✅ Check status explicitly
            if (res.status === 200 || res.status === 201) {
                setToast({ message: "Personal information saved successfully!", type: "success" });

                setForm({
                    cccd: "",
                    fullName: "",
                    gender: "",
                    dob: "",
                    phone: "",
                    address: "",
                    BHYT: "",
                    relativeName: "",
                    relativeNumber: "",
                });

                if (onCompleted) onCompleted();
            } else {
                setToast({
                    message: res.data?.message || "Unexpected response from server",
                    type: "error",
                });
            }
        } catch (err: any) {
            console.error("❌ Error:", err.response || err);
            if (err.response?.status === 401 || err.response?.status === 403) {
                setToast({ message: "Session expired. Please log in again.", type: "error" });
                sessionStorage.removeItem("token");
                setTimeout(() => (window.location.href = "/login"), 2000);
            } else if (err.response?.status === 400) {
                setToast({
                    message: err.response.data?.message || "Missing required fields",
                    type: "error",
                });
            } else {
                setToast({ message: "Failed to save information", type: "error" });
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

                {/* Toast (Bootstrap style) */}
                {toast.message && (
                    <div
                        className={`alert alert-${toast.type === "success" ? "success" : "danger"} alert-dismissible fade show`}
                        role="alert"
                    >
                        {toast.message}
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => setToast({ message: "", type: null })}
                        ></button>
                    </div>
                )}

                <div className="col-lg-6">
                    <QRScanner onScanComplete={handleQRScan} />
                </div>

                <div className="col-lg-6">
                    <form onSubmit={handleSubmit} className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Citizen ID (CCCD)</label>
                            <input
                                type="text"
                                name="cccd"
                                className="form-control"
                                value={form.cccd}
                                onChange={handleChange}
                                readOnly
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
                                type="number"
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
                                type="number"
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
