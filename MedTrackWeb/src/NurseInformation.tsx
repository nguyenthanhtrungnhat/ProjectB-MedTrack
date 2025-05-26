import { NurseProps } from "./interface";

export default function NurseInformation({
    image,
    fullName,
    gender,
    dob,
    phone,
    nurseID,
    address,
    email,
}: NurseProps) {
    return (
        <div className="col-6">
            <div className="hasInformation border padding whiteBg dropShadow">
                <div className="row">
                    <div className="col-8">
                        <h5 className="blueText mb-3">Nurse Information</h5>
                        <InfoRow label="Full name" value={fullName} />
                        <InfoRow label="Date of birth" value={dob} />
                        <InfoRow label="Gender" value={gender} />
                        <InfoRow label="Phone number" value={phone} />
                        <InfoRow label="ID card" value={nurseID} />
                        <InfoRow label="Email" value={email} />
                        <InfoRow label="Address" value={address} />
                    </div>
                    <div className="col-4 d-flex justify-content-center align-items-start">
                        {image && (
                            <img
                                src={image}
                                className="avtIMG img-fluid rounded"
                                alt={`${fullName}'s avatar`}
                                loading="lazy"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="row mb-4">
            <div className="col-5 text-start blueText">
                <strong>{label}:</strong>
            </div>
            <div className="col-7 text-end">
                {value}
            </div>
        </div>
    );
}
