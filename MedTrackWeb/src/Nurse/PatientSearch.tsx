import React, { useEffect, useState, useRef } from "react";

export default function PatientSearch() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    fetch("http://26.184.100.176:3000/patients")
      .then((res) => res.json())
      .then((data) => setPatients(data))
      .catch((err) => console.error("Error fetching patients:", err));
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredPatients([]);
      setShowDropdown(false);
      setSelectedPatientId("");
      return;
    }
    const filtered = patients.filter((patient) =>
      patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.patientID.toString().includes(searchTerm)
    );
    setFilteredPatients(filtered);
    setShowDropdown(filtered.length > 0);
  }, [searchTerm, patients]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (patient) => {
    setSelectedPatientId(patient.patientID);
    setSearchTerm(`${patient.fullName} (ID: ${patient.patientID})`);
    setShowDropdown(false);
  };

  const handleSearch = () => {
    if (selectedPatientId) {
      window.location.href = `http://localhost:5173/home/bed-details/${selectedPatientId}`;
    } else {
      alert("Please select a patient.");
    }
  };

  return (
    <div className="container mt-4"  ref={containerRef}>
      <h2 className="blueText">Search Patients</h2>
      <div className="mb-3 position-relative">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name or ID..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setSelectedPatientId("");
          }}
          onFocus={() => {
            if (filteredPatients.length > 0) setShowDropdown(true);
          }}
          autoComplete="off"
        />
        {showDropdown && (
          <ul
            className="list-group position-absolute w-100 "
            style={{ zIndex: 1000, maxHeight: "200px", overflowY: "auto" }}
          >
            {filteredPatients.map((patient) => (
              <li
                key={patient.patientID}
                className="list-group-item list-group-item-action d-flex align-items-center "
                style={{ cursor: "pointer" }}
                onClick={() => handleSelect(patient)}
              >
                <img
                  src={patient.image}
                  alt={patient.fullName}
                  style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover", marginRight: "10px" }}
                />
                <div>
                  <div>{patient.fullName}</div>
                  <small className="text-muted">ID: {patient.patientID}</small>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button className="btn btn-primary w-100 mb-3" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}
