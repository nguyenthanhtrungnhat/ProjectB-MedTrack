import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import './../AllDesign.css';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterScreen() {
    const navigate = useNavigate();

    // Form states
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // UI states
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (loading) return;

        setError("");

        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            // 🔹 reCAPTCHA v3 Token
            const captchaToken = await window.grecaptcha.execute(
                "YOUR_SITE_KEY_HERE", // ← CHANGE THIS
                { action: "register" }
            );

            // 🔥 Call backend
            const response = await axios.post("http://localhost:3000/register", {
                username,
                email,
                password,
                captchaToken,
            });

            toast.success("Registration successful! Redirecting...");
            setTimeout(() => navigate("/login"), 1500);

        } catch (err: any) {
            setError(err?.response?.data?.message || "Registration failed.");
            toast.error("Registration failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="d-flex flex-column min-vh-100 pt-5">
            <ToastContainer />
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100 mt-5">

                    {/* Left Image */}
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="img-fluid"
                            alt="Register"
                        />
                    </div>

                    {/* Register Form */}
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form onSubmit={handleRegister}>
                            <h3 className="mb-4 fw-bold text-center">Create an Account</h3>

                            {/* Username */}
                            <div className="form-outline mb-4">
                                <input type="text" className="form-control form-control-lg"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                                <label className="form-label">Username</label>
                            </div>

                            {/* Email */}
                            <div className="form-outline mb-4">
                                <input type="email" className="form-control form-control-lg"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <label className="form-label">Email address</label>
                            </div>

                            {/* Password */}
                            <div className="form-outline mb-4">
                                <input type="password" className="form-control form-control-lg"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <label className="form-label">Password</label>
                            </div>

                            {/* Confirm Password */}
                            <div className="form-outline mb-4">
                                <input type="password" className="form-control form-control-lg"
                                    placeholder="Confirm password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <label className="form-label">Confirm Password</label>
                            </div>

                            {error && <div className="alert alert-danger mt-2">{error}</div>}

                            {/* Submit */}
                            <div className="text-center text-lg-start mt-3 pt-2">
                                <button type="submit"
                                    className="btn btn-primary btn-lg"
                                    disabled={loading}
                                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                                >
                                    {loading ? "Registering..." : "Register"}
                                </button>

                                <p className="small fw-bold mt-3 mb-0">
                                    Already have an account?{" "}
                                    <Link to="/login" className="link-danger">
                                        Login
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}
