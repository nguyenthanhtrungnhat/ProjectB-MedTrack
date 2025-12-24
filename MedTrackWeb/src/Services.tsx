export default function Services() {
  return (
    <div className="container mt-5 pt-5 pb-5 mb-5">
      <h4 className="fw-bold blueText mb-2">
        Hospital Service Fees
      </h4>

      <p className="text-muted">
        Below is the price list for medical services at International Hospital.
        Prices may vary depending on health insurance (HI) coverage.
      </p>

      {/* ================= MEDICAL EXAMINATION ================= */}
      <h6 className="fw-bold blueText mt-4">
        Medical Examination Services
      </h6>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-primary">
            <tr>
              <th className="text-start">Service</th>
              <th className="text-end">Price (VND)</th>
              <th className="d-none d-md-table-cell text-end">
                HI Price (VND)
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Specialist Examination", "123,000", "33,200"],
              ["Emergency Examination", "223,000", "33,200"],
              ["Health Consultation", "113,000", "-"],
            ].map(([name, price, hi], i) => (
              <tr key={i}>
                <td className="fw-semibold">{name}</td>

                <td className="text-end">
                  <div className="fw-bold text-success">{price}</div>
                  <div className="d-md-none small text-muted">
                    HI: {hi}
                  </div>
                </td>

                <td className="d-none d-md-table-cell text-end text-muted">
                  {hi}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= LABORATORY ================= */}
      <h6 className="fw-bold blueText mt-4">
        Laboratory Services
      </h6>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-primary">
            <tr>
              <th className="text-start">Service</th>
              <th className="text-end">Price (VND)</th>
              <th className="d-none d-md-table-cell text-end">
                HI Price (VND)
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Cervical Cancer Screening (Liquid-based Cytology)", "580,000", "-"],
              ["Cervical Cancer Screening (HPV Real-time PCR)", "525,000", "-"],
              ["Colorectal Cancer Screening", "93,000", "67,800"],
              ["H. Pylori Detection (Gastric Ulcer)", "594,000", "-"],
              ["Blood Disorder Screening", "94,000", "47,500"],
              ["Kidney Function Test", "53,000", "21,800"],
              ["Liver Function Test", "53,000", "21,800"],
              ["Diabetes Screening (Glucose)", "53,000", "21,800"],
              ["Lipid Metabolism Disorder Evaluation", "63,000", "27,300"],
              ["Hepatitis B Virus Screening", "126,000", "77,300"],
              ["Diabetes Screening (HbA1C)", "168,000", "102,000"],
              ["Ovarian Cancer Screening", "212,000", "-"],
              ["Liver Cancer Screening", "163,000", "92,900"],
              ["Urinary System Screening", "74,000", "27,800"],
            ].map(([name, price, hi], i) => (
              <tr key={i}>
                <td className="fw-semibold">{name}</td>

                <td className="text-end">
                  <div className="fw-bold text-success">{price}</div>
                  <div className="d-md-none small text-muted">
                    HI: {hi}
                  </div>
                </td>

                <td className="d-none d-md-table-cell text-end text-muted">
                  {hi}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= IMAGING ================= */}
      <h6 className="fw-bold blueText mt-4">
        Imaging and Diagnostic Services
      </h6>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-primary">
            <tr>
              <th className="text-start">Service</th>
              <th className="text-end">Price (VND)</th>
              <th className="d-none d-md-table-cell text-end">
                HI Price (VND)
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Low-dose Chest CT Scan (32-slice)", "1,306,000", "-"],
              ["Brain MRI (3.0 Tesla)", "2,544,000", "-"],
              ["Brain MRI with Contrast", "3,002,000", "-"],
              ["Abdominal CT Scan (256-slice)", "3,496,000", "2,748,000"],
              ["Digital Mammography", "392,000", "194,400"],
              ["Bone Density Scan (DEXA)", "324,000", "-"],
              ["Abdominal Doppler Ultrasound", "161,000", "84,800"],
              ["Cardiac Doppler Ultrasound", "385,000", "233,000"],
              ["Abdominal Ultrasound", "105,000", "49,300"],
              ["Endoscopy (No biopsy)", "495,000", "255,000"],
              ["Colonoscopy (No biopsy)", "795,000", "322,000"],
              ["Rectoscopy", "378,000", "198,000"],
              ["Thyroid Ultrasound", "114,000", "49,300"],
              ["Breast Ultrasound (Both)", "114,000", "49,300"],
            ].map(([name, price, hi], i) => (
              <tr key={i}>
                <td className="fw-semibold">{name}</td>

                <td className="text-end">
                  <div className="fw-bold text-success">{price}</div>
                  <div className="d-md-none small text-muted">
                    HI: {hi}
                  </div>
                </td>

                <td className="d-none d-md-table-cell text-end text-muted">
                  {hi}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= ROOM ================= */}
      <h6 className="fw-bold blueText mt-4">
        Inpatient Room Services
      </h6>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-primary">
            <tr>
              <th className="text-start">Room Type</th>
              <th className="text-end">Price (VND)</th>
              <th className="d-none d-md-table-cell text-end">
                HI Price (VND)
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Private Room (1 bed)", "1,340,000", "168,100"],
              ["2-Bed Room", "740,000", "168,100"],
              ["3–4 Bed Room", "550,000", "168,100"],
              ["5–7 Bed Room", "420,000", "168,100"],
              ["Intensive Care Room", "1,225,000", "312,000"],
            ].map(([name, price, hi], i) => (
              <tr key={i}>
                <td className="fw-semibold">{name}</td>

                <td className="text-end">
                  <div className="fw-bold text-success">{price}</div>
                  <div className="d-md-none small text-muted">
                    HI: {hi}
                  </div>
                </td>

                <td className="d-none d-md-table-cell text-end">
                  {hi}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="alert alert-warning mt-4">
        <strong>Note:</strong> Prices are for reference only and may change.
        Health insurance coverage depends on medical condition.
        Companion room fees are not included.
      </div>
    </div>
  );
}
