import { useNavigate } from "react-router-dom";
import { SidebarInfoProps } from "./interface";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Initialize Toastify once in the app
import { ToastContainer } from "react-toastify";

export default function SidebarLogin({ phone, fullName }: SidebarInfoProps) {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear(); // Clear all stored data
        toast.success("Logged out successfully!", { position: "top-right" }); // Show toast notification
        
        setTimeout(() => {
            navigate("/"); // Redirect to login page after toast
        }, 1000);
    };

    return (
        <>
            <ToastContainer /> {/* Add this to show notifications */}
            <h6 className='whiteText blueBg loginHead'>Account</h6>
            <div className="padding">
                <p className='blueText'>{phone}</p>
                <p className='blueText'>{fullName}</p>
                <div className="d-flex justify-content-center marginBottom">
                    <button type="button" className="btn btn-danger w-100" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
}
