import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './../AllDesign.css';
import LoginImg from './../images/LoginImg.png';
import Logo from './../images/logo.png';
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
    roleID: number; // Define the expected roleID property
}
export default function LoginScreen() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://26.184.100.176:3000/login", { email, password });
            const { token } = response.data;

            if (!token) {
                setError("Invalid server response. Please try again.");
                return;
            }

            localStorage.setItem("token", token);
            const decodedToken = jwtDecode<CustomJwtPayload>(token);
            const roleID = decodedToken.roleID;

            if (!roleID) {
                setError("Role information missing. Please contact support.");
                return;
            }

            localStorage.setItem("roleID", roleID.toString());

            toast.success("Login successful!", { position: "top-right" });

            setTimeout(() => {
                if (roleID === 1) {
                    navigate("/doctor");
                } else if (roleID === 2) {
                    navigate("/home");
                } else if (roleID === 3) {
                    navigate("/patient");
                } else if (roleID === 666) {
                    navigate("/admin");
                } else {
                    setError("Unauthorized role. Please contact support.");
                }
            }, 1000); // Delay navigation for the toast
        } catch (err: unknown) {
            console.error("Login Error:", err);

            if (err instanceof Error) {
                // If the error is an instance of Error, check if it has a response (Axios error)
                const axiosError = err as any; // Type assertion for Axios errors
                setError(axiosError.response?.data?.error || "Server error. Please try again later.");
            } else {
                setError("An unexpected error occurred.");
            }

            toast.error("Login failed. Please check your credentials.", { position: "top-right" });
        }

    };

    return (
        <main className='h-100'>
            <ToastContainer /> {/* Add this to show notifications */}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-6 padding100 loginBg pt50">
                        <div className="mb80">
                            <img src={Logo} className="logo" alt="Logo" />
                            <span className='whiteText'><b>MedTrack</b></span>
                        </div>
                        <h1 className='whiteText'>Hi there, ....</h1>
                        <p className='mb80 whiteText'>Please sign in to start our services</p>
                        {error && <p className="text-danger">{error}</p>}
                        <form onSubmit={handleLogin}>
                            <div className="form-group">
                                <label htmlFor="email" className='whiteText'>Email address</label>
                                <input
                                    type="email"
                                    className="form-control inputLogin"
                                    id="email"
                                    placeholder='Type your email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className='whiteText'>Password</label>
                                <input
                                    type="password"
                                    className="form-control inputLogin"
                                    id="password"
                                    placeholder='Type your password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="d-flex justify-content-end">
                                <a href="#" className='whiteText'>Forgot password?</a>
                            </div>
                            <div className="mx-auto w200">
                                <button type="submit" className="btn color32AEBD w200 whiteText">Login</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-6 p-0">
                        <img src={LoginImg} className='w-100 loginPic' alt="Login" />
                    </div>
                </div>
            </div>
        </main>
    );
}
