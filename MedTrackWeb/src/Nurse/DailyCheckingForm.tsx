import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Header";
import { FormData } from '../interface';

interface Patient {
  patientID: number;
  fullName: string;
  email: string;
  image: string;
}
const token = sessionStorage.getItem("token");

export default function DailyCheckingForm() {
  const nurseID = sessionStorage.getItem("nurseID");
  console.log("NurseID", nurseID);

  const [formData, setFormData] = useState<FormData>({
    patientID: "",
    pulse: "",
    spo2: "",
    temperature: "",
    oxygenTherapy: "",
    bloodPressure: "",
    height: "",
    weight: "",
    sensorium: "",
    respiratoryRate: "",
    urine: "",
    heartRate: "",
    hurtScale: "",
    currentCondition: ""
  });

  // For live search patients
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    // Fetch patients data once on mount
    axios.get<Patient[]>("http://26.184.100.176:3000/patients")
      .then(res => setPatients(res.data))
      .catch(err => {
        console.error("Error fetching patients:", err);
        toast.error("Failed to load patients data");
      });
  }, []);

  // Handle live search input change separately
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredPatients([]);
      setShowResults(false);
      // clear patientID in form if user cleared search
      setFormData(prev => ({ ...prev, patientID: "" }));
      return;
    }

    // Filter patients by fullName case-insensitive
    const filtered = patients.filter(p =>
      p.fullName.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredPatients(filtered);
    setShowResults(true);
  };

  // When user clicks a patient from the dropdown list
  const handleSelectPatient = (patient: Patient) => {
    setFormData(prev => ({ ...prev, patientID: patient.patientID.toString() }));
    setSearchTerm(patient.fullName); // show full name in input
    setShowResults(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://26.184.100.176:3000/post-medical-records", {
        patientID: parseInt(formData.patientID),
        heartRate: parseInt(formData.heartRate),
        pulse: parseInt(formData.pulse),
        height: parseInt(formData.height),
        weight: formData.weight,
        hurtScale: parseInt(formData.hurtScale),
        temperature: formData.temperature,
        currentCondition: formData.currentCondition,
        SP02: formData.spo2,
        healthStatus: 1,
        respiratoryRate: parseInt(formData.respiratoryRate),
        bloodPressure: formData.bloodPressure,
        urine: formData.urine
      },
    {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

      toast.success("Dữ liệu đã gửi thành công!", { position: "top-right" });
      setFormData({
        patientID: "",
        pulse: "",
        spo2: "",
        temperature: "",
        oxygenTherapy: "",
        bloodPressure: "",
        height: "",
        weight: "",
        sensorium: "",
        respiratoryRate: "",
        urine: "",
        heartRate: "",
        hurtScale: "",
        currentCondition: ""
      });
      setSearchTerm("");
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error);
      toast.error("Gửi dữ liệu thất bại!", { position: "top-right" });
    }
  };

  return (
    <>
      <ToastContainer />
      <Header />
      <div className="dlcForm h1359 main-content padding">
        <div className="d-flex justify-content-center align-items-center">
          <div className="tracking-sheet" style={{ position: "relative" }}>
            <h1 className="whiteText">
              Life function tracking sheet <i className="fa fa-file-text" aria-hidden="true"></i>
            </h1>
            <span className="dlcgray">Update patient diagnostic indicators</span>
            <div className="mb80"></div>
            <form onSubmit={handleSubmit}>
              <div className="row mb-3 position-relative">
                <div className="col">
                  <label htmlFor="patientSearch" className="form-label">Choose patient</label>
                  <input
                    id="patientSearch"
                    name="patientSearch"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="form-control"
                    type="text"
                    placeholder="Search patients by name..."
                    autoComplete="off"
                    required
                  />
                  {showResults && filteredPatients.length > 0 && (
                    <ul
                      className="list-group position-absolute w-100"
                      style={{ zIndex: 1000, maxHeight: "200px", overflowY: "auto" }}
                    >
                      {filteredPatients.map(patient => (
                        <li
                          key={patient.patientID}
                          className="list-group-item list-group-item-action d-flex align-items-center"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleSelectPatient(patient)}
                        >
                          <img
                            src={patient.image}
                            alt={patient.fullName}
                            className="rounded-circle me-2"
                            style={{ width: "40px", height: "40px", objectFit: "cover" }}
                          />
                          <div>
                            <div><strong>{patient.fullName}</strong></div>
                            <small className="text-muted">{patient.email}</small>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Hidden field to store actual patientID */}
              <input type="hidden" name="patientID" value={formData.patientID} />

              {/* Rest of your form inputs unchanged */}
              <div className="row">
                <div className="col">
                  <p>Pulse</p>
                  <input name="pulse" value={formData.pulse} onChange={handleChange} className="form-control" type="text" placeholder="L/ph" required />
                </div>
                <div className="col">
                  <p>SpO2</p>
                  <input name="spo2" value={formData.spo2} onChange={handleChange} className="form-control" type="text" placeholder="%" required />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <p>Temperature</p>
                  <input name="temperature" value={formData.temperature} onChange={handleChange} className="form-control" type="text" placeholder="℃" required />
                </div>
                <div className="col">
                  <p>Oxygen therapy</p>
                  <input name="oxygenTherapy" value={formData.oxygenTherapy} onChange={handleChange} className="form-control" type="text" placeholder="L/min" required />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <p>Blood pressure</p>
                  <input name="bloodPressure" value={formData.bloodPressure} onChange={handleChange} className="form-control" type="text" placeholder="mmHg" required />
                </div>
                <div className="col">
                  <p>Height</p>
                  <input name="height" value={formData.height} onChange={handleChange} className="form-control" type="text" placeholder="cm" required />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <p>Weight</p>
                  <input name="weight" value={formData.weight} onChange={handleChange} className="form-control" type="text" placeholder="Kg" required />
                </div>
                <div className="col">
                  <p>Sensorium</p>
                  <input name="sensorium" value={formData.sensorium} onChange={handleChange} className="form-control" required />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <p>Respiratory rate</p>
                  <input name="respiratoryRate" value={formData.respiratoryRate} onChange={handleChange} className="form-control" type="text" placeholder="Times/min" required />
                </div>
                <div className="col">
                  <p>Urine</p>
                  <input name="urine" value={formData.urine} onChange={handleChange} className="form-control" type="text" placeholder="ml/h" required />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <p>Heart rate</p>
                  <input name="heartRate" value={formData.heartRate} onChange={handleChange} className="form-control" type="text" placeholder="bpm" required />
                </div>
                <div className="col">
                  <p>Hurt scale</p>
                  <input name="hurtScale" value={formData.hurtScale} onChange={handleChange} className="form-control" required />
                </div>
              </div>

              <div className="row marginBottom">
                <div className="col">
                  <p>Current condition</p>
                  <textarea name="currentCondition" value={formData.currentCondition} onChange={handleChange} className="form-control"></textarea>
                </div>
              </div>

              <div className="row">
                <div className="col padding">
                  <button className="btn btn-outline-secondary dlcBtn w-100 dropShadow" type="submit">Submit and continue</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
