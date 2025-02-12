import { useNavigate } from "react-router-dom";
export default function Bed() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/bed-details"); // Change to the actual route
    };
    return (
        <>
            <div className="col-4 marginBottom">
                <button className="roomBtn"onClick={handleClick}>
                    <div className="card room">
                        <div className="card-body">
                            <h5 className="card-title">Bed 001</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <h6 className='blueText text-center'>Patient's name - id</h6>
                        </div>
                    </div>
                </button>
            </div>
        </>
    )
}   