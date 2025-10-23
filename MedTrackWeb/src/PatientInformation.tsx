import { PatientProps } from "./interface";
import { useState, useEffect } from "react";

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="row mb-3">
      <div className="col-5 text-start blueText">
        <strong>{label}:</strong>
      </div>
      <div className="col-7 text-end">{value}</div>
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
  const [loading, setLoading] = useState(true);

  // Simulate or wait for API data
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="row">
      <div className="col-8">
        <h5 className="blueText mb-3">Patient Information</h5>

        {loading ? (
          // 🔹 Skeleton loader while waiting
          <>
            {[...Array(10)].map((_, i) => (
              <div className="row mb-3" key={i}>
                <div className="col-5">
                  <span className="placeholder col-8"></span>
                </div>
                <div className="col-7 text-end">
                  <span className="placeholder col-10"></span>
                </div>
              </div>
            ))}
          </>
        ) : (
          // 🔹 Real patient data
          <>
            <InfoRow label="Full name" value={fullName} />
            <InfoRow label="Date of birth" value={dob} />
            <InfoRow label="Gender" value={gender} />
            <InfoRow label="Phone" value={`${phone}`} />
            <InfoRow label="ID card" value={`${patientID}`} />
            <InfoRow label="Email" value={email} />
            <InfoRow label="Address" value={address} />
            <InfoRow label="BHYT" value={BHYT ?? ""} />
          </>
        )}
      </div>

      <div className="col-4 d-flex justify-content-center align-items-start">
        {loading ? (
          <div
            className="placeholder rounded"
            style={{ width: "100px", height: "100px" }}
          ></div>
        ) : (
          <img
            src={
              image ||
              "https://www.kindpng.com/picc/m/421-4212275_transparent-default-avatar-png-avatar-img-png-download.png"
            }
            className="avtIMG img-fluid rounded"
            alt={`${fullName}'s avatar`}
            loading="lazy"
          />
        )}
      </div>

      <div className="col-12 mt-0">
        {loading ? (
          <>
            {[...Array(3)].map((_, i) => (
              <div className="row mb-3" key={i}>
                <div className="col-5">
                  <span className="placeholder col-8"></span>
                </div>
                <div className="col-7 text-end">
                  <span className="placeholder col-10"></span>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <InfoRow label="Date of admission" value={admissionDate ?? ""} />
            <InfoRow label="Relative name" value={relativeName ?? ""} />
            <InfoRow label="Relative's phone" value={`${relativeNumber}`} />
          </>
        )}
      </div>
    </div>
  );
}
