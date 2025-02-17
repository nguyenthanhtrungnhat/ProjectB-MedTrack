import { useNavigate } from "react-router-dom";
export default function Room() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/beds-in-room"); // Change to the actual route
    };
    return (
        <>
            <div className="col-4 marginBottom">
                <button className="roomBtn"onClick={handleClick}>
                    <div className="card room">
                        <div className="card-body">
                            <h5 className="card-title">Room 001</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <h6 className='blueText text-center'>Emergency Department</h6>
                        </div>
                    </div>
                </button>
            </div>
        </>
    )
}   