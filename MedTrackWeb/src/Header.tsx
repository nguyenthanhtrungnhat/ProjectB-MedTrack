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

    useEffect(() => {
        const role = getUserRoleFromToken();
        setRoleID(role);
    }, []);

    return (
        <header className="header dropShadow fixed-top ">

            <nav className="p-3 navbar navbar-expand-lg custom-navbar">
                <div className="container-fluid">
                    <img src={logo} className="logo" alt="MedTrack Logo" />
                    <Link className="navbar-brand" to={"#"}>
                        <h4 className="whiteText">MedTrack</h4>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {roleID === 1 ? ( // Doctor
                            <>
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className="nav-link active" to={"doctor"}>
                                            <h5 className="whiteText hasHomeIcon">Home</h5>
                                            <span className="sr-only">(current)</span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link whiteText" to={"/doctor/doctor-profile"}>
                                            <h5 className="whiteText hasProfileIcon">Profile</h5>
                                        </Link>
                                    </li>

                                </ul>
                                <form className="d-flex" role="search">
                                    <PatientSearch />
                                </form>
                            </>
                        ) : roleID === 2 ? ( // Nurse
                            <>
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className="nav-link active" to={"/home"}>
                                            <h5 className="whiteText hasHomeIcon">Home</h5>
                                            <span className="sr-only">(current)</span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link whiteText" to={"/home/nurse-profile"}>
                                            <h5 className="whiteText hasProfileIcon">Profile</h5>
                                        </Link>
                                    </li>

                                </ul>
                                <form className="d-flex" role="search">
                                    <PatientSearch />
                                    {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
                                </form>
                            </>
                        ) : roleID === 3 ? ( // Patient
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" to={"/patient"}>
                                        <h5 className="whiteText hasHomeIcon">Home</h5>
                                        <span className="sr-only">(current)</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link whiteText" to={"/patient/patient-profile"}>
                                        <h5 className="whiteText hasProfileIcon">Profile</h5>
                                    </Link>
                                </li>

                                {/* <li className="nav-item dropdown ">
                                    <Link className="nav-link dropdown-toggle whiteText" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Dropdown
                                    </Link>
                                    <ul className="dropdown-menu ">
                                        <li><Link className="dropdown-item " to="#">Action</Link></li>
                                        <li><Link className="dropdown-item " to="#">Another action</Link></li>
                                        <li><Link className="dropdown-item " to="#">Something else here</Link></li>
                                    </ul>
                                </li> */}
                            </ul>
                        ) : null}
                    </div>
                </div>

            </nav>
        </header >
    );
}
