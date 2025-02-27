import './../AllDesign.css';
import LoginImg from './../images/LoginImg.png';
import Logo from './../images/logo.png';
import { useNavigate } from "react-router-dom";
export default function LoginScreen() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/home`);
    };
    return (
        <main className=' h-100'>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-6 padding100 loginBg pt50">
                        <div className="mb80">
                            <img src={Logo} className="logo" />
                            <span className='whiteText'><b>MedTrack</b></span>
                        </div>
                        <h1 className='whiteText'>Hi there, ....</h1>
                        <p className='mb80 whiteText'>Please sign in to start our services</p>
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1" className='whiteText'>Email address</label>
                                <input type="email" className="form-control inputLogin" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Type your user name' />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1" className='whiteText'>Password</label>
                                <input type="password" className="form-control inputLogin" id="exampleInputPassword1" placeholder='Type your password' />
                            </div>
                            <div className="d-flex justify-content-end">
                                <a href="#" className='whiteText'>Forgot password?</a>
                            </div>
                            <div className="mx-auto w200" >
                                <button type="submit" className="btn color32AEBD w200 whiteText" onClick={handleClick}>Login</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-6 p-0 ">
                        <img src={LoginImg} className='w-100 loginPic' />
                    </div>
                </div>
            </div>
        </main>
    )
}
