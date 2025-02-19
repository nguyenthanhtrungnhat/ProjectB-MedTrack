import { PatientProps } from "./interface";

export default function PatientInformation({ image, fullName, gender, dob, phone, patientID, address, email }: PatientProps) {
    return (

        <div className="hasInformation border padding whiteBg dropShadow">
            <div className="row">
                <div className="col-8">
                    <h5 className='blueText'>Patient information</h5>
                    <p className='blueText m-4'>Full name: {fullName}</p>
                    <p className='blueText m-4'>Date of birth: {dob}</p>
                    <p className='blueText m-4'>Gender: {gender}</p>
                    <p className='blueText m-4'>Phone number: {phone}</p>
                    <p className='blueText m-4'>ID card: {patientID}</p>
                    <p className='blueText m-4'>Email: {email}</p>
                    <p className='blueText m-4'>Address: {address}</p>
                </div>
                <div className="col-4">
                    <img src={image} alt="" />
                    <p className='blueText m-4'>{patientID}</p>
                </div>
            </div>
        </div>

    )
}