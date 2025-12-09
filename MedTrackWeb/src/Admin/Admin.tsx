// MedTrackWeb/src/Admin/Admin.tsx
import { useState, useEffect } from "react";
import "../AllDesign.css";
import DoctorTable from "./DoctorTable";
import NurseTable from "./NurseTable";
import PatientTable from "./PatientTable";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface News {
    newID?: number;
    title: string;
    body: string;
    date: string;
    author: string;
    image: string;
    isActive?: number; // 1 = active, 0 = inactive
}

export default function AdminScreen() {
    const [activeTab, setActiveTab] = useState<
        "doctors" | "nurses" | "patients" | "news"
    >("doctors");

    const token = sessionStorage.getItem("token");

    // ======================= TOGGLE FORM =========================
    const [showDoctorForm, setShowDoctorForm] = useState(false);
    const [showNurseForm, setShowNurseForm] = useState(false);

    // ======================= DOCTOR FORM =========================
    const [doctorForm, setDoctorForm] = useState({
        username: "",
        password: "",
        fullName: "",
        email: "",
        department: "",
        nurseID: "",
        office: "",
    });
    const [doctorReloadKey, setDoctorReloadKey] = useState(0);

    const handleDoctorChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setDoctorForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreateDoctor = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!token) {
            toast.error("Unauthorized - please log in as admin");
            return;
        }
        if (
            !doctorForm.username ||
            !doctorForm.password ||
            !doctorForm.fullName ||
            !doctorForm.email
        ) {
            toast.error("Username, Password, Full Name, Email are required");
            return;
        }

        try {
            await axios.post(
                "http://localhost:3000/admin/doctors",
                {
                    ...doctorForm,
                    nurseID: doctorForm.nurseID ? Number(doctorForm.nurseID) : null,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Doctor account created");

            setDoctorForm({
                username: "",
                password: "",
                fullName: "",
                email: "",
                department: "",
                nurseID: "",
                office: "",
            });
            setDoctorReloadKey((k) => k + 1);
            setShowDoctorForm(false);
        } catch (err: any) {
            console.error(err);
            toast.error(err?.response?.data?.message || "Failed to create doctor");
        }
    };

    // ======================= NURSE FORM ==========================
    const [nurseForm, setNurseForm] = useState({
        username: "",
        password: "",
        fullName: "",
        email: "",
        department: "",
        roomID: "",
        image: "",
    });
    const [nurseReloadKey, setNurseReloadKey] = useState(0);

    const handleNurseChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setNurseForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreateNurse = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!token) {
            toast.error("Unauthorized - please log in as admin");
            return;
        }
        if (
            !nurseForm.username ||
            !nurseForm.password ||
            !nurseForm.fullName ||
            !nurseForm.email
        ) {
            toast.error("Username, Password, Full Name, Email are required");
            return;
        }

        try {
            await axios.post(
                "http://localhost:3000/admin/nurses",
                {
                    ...nurseForm,
                    roomID: nurseForm.roomID ? Number(nurseForm.roomID) : null,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Nurse account created");

            setNurseForm({
                username: "",
                password: "",
                fullName: "",
                email: "",
                department: "",
                roomID: "",
                image: "",
            });
            setNurseReloadKey((k) => k + 1);
            setShowNurseForm(false);
        } catch (err: any) {
            console.error(err);
            toast.error(err?.response?.data?.message || "Failed to create nurse");
        }
    };

    // ======================= NEWS STATE ==========================
    const [newsList, setNewsList] = useState<News[]>([]);
    const [newsForm, setNewsForm] = useState<News>({
        title: "",
        body: "",
        date: new Date().toISOString().slice(0, 10),
        author: "",
        image: "",
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");

    const loadNews = async () => {
        try {
            const res = await axios.get<News[]>("http://localhost:3000/news");
            setNewsList(res.data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load news list");
        }
    };

    useEffect(() => {
        if (activeTab === "news") {
            loadNews();
        }
    }, [activeTab]);

    const handleNewsFormChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setNewsForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setImageFile(file);
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        } else {
            setImagePreview("");
        }
    };

    const handleCreateNews = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!token) {
            toast.error("Unauthorized - please log in as admin");
            return;
        }
        if (!newsForm.title) {
            toast.error("Title is required");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("title", newsForm.title);
            formData.append("body", newsForm.body || "");
            formData.append("date", newsForm.date);
            formData.append("author", newsForm.author || "");

            // Nếu có file thì gửi file, nếu không thì gửi URL text
            if (imageFile) {
                formData.append("image", imageFile);
            } else if (newsForm.image) {
                formData.append("image", newsForm.image);
            }

            await axios.post("http://localhost:3000/admin/news", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            toast.success("News created successfully");
            setNewsForm({
                title: "",
                body: "",
                date: new Date().toISOString().slice(0, 10),
                author: "",
                image: "",
            });
            setImageFile(null);
            setImagePreview("");
            loadNews();
        } catch (err: any) {
            console.error(err);
            toast.error(err?.response?.data?.message || "Failed to create news");
        }
    };

    const handleToggleNewsStatus = async (news: News) => {
        if (!token) {
            toast.error("Unauthorized - please log in as admin");
            return;
        }
        if (!news.newID) return;

        const newStatus = news.isActive ? 0 : 1;

        try {
            await axios.put(
                `http://localhost:3000/admin/news/${news.newID}`,
                {
                    title: news.title,
                    body: news.body,
                    date: news.date,
                    author: news.author,
                    image: news.image,
                    isActive: newStatus,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setNewsList((prev) =>
                prev.map((n) =>
                    n.newID === news.newID ? { ...n, isActive: newStatus } : n
                )
            );
            toast.success(newStatus ? "Activated" : "Deactivated");
        } catch (err: any) {
            console.error(err);
            toast.error(err?.response?.data?.message || "Failed to change status");
        }
    };

    // ======================= JSX ================================
    return (
        <div className="mainBg pt-5 mt-5 min-vh-100">
            <ToastContainer position="top-right" />
            <div className="container-fluid padding">
                <div className="row">
                    <div className="col-12 mb-4">
                        <div className="border whiteBg dropShadow padding d-flex justify-content-between align-items-center">
                            <div>
                                <h2 className="blueText mb-1">Admin Dashboard</h2>
                                <p className="dlcgray mb-0">
                                    Manage accounts and hospital news
                                </p>
                            </div>
                            <i
                                className="fa fa-hospital-o blueText"
                                style={{ fontSize: "2.5rem" }}
                                aria-hidden="true"
                            ></i>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="border whiteBg dropShadow padding">
                            {/* Tabs */}
                            <ul className="nav nav-pills mb-3">
                                <li className="nav-item">
                                    <button
                                        className={`nav-link ${activeTab === "doctors" ? "active" : ""
                                            }`}
                                        onClick={() => setActiveTab("doctors")}
                                    >
                                        Doctors
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className={`nav-link ${activeTab === "nurses" ? "active" : ""
                                            }`}
                                        onClick={() => setActiveTab("nurses")}
                                    >
                                        Nurses
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className={`nav-link ${activeTab === "patients" ? "active" : ""
                                            }`}
                                        onClick={() => setActiveTab("patients")}
                                    >
                                        Patients
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className={`nav-link ${activeTab === "news" ? "active" : ""
                                            }`}
                                        onClick={() => setActiveTab("news")}
                                    >
                                        News Management
                                    </button>
                                </li>
                            </ul>

                            {/* ========= Doctors Tab ========= */}
                            {activeTab === "doctors" && (
                                <div className="mt-3">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h4 className="blueText mb-0">Doctor Account Management</h4>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() => setShowDoctorForm((prev) => !prev)}
                                        >
                                            {showDoctorForm ? "Close form" : "Create Doctor Account"}
                                        </button>
                                    </div>

                                    {showDoctorForm && (
                                        <form
                                            className="row g-3 mb-4 border rounded-3 p-3 bg-light"
                                            onSubmit={handleCreateDoctor}
                                        >
                                            <div className="col-md-3">
                                                <label className="form-label">Username</label>
                                                <input
                                                    name="username"
                                                    className="form-control"
                                                    value={doctorForm.username}
                                                    onChange={handleDoctorChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <label className="form-label">Password</label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    className="form-control"
                                                    value={doctorForm.password}
                                                    onChange={handleDoctorChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <label className="form-label">Full Name</label>
                                                <input
                                                    name="fullName"
                                                    className="form-control"
                                                    value={doctorForm.fullName}
                                                    onChange={handleDoctorChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <label className="form-label">Email</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    className="form-control"
                                                    value={doctorForm.email}
                                                    onChange={handleDoctorChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <label className="form-label">Department</label>
                                                <input
                                                    name="department"
                                                    className="form-control"
                                                    value={doctorForm.department}
                                                    onChange={handleDoctorChange}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <label className="form-label">
                                                    Nurse ID (optional)
                                                </label>
                                                <input
                                                    name="nurseID"
                                                    className="form-control"
                                                    value={doctorForm.nurseID}
                                                    onChange={handleDoctorChange}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <label className="form-label">Office</label>
                                                <input
                                                    name="office"
                                                    className="form-control"
                                                    value={doctorForm.office}
                                                    onChange={handleDoctorChange}
                                                />
                                            </div>
                                            <div className="col-12">
                                                <button type="submit" className="btn btn-success">
                                                    Create Doctor
                                                </button>
                                            </div>
                                        </form>
                                    )}

                                    <hr />
                                    <DoctorTable key={doctorReloadKey} />
                                </div>
                            )}

                            {/* ========= Nurses Tab ========= */}
                            {activeTab === "nurses" && (
                                <div className="mt-3">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h4 className="blueText mb-0">
                                            Nurse Account Management
                                        </h4>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() => setShowNurseForm((prev) => !prev)}
                                        >
                                            {showNurseForm ? "Close form" : "Create Nurse Account"}
                                        </button>
                                    </div>

                                    {showNurseForm && (
                                        <form
                                            className="row g-3 mb-4 border rounded-3 p-3 bg-light"
                                            onSubmit={handleCreateNurse}
                                        >
                                            <div className="col-md-3">
                                                <label className="form-label">Username</label>
                                                <input
                                                    name="username"
                                                    className="form-control"
                                                    value={nurseForm.username}
                                                    onChange={handleNurseChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <label className="form-label">Password</label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    className="form-control"
                                                    value={nurseForm.password}
                                                    onChange={handleNurseChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <label className="form-label">Full Name</label>
                                                <input
                                                    name="fullName"
                                                    className="form-control"
                                                    value={nurseForm.fullName}
                                                    onChange={handleNurseChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <label className="form-label">Email</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    className="form-control"
                                                    value={nurseForm.email}
                                                    onChange={handleNurseChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <label className="form-label">Department</label>
                                                <input
                                                    name="department"
                                                    className="form-control"
                                                    value={nurseForm.department}
                                                    onChange={handleNurseChange}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <label className="form-label">Room ID</label>
                                                <input
                                                    name="roomID"
                                                    className="form-control"
                                                    value={nurseForm.roomID}
                                                    onChange={handleNurseChange}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <label className="form-label">Image URL</label>
                                                <input
                                                    name="image"
                                                    className="form-control"
                                                    value={nurseForm.image}
                                                    onChange={handleNurseChange}
                                                    placeholder="./images/nurse-1.jpg"
                                                />
                                            </div>
                                            <div className="col-12">
                                                <button type="submit" className="btn btn-success">
                                                    Create Nurse
                                                </button>
                                            </div>
                                        </form>
                                    )}

                                    <hr />
                                    <NurseTable key={nurseReloadKey} />
                                </div>
                            )}

                            {/* ========= Patients Tab ========= */}
                            {activeTab === "patients" && (
                                <div className="mt-3">
                                    <h4 className="blueText mb-3">Patient List</h4>
                                    <PatientTable />
                                </div>
                            )}

                            {/* ========= News Tab ========= */}
                            {activeTab === "news" && (
                                <div className="mt-3">
                                    <h4 className="blueText mb-3">News Management</h4>

                                    <form className="row g-3 mb-4" onSubmit={handleCreateNews}>
                                        <div className="col-md-6">
                                            <label className="form-label">Title</label>
                                            <input
                                                type="text"
                                                name="title"
                                                className="form-control"
                                                value={newsForm.title}
                                                onChange={handleNewsFormChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-3">
                                            <label className="form-label">Date</label>
                                            <input
                                                type="date"
                                                name="date"
                                                className="form-control"
                                                value={newsForm.date}
                                                onChange={handleNewsFormChange}
                                            />
                                        </div>
                                        <div className="col-md-3">
                                            <label className="form-label">Author</label>
                                            <input
                                                type="text"
                                                name="author"
                                                className="form-control"
                                                value={newsForm.author}
                                                onChange={handleNewsFormChange}
                                                placeholder="Admin name"
                                            />
                                        </div>

                                        <div className="col-12">
                                            <label className="form-label">
                                                Image URL (optional) hoặc upload dưới đây
                                            </label>
                                            <input
                                                type="text"
                                                name="image"
                                                className="form-control mb-2"
                                                value={newsForm.image}
                                                onChange={handleNewsFormChange}
                                                placeholder="./images/banner1.webp hoặc http://..."
                                            />

                                            <div className="d-flex gap-2 align-items-center">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="form-control"
                                                    onChange={handleImageFileChange}
                                                />
                                            </div>

                                            {imagePreview && (
                                                <div className="mt-2">
                                                    <small className="text-muted d-block">Preview:</small>
                                                    <img
                                                        src={imagePreview}
                                                        alt="preview"
                                                        style={{
                                                            width: "120px",
                                                            height: "60px",
                                                            objectFit: "cover",
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        <div className="col-12">
                                            <label className="form-label">Body</label>
                                            <textarea
                                                name="body"
                                                className="form-control"
                                                rows={3}
                                                value={newsForm.body}
                                                onChange={handleNewsFormChange}
                                                placeholder="News content..."
                                            />
                                        </div>
                                        <div className="col-12">
                                            <button type="submit" className="btn btn-success">
                                                Publish News
                                            </button>
                                        </div>
                                    </form>

                                    <table className="table table-striped table-bordered">
                                        <thead className="table-light">
                                            <tr>
                                                <th>ID</th>
                                                <th>Title</th>
                                                <th>Date</th>
                                                <th>Author</th>
                                                <th>Image</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {newsList.map((n) => (
                                                <tr key={n.newID}>
                                                    <td>{n.newID}</td>
                                                    <td>{n.title}</td>
                                                    <td>{n.date}</td>
                                                    <td>{n.author}</td>
                                                    <td>
                                                        {n.image && (
                                                            <img
                                                                src={n.image}
                                                                alt={n.title}
                                                                style={{
                                                                    width: "80px",
                                                                    height: "40px",
                                                                    objectFit: "cover",
                                                                }}
                                                            />
                                                        )}
                                                    </td>
                                                    <td>
                                                        {n.isActive ? (
                                                            <span className="badge bg-success">Active</span>
                                                        ) : (
                                                            <span className="badge bg-secondary">
                                                                Inactive
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <button
                                                            className={`btn btn-sm ${n.isActive
                                                                    ? "btn-outline-secondary"
                                                                    : "btn-outline-success"
                                                                }`}
                                                            onClick={() => handleToggleNewsStatus(n)}
                                                        >
                                                            {n.isActive ? "Unactive" : "Active"}
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            {newsList.length === 0 && (
                                                <tr>
                                                    <td colSpan={7} className="text-center text-muted">
                                                        No news yet. Create one above.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
