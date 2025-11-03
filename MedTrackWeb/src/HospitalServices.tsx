import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./HospitalServices.css";

const HospitalServices = () => {
  return (
    
    <div className="container-fluid mt-5">
        <hr />
      <h2 className="text-center mb-4 headd1 blueText">
        Becamex International Hospital Services
      </h2>
      <div className="row">
        {/* Sidebar list */}
        <div className="col-md-4 mb-3">
          <div
            id="list-example"
            className="list-group shadow-sm rounded-3 sticky-sidebar"
          >
            <a
              className="list-group-item list-group-item-action"
              href="#departments"
            >
              Departments
            </a>
            <a
              className="list-group-item list-group-item-action"
              href="#health-check"
            >
              Health Check Services
            </a>
            <a
              className="list-group-item list-group-item-action"
              href="#vaccination"
            >
              Vaccination Services
            </a>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="col-md-8">
          <div
            data-bs-spy="scroll"
            data-bs-target="#list-example"
            data-bs-smooth-scroll="true"
            className="scrollspy-example border rounded-3 p-4 bg-light"
            tabIndex={0}
          >
            {/* ---------------- Departments ---------------- */}
            <h4 id="departments" className="fw-bold text-primary">
              Departments
            </h4>
            <ul>
              <li>General Medicine</li>
              <li>Dermatology</li>
              <li>Rehabilitation Medicine</li>
              <li>Obstetrics & Gynecology</li>
              <li>Pediatrics</li>
              <li>Odontology (Dentistry)</li>
              <li>Ophthalmology</li>
            </ul>

            {/* ---------------- Health Check ---------------- */}
            <h4 id="health-check" className="fw-bold text-primary mt-4">
              Health Check Services
            </h4>
            <p>
              Becamex International Hospital provides a wide range of health
              check packages — from basic to advanced — to suit individual
              needs. These include:
            </p>
            <ul>
              <li>
                <strong>General health check packages</strong>:
                <ul>
                  <li>For men under/over 40 years old</li>
                  <li>For women under/over 40 years old</li>
                </ul>
              </li>
              <li>
                <strong>Other check-up services</strong>:
                <ul>
                  <li>Health check under Circular 14/2013</li>
                  <li>Pre-marital health check</li>
                  <li>
                    Health check for foreigners or Vietnamese applying for work
                    permits
                  </li>
                </ul>
              </li>
              <li>
                <strong>Screening packages</strong>:
                <ul>
                  <li>Cancer screening</li>
                  <li>Cardiovascular screening</li>
                </ul>
              </li>
            </ul>

            {/* ---------------- Vaccination Services ---------------- */}
            <h4 id="vaccination" className="fw-bold text-primary mt-4">
              Vaccination Services
            </h4>
            <p>
              Becamex International Hospital provides vaccination services
              categorized by disease and age group. Parents can bring their
              children according to the recommended vaccination schedule.
            </p>

            <p className="fw-bold">Below is the vaccination price list:</p>

            <div className="table-responsive">
              <table className="table table-bordered table-striped align-middle">
                <thead className="table-primary">
                  <tr>
                    <th>Service</th>
                    <th>Vaccine Name</th>
                    <th>Dosage</th>
                    <th>Origin</th>
                    <th>Unit</th>
                    <th>Price (VND)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Pre-vaccination screening</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>time</td>
                    <td>55,000</td>
                  </tr>
                  <tr>
                    <td>Tetanus antitoxin injection</td>
                    <td>SAT</td>
                    <td>1500UI</td>
                    <td>Vietnam</td>
                    <td>time</td>
                    <td>90,000</td>
                  </tr>
                  <tr>
                    <td>6-in-1 vaccine</td>
                    <td>Infanrix Hexa</td>
                    <td>0.5ml</td>
                    <td>Belgium</td>
                    <td>time</td>
                    <td>1,015,000</td>
                  </tr>
                  <tr>
                    <td>6-in-1 vaccine</td>
                    <td>Hexaxim</td>
                    <td>0.5ml</td>
                    <td>Belgium</td>
                    <td>time</td>
                    <td>1,015,000</td>
                  </tr>
                  <tr>
                    <td>Meningococcal ACYW</td>
                    <td>Menactra</td>
                    <td>0.5ml</td>
                    <td>Belgium</td>
                    <td>time</td>
                    <td>1,315,000</td>
                  </tr>
                  <tr>
                    <td>Pneumococcal + H. Influenzae</td>
                    <td>Synflorix</td>
                    <td>0.5ml</td>
                    <td>Belgium</td>
                    <td>time</td>
                    <td>1,035,000</td>
                  </tr>
                  <tr>
                    <td>Influenza</td>
                    <td>Vaxigrip TETRA</td>
                    <td>0.5ml</td>
                    <td>France</td>
                    <td>time</td>
                    <td>305,000</td>
                  </tr>
                  <tr>
                    <td>Measles, mumps, rubella</td>
                    <td>Prioxix</td>
                    <td>0.5ml</td>
                    <td>Belgium</td>
                    <td>time</td>
                    <td>440,000</td>
                  </tr>
                  <tr>
                    <td>Chickenpox</td>
                    <td>Varilrix</td>
                    <td>0.5ml</td>
                    <td>Belgium</td>
                    <td>time</td>
                    <td>890,000</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-3">
              <strong>Note:</strong> Vaccine prices include pre-vaccination
              screening fees. Prices are for reference and may change.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalServices;
