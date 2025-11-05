import { useEffect, useRef, useState } from "react";

interface QRScannerProps {
    onScan?: (decodedText: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScan }) => {
    const [result, setResult] = useState("");
    const scannerRef = useRef<any>(null);

    const formatDate = (dateStr: string) => {
        if (!dateStr || dateStr.length !== 8) return dateStr;
        return `${dateStr.slice(0, 2)}-${dateStr.slice(2, 4)}-${dateStr.slice(
            4,
            8
        )}`;
    };

    useEffect(() => {
        let isMounted = true;
        import("html5-qrcode").then(({ Html5QrcodeScanner }) => {
            if (!isMounted) return;

            scannerRef.current = new Html5QrcodeScanner(
                "reader",
                { fps: 10, qrbox: { width: 250, height: 250 } },
                false
            );

            scannerRef.current.render(
                (decodedText: string) => {
                    setResult(decodedText);
                    if (onScan) onScan(decodedText);
                },
                () => {}
            );
        });

        return () => {
            isMounted = false;
            if (scannerRef.current) {
                scannerRef.current.clear().catch(() => {});
            }
        };
    }, [onScan]);

    const data = result ? result.split("|") : [];

    const labels = [
        "ID Number",
        "Code",
        "Full Name",
        "Date of Birth",
        "Gender",
        "Address",
        "Create Date",
    ];

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-lg-6">
                    <h5 className="text-center mb-3">QR Code Scanner</h5>
                    <div
                        id="reader"
                        className="mx-auto border rounded"
                        style={{ width: "320px", height: "320px" }}
                    ></div>
                </div>
                <div className="col-lg-6">
                    <h5 className="text-center">Scanned Result</h5>
                    {!result && (
                        <p className="text-center fst-italic text-secondary">
                            No QR code scanned yet.
                        </p>
                    )}
                    {result && (
                        <div className="card mx-auto" style={{ maxWidth: "540px" }}>
                            <div className="card-body">
                                {data.map((item, idx) => (
                                    <div
                                        className="d-flex justify-content-between mb-2"
                                        key={idx}
                                    >
                                        <span className="fw-semibold text-primary">
                                            {labels[idx] || `Field ${idx + 1}`}
                                        </span>
                                        <span>
                                            {idx === 3 || idx === 6
                                                ? formatDate(item)
                                                : item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QRScanner;
