import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import QRScanner from "../QRScanner";

interface DecodedToken {
    userID: string;
    [key: string]: any;
}

interface FormData {
    fullName: string;
    gender: string;
    dob: string;
    phone: string;
    address: string;
    BHYT: string;
    relativeName: string;
    relativeNumber: string;
}

const getUserIDFromToken = (): string | null => {
    const token = sessionStorage.getItem("token");
    if (!token) return null;
    try {
        const decoded = jwtDecode<DecodedToken>(token);
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
    const [form, setForm] = useState<FormData>({
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

    // ✅ Handle change for manual typing
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // ✅ When QR code scanned → auto-fill form
    const handleQRScan = (decodedText: string) => {
        const parts = decodedText.split("|");
        if (parts.length < 7) {
            toast.warning("Invalid QR code format!");
            return;
        }

        const [idNumber, code, fullName, dob, gender, address, createDate] =
            parts;

        setForm((prev) => ({
            ...prev,
            fullName: fullName || prev.fullName,
            gender:
                gender === "Nam" || gender === "1"
                    ? "1"
                    : gender === "Nữ" || gender === "2"
                    ? "2"
                    : prev.gender,
            dob: convertToISODate(dob) || prev.dob,
            address: address || prev.address,
        }));

        toast.success("QR data imported successfully!");
    };

    // ✅ Convert DDMMYYYY → YYYY-MM-DD
    const convertToISODate = (dateStr: string): string => {
        if (!dateStr || dateStr.length !== 8) return "";
        const dd = dateStr.slice(0, 2);
        const mm = dateStr.slice(2, 4);
        const yyyy = dateStr.slice(4, 8);
        return `${yyyy}-${mm}-${dd}`;
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

<<<<<<< Updated upstream
            // ✅ Call protected API (userID extracted from token server-side)
            await axios.put(
=======
            await axios.post(
>>>>>>> Stashed changes
                `https://projectb-medtrack.onrender.com/api/patient/complete`,
                { ...form, userID },
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
                <h4 className="blueText mb-3">
                    Complete Your Personal Information
                </h4>

                {/* ✅ Pass callback to QRScanner */}
                <QRScanner onScan={handleQRScan} />

                <form onSubmit={handleSubmit} className="row g-3">
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
    );
}
