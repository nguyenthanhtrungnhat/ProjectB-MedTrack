import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './../AllDesign.css';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function LoginScreen() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/login", { email, password });

            const { token, redirect } = response.data;

            if (!token || !redirect) {
                setError("Invalid server response. Please try again.");
                return;
            }
            
            sessionStorage.setItem("token", token);

            toast.success("Login successful!", { position: "top-right" });

            setTimeout(() => {
                navigate(redirect); // Use backend-provided redirect path
            }, 500); // Delay navigation for the toast
        } catch (err: unknown) {
            console.error("Login Error:", err);

            if (err instanceof Error) {
                const axiosError = err as any;
                setError(axiosError.response?.data?.error || "Server error. Please try again later.");
                console.error("Axios error message:", error);
            } else {
                setError("An unexpected error occurred.");
            }

            toast.error("Login failed. Please check your credentials.", { position: "top-right" });
        }
    };

    return (
        <section className="d-flex flex-column min-vh-100 pt-5">
            <ToastContainer /> {/* Add this to show notifications */}
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100 mt-5">
                    {/* Left image */}
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="img-fluid"
                            alt="Sample"
                        />
                    </div>

                    {/* Right form */}
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form onSubmit={handleLogin}>
                            {/* Social login buttons */}
                            <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                <p className="lead fw-normal mb-0 me-3">Sign in with</p>

                                <button type="button" className="btn btn-primary btn-floating mx-1">
                                    <i className="fab fa-facebook-f"></i>
                                </button>

                                <button type="button" className="btn btn-primary btn-floating mx-1">
                                    <i className="fab fa-twitter"></i>
                                </button>

                                <button type="button" className="btn btn-primary btn-floating mx-1">
                                    <i className="fab fa-linkedin-in"></i>
                                </button>
                            </div>

                            <div className="divider d-flex align-items-center my-4">
                                <p className="text-center fw-bold mx-3 mb-0">Or</p>
                            </div>

                            {/* Email input */}
                            <div className="form-outline mb-4">
                                <input
                                    type="email"
                                    className="form-control form-control-lg"
                                    placeholder="Enter a valid email address"
                                    id="form3Example3"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <label className="form-label" htmlFor="form3Example3">
                                    Email address
                                </label>
                            </div>

                            {/* Password input */}
                            <div className="form-outline mb-3">
                                <input
                                    type="password"
                                    id="form3Example4"
                                    className="form-control form-control-lg"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <label className="form-label" htmlFor="form3Example4">
                                    Password
                                </label>
                            </div>

                            <div className="d-flex justify-content-between align-items-center">
                                {/* Checkbox */}
                                <div className="form-check mb-0">
                                    <input
                                        className="form-check-input me-2"
                                        type="checkbox"
                                        value=""
                                        id="form2Example3"
                                    />
                                    <label className="form-check-label" htmlFor="form2Example3">
                                        Remember me
                                    </label>
                                </div>
                                <a href="#!" className="text-body">
                                    Forgot password?
                                </a>
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg"
                                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                                >
                                    Login
                                </button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">
                                    Don't have an account?{" "}
                                    <a href="./register" className="link-danger">
                                        Register
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Footer bar */}
            <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 blueBg mt-auto">
                <div className="text-white mb-3 mb-md-0">
                    Copyright © 2020. All rights reserved.
                </div>
                <div>
                    <a href="#!" className="text-white me-4">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#!" className="text-white me-4">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#!" className="text-white me-4">
                        <i className="fab fa-google"></i>
                    </a>
                    <a href="#!" className="text-white">
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                </div>
            </div>
        </section>
       
    );
}

 /* <div className="container-fluid">
            <div className="row">
                <div className="col-6 padding100 loginBg pt50">
                    <div className="mb80">
                        <img src={Logo} className="logo" alt="Logo" />
                        <span className='whiteText'><b>MedTrack</b></span>
                    </div>
                    <h1 className='whiteText'>Hi there, ....</h1>
                   
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
                            <button type="submit" className="btn btn-success w200">Login</button>
                        </div>
                    </form>
                     <p className='whiteText'>Please sign in to start our services</p>
                    {error && <p className="text-danger">{error}</p>}
                </div>
                <div className="col-6 p-0">
                    <img src={LoginImg} className='w-100 loginPic' alt="Login" />
                </div>
            </div>
        </div> */
