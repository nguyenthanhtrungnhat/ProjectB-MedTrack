import { PatientProps } from "./interface";

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="row mb-3">
      <div className="col-5 text-start blueText">
        <strong>{label}:</strong>
      </div>
      <div className="col-7 text-end">
        {value}
      </div>
    </div>
  );
}

export default function PatientInformation({
  image,
  fullName,
  gender,
  dob,
  phone,
  patientID,
  address,
  email,
  BHYT,
  relativeName,
  admissionDate,
  relativeNumber,
}: PatientProps) {
  return (
    <div className="row">
      <div className="col-8 ">
        <h5 className="blueText mb-3">Patient Information</h5>
        <InfoRow label="Full name" value={fullName} />
        <InfoRow label="Date of birth" value={dob} />
        <InfoRow label="Gender" value={gender} />
        <InfoRow label="Phone" value={phone} />
        <InfoRow label="ID card" value={patientID} />
        <InfoRow label="Email" value={email} />
        <InfoRow label="Address" value={address} />
        <InfoRow label="BHYT" value={BHYT} />
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
      <div className="col-12 mt-0">
        <InfoRow label="Date of admission" value={admissionDate} />
        <InfoRow label="Relative name" value={relativeName} />
        <InfoRow label="Relative's phone" value={relativeNumber} />
      </div>
    </div>
  );
}
