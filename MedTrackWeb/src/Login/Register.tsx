import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './../AllDesign.css';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterScreen() {
    const navigate = useNavigate();
    // const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        // ✅ Frontend validation
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            toast.error("Passwords do not match.", { position: "top-right" });
            return;
        }

        try {
            // ✅ Call backend API
            // const response = await axios.post("http://localhost:3000/register", {
            //     name,
            //     email,
            //     password,
            // });

            // Expect backend to return { message: "User created successfully" }
            toast.success("Registration successful! Redirecting to login...", {
                position: "top-right",
            });

            // Redirect after short delay
            setTimeout(() => navigate("/login"), 1500);
        } catch (err: unknown) {
            console.error("Register Error:", err);
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || "Registration failed.");
            } else {
                setError("Unexpected error occurred.");
            }
            toast.error("Registration failed. Please try again.", { position: "top-right" });
        }
    };

    return (
        <section className="d-flex flex-column min-vh-100 pt-5">
            <ToastContainer />
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100 mt-5">
                    {/* Left image */}
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="img-fluid"
                            alt="Register"
                        />
                    </div>

                    {/* Right form */}
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form onSubmit={handleRegister}>
                            <h3 className="mb-4 fw-bold text-center">Create an Account</h3>

                            {/* Email */}
                            <div className="form-outline mb-4">
                                <input
                                    type="email"
                                    className="form-control form-control-lg"
                                    placeholder="Enter a valid email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <label className="form-label">Email address</label>
                            </div>

                            {/* Password */}
                            <div className="form-outline mb-3">
                                <input
                                    type="password"
                                    className="form-control form-control-lg"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <label className="form-label">Password</label>
                            </div>

                            {/* Confirm Password */}
                            <div className="form-outline mb-3">
                                <input
                                    type="password"
                                    className="form-control form-control-lg"
                                    placeholder="Confirm password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <label className="form-label">Confirm Password</label>
                            </div>

                            {/* Inline error */}
                            {error && <div className="alert alert-danger mt-3">{error}</div>}

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg"
                                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                                >
                                    Register
                                </button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">
                                    Already have an account?{" "}
                                    <a href="/login" className="link-danger">
                                        Login
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 blueBg mt-auto">
                <div className="text-white mb-3 mb-md-0">
                    Copyright © 2025. All rights reserved.
                </div>
                <div>
                    <a href="#!" className="text-white me-4"><i className="fab fa-facebook-f"></i></a>
                    <a href="#!" className="text-white me-4"><i className="fab fa-twitter"></i></a>
                    <a href="#!" className="text-white me-4"><i className="fab fa-google"></i></a>
                    <a href="#!" className="text-white"><i className="fab fa-linkedin-in"></i></a>
                </div>
            </div>
        </section>
    );
}
