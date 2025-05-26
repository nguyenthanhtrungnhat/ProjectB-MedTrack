import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import logo from "./images/logo.png";
import { Link } from "react-router-dom";

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
        <header className="header dropShadow fixed-top">
            <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
                <img src={logo} className="logo" />
                <Link className="navbar-brand" to={"#"}>
                    <h4 className="whiteText">MedTrack</h4>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        {roleID === 1 ? ( // Doctor
                            <>
                                <Link className="nav-link active" to={"doctor"}>
                                    <h5 className="whiteText hasHomeIcon">Home</h5>
                                    <span className="sr-only">(current)</span>
                                </Link>
                                <Link className="nav-link whiteText" to={"/doctor/doctor-profile"}>
                                    <h5 className="whiteText hasProfileIcon">Profile</h5>
                                </Link>
                            </>
                        ) : roleID === 2 ? ( // Nurse
                            <>
                                <Link className="nav-link active" to={"/home"}>
                                    <h5 className="whiteText hasHomeIcon">Home</h5>
                                    <span className="sr-only">(current)</span>
                                </Link>
                                <Link className="nav-link whiteText" to={"/home/nurse-profile"}>
                                    <h5 className="whiteText hasProfileIcon">Profile</h5>
                                </Link>
                            </>
                        )  : roleID === 3 ? ( // Patient
                            <>
                                <Link className="nav-link active" to={"/patient"}>
                                    <h5 className="whiteText hasHomeIcon">Home</h5>
                                    <span className="sr-only">(current)</span>
                                </Link>
                                <Link className="nav-link whiteText" to={"/patient/patient-profile"}>
                                    <h5 className="whiteText hasProfileIcon">Profile</h5>
                                </Link>
                            </>
                        ) : null}
                    </div>
                </div>
            </nav>
        </header>
    );
}
