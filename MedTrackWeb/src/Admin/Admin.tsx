import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function AdminScreen() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear(); // Clear all stored data
        toast.success("Logged out successfully!", { position: "top-right" }); // Show toast notification

        setTimeout(() => {
            navigate("/"); // Redirect to login page after toast
        }, 1000);
    };
    return (
        <>
            <ToastContainer /> {/* Add this to show notifications */}
            <div className="container padding">
                <button type="button" className="btn btn-danger w-100" onClick={handleLogout}>
                    Logout
                </button>
                <div className="row">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}