import { NurseProps } from "./interface";

export default function NurseInformation({ image, fullName, gender, dob, phone, nurseID, address, email }: NurseProps) {
    return (
        <div className="col-6 ">
            <div className="hasInformation border padding whiteBg dropShadow">
                <div className="row">
                    <div className="col-8">
                        <h5 className='blueText'>Nurse information</h5>
                        <p className='blueText m-4'>Full name: {fullName}</p>
                        <p className='blueText m-4'>Date of birth: {dob}</p>
                        <p className='blueText m-4'>Gender: {gender}</p>
                        <p className='blueText m-4'>Phone number: {phone}</p>
                        <p className='blueText m-4'>ID card: {nurseID}</p>
                        <p className='blueText m-4'>Email: {email}</p>
                        <p className='blueText m-4'>Address: {address}</p>
                    </div>
                    <div className="col-4">
                        <img src={image} className="avtIMG" loading="lazy" />
                        <p className='blueText m-4'>{nurseID}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}