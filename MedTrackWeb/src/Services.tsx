export default function Services() {
  return (
    <div className="container mt-5 pt-5 pb-5 mb-5">
      <h4 className="blueText headd1">Hospital Service Fees</h4>
      <p>
        Below is the price list for medical services at Becamex International Hospital.
        Prices are subject to change and may vary depending on health insurance coverage (HI).
      </p>

      {/* Outpatient Examination Services */}
      <h6 className="blueText mt-4">Medical Examination Services</h6>
      <table className="table table-bordered table-striped align-middle">
        <thead className="table-primary">
          <tr>
            <th>Service</th>
            <th>Price (VND)</th>
            <th>HI Price (VND)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Specialist Examination</td><td>123,000</td><td>33,200</td></tr>
          <tr><td>Emergency Examination</td><td>223,000</td><td>33,200</td></tr>
          <tr><td>Health Consultation</td><td>113,000</td><td>-</td></tr>
        </tbody>
      </table>

      {/* Laboratory Services */}
      <h6 className="blueText mt-4">Laboratory Services</h6>
      <table className="table table-bordered table-striped align-middle">
        <thead className="table-primary">
          <tr>
            <th>Service</th>
            <th>Price (VND)</th>
            <th>HI Price (VND)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Cervical Cancer Screening (Liquid-based Cytology)</td><td>580,000</td><td>-</td></tr>
          <tr><td>Cervical Cancer Screening (HPV Real-time PCR)</td><td>525,000</td><td>-</td></tr>
          <tr><td>Colorectal Cancer Screening</td><td>93,000</td><td>67,800</td></tr>
          <tr><td>H. Pylori Detection (Gastric Ulcer)</td><td>594,000</td><td>-</td></tr>
          <tr><td>Blood Disorder Screening (Leukemia, Aplastic Anemia, etc.)</td><td>94,000</td><td>47,500</td></tr>
          <tr><td>Kidney Function Test</td><td>53,000</td><td>21,800</td></tr>
          <tr><td>Liver Function Test</td><td>53,000</td><td>21,800</td></tr>
          <tr><td>Diabetes Screening (Glucose)</td><td>53,000</td><td>21,800</td></tr>
          <tr><td>Lipid Metabolism Disorder Evaluation</td><td>63,000</td><td>27,300</td></tr>
          <tr><td>Hepatitis B Virus Screening</td><td>126,000</td><td>77,300</td></tr>
          <tr><td>Diabetes Screening (HbA1C)</td><td>168,000</td><td>102,000</td></tr>
          <tr><td>Ovarian Cancer Screening</td><td>212,000</td><td>-</td></tr>
          <tr><td>Liver Cancer Screening</td><td>163,000</td><td>92,900</td></tr>
          <tr><td>Urinary System Screening</td><td>74,000</td><td>27,800</td></tr>
        </tbody>
      </table>

      {/* Imaging Services */}
      <h6 className="blueText mt-4">Imaging and Diagnostic Services</h6>
      <table className="table table-bordered table-striped align-middle">
        <thead className="table-primary">
          <tr>
            <th>Service</th>
            <th>Price (VND)</th>
            <th>HI Price (VND)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Low-dose Chest CT Scan (32-slice)</td><td>1,306,000</td><td>-</td></tr>
          <tr><td>Brain MRI (3.0 Tesla)</td><td>2,544,000</td><td>-</td></tr>
          <tr><td>Brain MRI (3.0 Tesla) with Contrast</td><td>3,002,000</td><td>-</td></tr>
          <tr><td>Abdominal CT Scan (256-slice, no contrast)</td><td>3,496,000</td><td>2,748,000</td></tr>
          <tr><td>Digital Mammography (Breast X-ray)</td><td>392,000</td><td>194,400</td></tr>
          <tr><td>Bone Density Scan (DEXA, 2 sites)</td><td>324,000</td><td>-</td></tr>
          <tr><td>Abdominal Doppler Ultrasound (Tumor Screening)</td><td>161,000</td><td>84,800</td></tr>
          <tr><td>Cardiac Doppler Ultrasound</td><td>385,000</td><td>233,000</td></tr>
          <tr><td>Abdominal Ultrasound (Liver, Pancreas, Spleen, Kidney, Bladder)</td><td>105,000</td><td>49,300</td></tr>
          <tr><td>Endoscopy (Esophagus–Stomach–Duodenum, no biopsy)</td><td>495,000</td><td>255,000</td></tr>
          <tr><td>Colonoscopy (Full, no biopsy)</td><td>795,000</td><td>322,000</td></tr>
          <tr><td>Rectoscopy (Soft Tube, no biopsy)</td><td>378,000</td><td>198,000</td></tr>
          <tr><td>Thyroid Ultrasound</td><td>114,000</td><td>49,300</td></tr>
          <tr><td>Breast Ultrasound (Both Sides)</td><td>114,000</td><td>49,300</td></tr>
        </tbody>
      </table>

      {/* Inpatient Room Services */}
      <h6 className="blueText mt-4">Inpatient Room Services</h6>
      <table className="table table-bordered table-striped align-middle">
        <thead className="table-primary">
          <tr>
            <th>Room Type</th>
            <th>Price (VND)</th>
            <th>HI Price (VND)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Private Room (1 bed)</td><td>1,340,000</td><td>168,100</td></tr>
          <tr><td>2-Bed Room</td><td>740,000</td><td>168,100</td></tr>
          <tr><td>3–4 Bed Room</td><td>550,000</td><td>168,100</td></tr>
          <tr><td>5–7 Bed Room</td><td>420,000</td><td>168,100</td></tr>
          <tr><td>Intensive Care Room (1 bed)</td><td>1,225,000</td><td>312,000</td></tr>
        </tbody>
      </table>

      <div className="alert alert-warning mt-4">
        <strong>Note:</strong> The above prices are for reference only and may change over time.
        Health insurance (HI) coverage for room fees depends on the patient’s medical condition.
        Prices shown do not include companion room charges.
      </div>
    </div>
  );
}
