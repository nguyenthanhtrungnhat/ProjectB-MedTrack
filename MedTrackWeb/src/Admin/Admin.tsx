
// export default function AdminScreen() {
//     return (
//         <>
//             <h1>Developing</h1>
//         </>
//     )
// }

// MedTrackWeb/src/Admin/Admin.tsx
import { useState } from "react";
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
}

export default function AdminScreen() {
    const [activeTab, setActiveTab] = useState<"doctors" | "nurses" | "patients" | "news">("doctors");

    // ----- STATE CHO NEWS -----
    const [newsList, setNewsList] = useState<News[]>([]);
    const [newsLoaded, setNewsLoaded] = useState(false);
    const [newsForm, setNewsForm] = useState<News>({
        title: "",
        body: "",
        date: new Date().toISOString().slice(0, 10),
        author: "",
        image: "",
    });
    const token = sessionStorage.getItem("token");

    const loadNews = async () => {
        try {
            const res = await axios.get<News[]>("http://localhost:3000/news");
            setNewsList(res.data);
            setNewsLoaded(true);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load news list");
        }
    };

    const handleNewsFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewsForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreateNews = async (e: React.FormEvent) => {
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
            await axios.post(
                "http://localhost:3000/admin/news",
                newsForm,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("News created successfully");
            setNewsForm({
                title: "",
                body: "",
                date: new Date().toISOString().slice(0, 10),
                author: "",
                image: "",
            });
            loadNews();
        } catch (err: any) {
            console.error(err);
            toast.error(err?.response?.data?.message || "Failed to create news");
        }
    };

    const handleDeleteNews = async (id: number | undefined) => {
        if (!id) return;
        if (!token) {
            toast.error("Unauthorized - please log in as admin");
            return;
        }
        if (!window.confirm("Are you sure you want to delete this news item?")) return;
        try {
            await axios.delete(`http://localhost:3000/admin/news/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("News deleted");
            setNewsList((prev) => prev.filter((n) => n.newID !== id));
        } catch (err: any) {
            console.error(err);
            toast.error(err?.response?.data?.message || "Failed to delete news");
        }
    };

    // Load news lần đầu khi chuyển sang tab News
    if (activeTab === "news" && !newsLoaded) {
        loadNews();
    }

    return (
        <div className="mainBg pt-5 mt-5 min-vh-100">
            <ToastContainer position="top-right" />
            <div className="container-fluid padding">
                <div className="row">
                    <div className="col-12 mb-4">
                        <div className="border whiteBg dropShadow padding d-flex justify-content-between align-items-center">
                            <div>
                                <h2 className="blueText mb-1">Admin Dashboard</h2>
                                <p className="dlcgray mb-0">Manage accounts and hospital news</p>
                            </div>
                            <i className="fa fa-hospital-o blueText" style={{ fontSize: "2.5rem" }} aria-hidden="true"></i>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="border whiteBg dropShadow padding">
                            {/* Tabs */}
                            <ul className="nav nav-pills mb-3">
                                <li className="nav-item">
                                    <button
                                        className={`nav-link ${activeTab === "doctors" ? "active" : ""}`}
                                        onClick={() => setActiveTab("doctors")}
                                    >
                                        Doctors
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className={`nav-link ${activeTab === "nurses" ? "active" : ""}`}
                                        onClick={() => setActiveTab("nurses")}
                                    >
                                        Nurses
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className={`nav-link ${activeTab === "patients" ? "active" : ""}`}
                                        onClick={() => setActiveTab("patients")}
                                    >
                                        Patients
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className={`nav-link ${activeTab === "news" ? "active" : ""}`}
                                        onClick={() => setActiveTab("news")}
                                    >
                                        News Management
                                    </button>
                                </li>
                            </ul>

                            {/* Content */}
                            {activeTab === "doctors" && <DoctorTable />}
                            {activeTab === "nurses" && <NurseTable />}
                            {activeTab === "patients" && <PatientTable />}

                            {activeTab === "news" && (
                                <div className="mt-3">
                                    <h4 className="blueText mb-3">News Management</h4>

                                    {/* Form create news */}
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
                                            <label className="form-label">Image URL</label>
                                            <input
                                                type="text"
                                                name="image"
                                                className="form-control"
                                                value={newsForm.image}
                                                onChange={handleNewsFormChange}
                                                placeholder="./images/banner1.webp"
                                            />
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

                                    {/* Table news */}
                                    <table className="table table-striped table-bordered">
                                        <thead className="table-light">
                                            <tr>
                                                <th>ID</th>
                                                <th>Title</th>
                                                <th>Date</th>
                                                <th>Author</th>
                                                <th>Image</th>
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
                                                                style={{ width: "80px", height: "40px", objectFit: "cover" }}
                                                            />
                                                        )}
                                                    </td>
                                                    {/* <td>
                                                        <button
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={() => handleDeleteNews(n.newID)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </td> */}
                                                    
                                                </tr>
                                            ))}
                                            {newsList.length === 0 && (
                                                <tr>
                                                    <td colSpan={6} className="text-center text-muted">
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
