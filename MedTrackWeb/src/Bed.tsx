import { useNavigate } from "react-router-dom";
import { PatientProps } from "./interface";
export default function Bed({fullName,patientID}:PatientProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/home/bed-details/${patientID}`); // Change to the actual route
    };
    return (
        <>
            <div className="col-4 marginBottom">
                <button className="roomBtn"onClick={handleClick}>
                    <div className="card room">
                        <div className="card-body">
                            <h5 className="card-title">Bed {patientID}</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <h6 className='blueText text-center'>Name: {fullName} - id: {patientID}</h6>
                        </div>
                    </div>
                </button>
            </div>
        </>
    )
}   