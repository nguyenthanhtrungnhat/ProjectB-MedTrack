import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './../AllDesign.css';
import LoginImg from './../images/LoginImg.png';
import Logo from './../images/logo.png';

export default function LoginScreen() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/login", { email, password });
            localStorage.setItem("token", response.data.token);
            navigate(`/home`);
        } catch (err) {
            setError(err.response?.data?.error || "Server error. Please try again later.");
        }
    };

    return (
        <main className='h-100'>
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
