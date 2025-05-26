import { NurseProps } from "./interface";

export default function NurseInformation({ image, fullName, gender, dob, phone, nurseID, address, email }: NurseProps) {
    return (
        <div className="col-6 ">
            <div className="hasInformation border padding whiteBg dropShadow">
                <div className="row">
                    <div className="col-8">
                    <h5 className='blueText'>Nurse information</h5>
                    <div className="d-flex bd-highlight h-46px">
                        <div className="p-2 bd-highlight">
                            <p className='blueText'> <b>Full name:</b> </p>
                        </div>
                        <div className="me-auto p-2 bd-highlight">{fullName}</div>
                    </div>
                    <div className="d-flex bd-highlight h-46px">
                        <div className="p-2 bd-highlight">
                            <p className='blueText'><b>Date of birth: </b></p>
                        </div>
                        <div className="me-auto p-2 bd-highlight">{dob}</div>
                    </div>
                    <div className="d-flex bd-highlight h-46px">
                        <div className="p-2 bd-highlight">
                            <p className='blueText'><b>Gender:  </b></p>
                        </div>
                        <div className="me-auto p-2 bd-highlight">{gender}</div>
                    </div>
                    <div className="d-flex bd-highlight h-46px">
                        <div className="p-2 bd-highlight">
                            <p className='blueText'><b>Phone number:</b></p>
                        </div>
                        <div className="me-auto p-2 bd-highlight">{phone}</div>
                    </div>
                    <div className="d-flex bd-highlight h-46px">
                        <div className="p-2 bd-highlight">
                            <p className='blueText'><b>ID card:</b></p>
                        </div>
                        <div className="me-auto p-2 bd-highlight">{nurseID}</div>
                    </div>
                    <div className="d-flex bd-highlight h-46px ">
                        <div className="p-2 bd-highlight">
                            <p className='blueText'><b>Email:</b></p>
                        </div>
                        <div className="me-auto p-2 bd-highlight">{email}</div>
                    </div>
                    <div className="d-flex bd-highlight h-46px">
                        <div className="p-2 bd-highlight">
                            <p className='blueText'><b>Address:</b></p>
                        </div>
                        <div className="me-auto p-2 bd-highlight">{address}</div>
                    </div>
                </div>
                    <div className="col-4">
                        <img src={image} className="avtIMG" loading="lazy" />
                    </div>
                </div>
            </div>
        </div>
    )
}