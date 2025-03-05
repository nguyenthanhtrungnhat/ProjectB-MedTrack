import { PatientProps } from "./interface";

export default function PatientInformation({ image, fullName, gender, dob, phone, patientID, address, email, BHYT,relativeName,admissionDate,relativeNumber }: PatientProps) {
    return (

        <div className="hasInformationP border padding whiteBg dropShadow">
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
                    <p className='blueText m-4'>BHYT: {BHYT}</p>
                </div>
                <div className="col-4">
                    <img src={image} className="avtIMG" loading="lazy"/>
                    <p className='blueText m-4'>{patientID}</p>
                </div>
                <div className="col-12">
                <p className='blueText m-4 '>Date of hospital admission: {admissionDate}</p>
                <p className='blueText m-4'>Relative name: {relativeName} <span className="paddingLeft50">Relative's phone:{relativeNumber}</span> </p>
                </div>
            </div>
        </div>

    )
}