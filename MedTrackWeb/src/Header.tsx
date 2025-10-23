import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // fixed import syntax
import logo from "./images/logo.png";
import { Link } from "react-router-dom";
import PatientSearch from "./Nurse/PatientSearch";

const getUserRoleFromToken = () => {
    const token = sessionStorage.getItem("token");
    if (!token) return null;

    try {
        const decoded: any = jwtDecode(token);
        return decoded.roleID; // Extract roleID from token
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
};

export default function Header() {
    const [roleID, setRoleID] = useState<number | null>(null);
    const token = sessionStorage.getItem("token");
    useEffect(() => {
        const role = getUserRoleFromToken();
        setRoleID(role);
    }, []);

    return (
        <header className="header dropShadow fixed-top ">

            <nav className="p-3 navbar navbar-expand-lg custom-navbar navbar-dark">
                <div className="container-fluid">
                    <img src={logo} className="logo" alt="MedTrack Logo" />
                    <Link className="navbar-brand" to={"#"}>
                        <h4 className="whiteText m-0">MedTrack</h4>
                    </Link>
                    <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon "></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {roleID === 1 ? ( // Doctor
                            <>
                                <ul className="navbar-nav me-auto mb-lg-0">
                                    <li className="nav-item">
                                        <Link className="nav-link active" to={"doctor"}>
                                            <h5 className="whiteText hasHomeIcon m-0">Home</h5>
                                            <span className="sr-only">(current)</span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link whiteText" to={"/doctor/doctor-profile"}>
                                            <h5 className="whiteText hasProfileIcon m-0">Profile</h5>
                                        </Link>
                                    </li>
                                </ul>
                                <form className="d-flex" role="search">
                                    <PatientSearch />

                                </form>
                            </>
                        ) : roleID === 2 ? ( // Nurse
                            <>
                                <ul className="navbar-nav me-auto mb-lg-0">
                                    <li className="nav-item">
                                        <Link className="nav-link active" to={"/"}>
                                            <h5 className="whiteText hasHomeIcon m-0">Home</h5>
                                            <span className="sr-only">(current)</span>
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link className="nav-link whiteText" to={"/home/nurse-profile"}>
                                            <h5 className="whiteText hasProfileIcon m-0">Profile</h5>
                                        </Link>
                                    </li>

                                    <li className="nav-item dropdown">
                                        <span
                                            className="nav-link dropdown-toggle whiteText position-relative no-caret d-flex align-items-center"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            data-bs-auto-close="outside"
                                            aria-expanded="false"
                                        >
                                            <span className="inboxText m-0 hasInboxIcon">Inbox</span>
                                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                99+
                                                <span className="visually-hidden">unread messages</span>
                                            </span>
                                        </span>

                                        <ul className="dropdown-menu inbox-dropdown shadow-lg">
                                            <li><h5 className="p-3">Notifications</h5></li>
                                            <hr className="m-2" />

                                            <li>
                                                <span className="dropdown-item tdec0">
                                                    <div className="alert alert-success" role="alert">
                                                        ✅ A simple success alert with{" "}
                                                        <a href="/home" className="alert-link">
                                                            an example link
                                                        </a>.
                                                    </div>
                                                </span>
                                            </li>

                                            <li>
                                                <span className="dropdown-item tdec0">
                                                    <div className="alert alert-danger" role="alert">
                                                        ⚠️ A simple danger alert with{" "}
                                                        <a href="/home" className="alert-link">
                                                            an example link
                                                        </a>.
                                                    </div>
                                                </span>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>

                                <form className="d-flex" role="search">

                                    <PatientSearch />
                                </form>
                            </>
                        ) : roleID === 3 ? ( // Patient
                            <ul className="navbar-nav me-auto mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" to={"/patient"}>
                                        <h5 className="whiteText hasHomeIcon m-0">Home</h5>
                                        <span className="sr-only">(current)</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link whiteText" to={"/patient/patient-profile"}>
                                        <h5 className="whiteText hasProfileIcon m-0">Profile</h5>
                                    </Link>
                                </li>
                            </ul>
                        ) : null}
                        {!token && (
                            <ul className="navbar-nav me-auto mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" to={"/patient"}>
                                        <h5 className="whiteText hasHomeIcon m-0">Home</h5>
                                        <span className="sr-only">(current)</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link whiteText" to={"/login"}>
                                        <h5 className="whiteText hasProfileIcon m-0">Login</h5>
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>

            </nav>
        </header >
    );
}
