import { NurseProps } from "./interface";

function InfoRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="row mb-3">
      <div className="col-5 text-start blueText">
        <strong>{label}:</strong>
      </div>
      <div className="col-7 text-end">
        {value ? (
          value
        ) : (
          <span className="placeholder-glow">
            <span className="placeholder col-8"></span>
          </span>
        )}
      </div>
    </div>
  );
}

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
    <div className="col-lg-6 col-sm-12 d-flex">
      <div className="w-100 d-flex flex-column border whiteBg marginBottom dropShadow p-3">
        <div className="row">
          {/* Left section: Nurse info */}
          <div className="col-8">
            <h5 className="blueText mb-3">Nurse Information</h5>

            <InfoRow label="Full name" value={fullName} />
            <InfoRow label="Date of birth" value={dob} />
            <InfoRow label="Gender" value={gender} />
            <InfoRow label="Phone" value={phone} />
            <InfoRow label="ID card" value={nurseID} />
            <InfoRow label="Email" value={email} />
            <InfoRow label="Address" value={address} />
          </div>

          {/* Right section: Avatar */}
          <div className="col-4 d-flex justify-content-center align-items-start">
            {image ? (
              <img
                src={image}
                className="avtIMG img-fluid rounded"
                alt={`${fullName || "Nurse"}'s avatar`}
                loading="lazy"
              />
            ) : (
              <div
                className="placeholder-glow"
                style={{ width: "100px", height: "100px" }}
              >
                <div className="placeholder w-100 h-100 rounded"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
