import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import guild from "./images/20240530-Quy-trinh-kham-suc-khoe-TRANS-e1720236138920.webp";

const HospitalServices = () => {
  return (
    <div className="container mt-5 pt-5 pb-5 mb-5">
      <h2 className="mb-3 fw-bold blueText">
        Becamex International Hospital Services
      </h2>

      {/* ================= GUIDELINES ================= */}
      <h4 id="Guidelines" className="fw-bold blueText">
        Guidelines
      </h4>

      <ul className="mb-4">
        <li>
          Identity card or citizen identification card (or photo ID). Foreign
          customers must bring a passport.
        </li>
        <li>Health insurance card (if any).</li>
        <li>
          Medical records and prescriptions from previous examinations (if any).
        </li>
        <li>Appointment paper from previous examinations (if any).</li>
        <li>
          Customers with appointments should arrive 15 minutes early to receive
          an examination number.
        </li>
      </ul>

      <img
        src={guild}
        alt="Medical examination process"
        className="img-fluid rounded shadow-sm mb-5"
      />

      {/* ================= DEPARTMENTS ================= */}
      <h4 id="departments" className="fw-bold blueText">
        Departments
      </h4>

      <ul className="mb-5">
        <li>General Medicine</li>
        <li>Dermatology</li>
        <li>Rehabilitation Medicine</li>
        <li>Obstetrics & Gynecology</li>
        <li>Pediatrics</li>
        <li>Odontology (Dentistry)</li>
        <li>Ophthalmology</li>
      </ul>

      {/* ================= HEALTH CHECK ================= */}
      <h4 id="health-check" className="fw-bold blueText">
        Health Check Services
      </h4>

      <p>
        Becamex International Hospital provides comprehensive health check
        packages from basic to advanced, suitable for individuals and
        organizations.
      </p>

      <ul className="mb-5">
        <li>
          <strong>General health check packages</strong>
          <ul>
            <li>Men under / over 40 years old</li>
            <li>Women under / over 40 years old</li>
          </ul>
        </li>
        <li>
          <strong>Special health check services</strong>
          <ul>
            <li>Health check under Circular 14/2013</li>
            <li>Pre-marital health check</li>
            <li>Work permit health check for foreigners</li>
          </ul>
        </li>
        <li>
          <strong>Screening packages</strong>
          <ul>
            <li>Cancer screening</li>
            <li>Cardiovascular screening</li>
          </ul>
        </li>
      </ul>

      {/* ================= VACCINATION ================= */}
      <h4 id="vaccination" className="fw-bold blueText">
        Vaccination Services
      </h4>

      <p>
        Vaccination services are provided by age group and disease type,
        following the recommended immunization schedule.
      </p>

      <p className="fw-bold">Vaccination Price List</p>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-primary">
            <tr>
              <th className="text-start">Service</th>
              <th className="d-none d-md-table-cell text-start">Vaccine</th>
              <th className="d-none d-md-table-cell text-center">Dosage</th>
              <th className="d-none d-md-table-cell text-center">Origin</th>
              <th className="d-none d-md-table-cell text-center">Unit</th>
              <th className="text-end">Price (VND)</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="text-start">
                <div className="fw-semibold">Pre-vaccination screening</div>
              </td>
              <td className="d-none d-md-table-cell"></td>
              <td className="d-none d-md-table-cell"></td>
              <td className="d-none d-md-table-cell"></td>
              <td className="d-none d-md-table-cell text-center text-muted">
                time
              </td>
              <td className="text-end fw-bold text-success">55,000 ₫</td>
            </tr>

            <tr>
              <td className="text-start">
                <div className="fw-semibold">Tetanus antitoxin injection</div>
                <div className="d-md-none text-muted small">
                  SAT • 1500UI • Vietnam
                </div>
              </td>
              <td className="d-none d-md-table-cell text-muted">SAT</td>
              <td className="d-none d-md-table-cell text-center">1500UI</td>
              <td className="d-none d-md-table-cell text-center">Vietnam</td>
              <td className="d-none d-md-table-cell text-center text-muted">
                time
              </td>
              <td className="text-end fw-bold text-success">90,000 ₫</td>
            </tr>

            <tr>
              <td className="text-start">
                <div className="fw-semibold">6-in-1 vaccine</div>
                <div className="d-md-none text-muted small">
                  Infanrix Hexa • 0.5ml • Belgium
                </div>
              </td>
              <td className="d-none d-md-table-cell text-muted">
                Infanrix Hexa
              </td>
              <td className="d-none d-md-table-cell text-center">0.5ml</td>
              <td className="d-none d-md-table-cell text-center">Belgium</td>
              <td className="d-none d-md-table-cell text-center text-muted">
                time
              </td>
              <td className="text-end fw-bold text-success">
                1,015,000 ₫
              </td>
            </tr>

            <tr>
              <td className="text-start">
                <div className="fw-semibold">Influenza</div>
                <div className="d-md-none text-muted small">
                  Vaxigrip Tetra • 0.5ml • France
                </div>
              </td>
              <td className="d-none d-md-table-cell text-muted">
                Vaxigrip Tetra
              </td>
              <td className="d-none d-md-table-cell text-center">0.5ml</td>
              <td className="d-none d-md-table-cell text-center">France</td>
              <td className="d-none d-md-table-cell text-center text-muted">
                time
              </td>
              <td className="text-end fw-bold text-success">305,000 ₫</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-muted fst-italic mt-3">
        Note: Prices include pre-vaccination screening fees and may change
        without prior notice.
      </p>
    </div>
  );
};

export default HospitalServices;
