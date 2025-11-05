import { useEffect, useRef } from "react";
import type { Html5QrcodeScanner } from "html5-qrcode";
import "./QRScanner.css";

interface QRScannerProps {
  onScanComplete?: (decodedText: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScanComplete }) => {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    let isMounted = true;

    import("html5-qrcode").then((module) => {
      if (!isMounted) return;
      const { Html5QrcodeScanner } = module;

      scannerRef.current = new Html5QrcodeScanner(
        "reader",
        {
          fps: 10,
          qrbox: { width: 280, height: 280 },
        },
        false
      );

      scannerRef.current.render(
        async (decodedText: string) => {
          // ✅ Trigger callback only once
          if (onScanComplete) onScanComplete(decodedText);

          // ✅ Stop scanning completely after first successful read
          await scannerRef.current?.clear();
          scannerRef.current = null;
        },
        (errorMessage: string) => {
          if (!errorMessage.includes("NotFoundException")) {
            console.warn("QR scan error:", errorMessage);
          }
        }
      );
    });

    return () => {
      isMounted = false;
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {});
      }
    };
  }, [onScanComplete]);

  return (
    <>
      <h5 className="text-center mb-3">Scan CCCD / QR Code</h5>
      <div
        id="reader"
        className="mx-auto border rounded shadow-sm"
        style={{
          width: "320px",
          height: "320px",
          backgroundColor: "#f9f9f9",
        }}
      ></div>
    </>
  );
};

export default QRScanner;
