import { PatientProps } from "./interface";

export default function PatientInformation({ image, fullName, gender, dob, phone, patientID, address, email, BHYT, relativeName, admissionDate, relativeNumber }: PatientProps) {
    return (

        <div className="hasInformationP border padding whiteBg dropShadow">
            <div className="row">
                <div className="col-8">
                    <h5 className='blueText'>Patient information</h5>
                    <div className="d-flex bd-highlight h-46px">
                        <div className="p-2 bd-highlight">
                            <p className='blueText'> <b>Full name:</b> </p>
                        </div>
                        <div className="ml-auto p-2 bd-highlight">{fullName}</div>
                    </div>
                    <div className="d-flex bd-highlight h-46px">
                        <div className="p-2 bd-highlight">
                            <p className='blueText'><b>Date of birth: </b></p>
                        </div>
                        <div className="ml-auto p-2 bd-highlight">{dob}</div>
                    </div>
                    <div className="d-flex bd-highlight h-46px">
                        <div className="p-2 bd-highlight">
                            <p className='blueText'><b>Gender:  </b></p>
                        </div>
                        <div className="ml-auto p-2 bd-highlight">{gender}</div>
                    </div>
                    <div className="d-flex bd-highlight h-46px">
                        <div className="p-2 bd-highlight">
                            <p className='blueText'><b>Phone number:</b></p>
                        </div>
                        <div className="ml-auto p-2 bd-highlight">{phone}</div>
                    </div>
                    <div className="d-flex bd-highlight h-46px">
                        <div className="p-2 bd-highlight">
                            <p className='blueText'><b>ID card:</b></p>
                        </div>
                        <div className="ml-auto p-2 bd-highlight">{patientID}</div>
                    </div>
                    <div className="d-flex bd-highlight h-46px ">
                        <div className="p-2 bd-highlight">
                            <p className='blueText'><b>Email:</b></p>
                        </div>
                        <div className="ml-auto p-2 bd-highlight">{email}</div>
                    </div>
                    <div className="d-flex bd-highlight h-46px">
                        <div className="p-2 bd-highlight">
                            <p className='blueText'><b>Address:</b></p>
                        </div>
                        <div className="ml-auto p-2 bd-highlight">{address}</div>
                    </div>
                    <div className="d-flex bd-highlight h-46px">
                        <div className="p-2 bd-highlight">
                            <p className='blueText'><b>BHYT:</b></p>
                        </div>
                        <div className="ml-auto p-2 bd-highlight">{BHYT}</div>
                    </div>
                </div>
                <div className="col-4">
                    <img src={image} className="avtIMG" loading="lazy" />
                </div>
                <div className="col-12">
                    <div className="d-flex bd-highlight h-46px">
                        <div className="p-2 bd-highlight">
                            <p className='blueText'><b>Date of hospital admission:</b></p>
                        </div>
                        <div className="ml-auto p-2 bd-highlight">{admissionDate}</div>
                    </div>
                    <div className="d-flex bd-highlight h-46px">
                        <div className="p-2 bd-highlight">
                            <p ><b className='blueText'>Relative name:</b > <span>{relativeName}</span></p>
                        </div>
                        <div className="ml-auto p-2 bd-highlight">
                        <p ><b className='blueText'>Relative's phone:</b > <span>{relativeNumber}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}