import { NurseProps } from "./interface";
import { useState, useEffect } from "react";

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
    const [loading, setLoading] = useState(true);

    // Simulate a short loading delay (you can remove if your data already controls this)
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="col-lg-6 col-sm-12 d-flex">
            <div className="w-100 d-flex flex-column border whiteBg marginBottom dropShadow p-3">
                <div className="row">
                    <div className="col-8">
                        <h5 className="blueText mb-3">Nurse Information</h5>

                        {loading ? (
                            // 🔹 Skeleton loader version
                            <>
                                {[...Array(7)].map((_, i) => (
                                    <div className="row mb-4" key={i}>
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
                            // 🔹 Actual data version
                            <>
                                <InfoRow label="Full name" value={fullName} />
                                <InfoRow label="Date of birth" value={dob} />
                                <InfoRow label="Gender" value={gender} />
                                <InfoRow label="Phone" value={phone} />
                                <InfoRow label="ID card" value={nurseID} />
                                <InfoRow label="Email" value={email} />
                                <InfoRow label="Address" value={address} />
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
                            image && (
                                <img
                                    src={image}
                                    className="avtIMG img-fluid rounded"
                                    alt={`${fullName}'s avatar`}
                                    loading="lazy"
                                />
                            )
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
            <div className="col-7 text-end">{value}</div>
        </div>
    );
}
