import { NurseProps } from "./interface";

export default function NurseInformation({ image, name, gender, dob, phone, id, address, email }: NurseProps) {
    return (
        <div className="col-6 ">
            <div className="hasInformation border padding whiteBg dropShadow">
                <div className="row">
                    <div className="col-8">
                        <h5 className='blueText'>Nurse information</h5>
                        <p className='blueText m-4'>Full name: {name}</p>
                        <p className='blueText m-4'>Date of birth: {dob}</p>
                        <p className='blueText m-4'>Gender: {gender}</p>
                        <p className='blueText m-4'>Phone number: {phone}</p>
                        <p className='blueText m-4'>ID card: {id}</p>
                        <p className='blueText m-4'>Email: {email}</p>
                        <p className='blueText m-4'>Address: {address}</p>
                    </div>
                    <div className="col-4">
                        <img src={image} alt="" />
                        <p className='blueText m-4'>{id}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}