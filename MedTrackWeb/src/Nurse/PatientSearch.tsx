import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PatientProps } from "../interface";

export default function PatientSearch() {
  const [patients, setPatients] = useState<PatientProps[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState<PatientProps[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  // const containerRef = useRef(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  // Fetch patient data
  useEffect(() => {
    fetch("http://localhost:3000/patients")
      .then((res) => res.json())
      .then((data) => setPatients(data))
      .catch((err) => console.error("Error fetching patients:", err));
  }, []);

  // Filter patients by name or ID
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredPatients([]);
      setShowDropdown(false);
      return;
    }

    const filtered = patients.filter(
      (p) =>
        p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.patientID.toString().includes(searchTerm)
    );
    setFilteredPatients(filtered);
    setShowDropdown(filtered.length > 0);
  }, [searchTerm, patients]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event:any) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowDropdown(false);
      } 
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle selection
  const handleSelect = (patient: PatientProps) => {
    setSearchTerm(`${patient.fullName} `);
    setShowDropdown(false);
    navigate(`/home/bed-details/${patient.patientID}`);
  };

  return (
    <div ref={containerRef}>
      <input
        type="search"
        className="form-control me-2"
        placeholder="Search patient..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => filteredPatients.length > 0 && setShowDropdown(true)}
        autoComplete="off"
         style={{
           width: 500
          }}
      />
      {showDropdown && (
        <ul
          className="list-group position-absolute w-100 mt-1 shadow-sm"
          style={{
            zIndex: 2000,
            maxHeight: "220px",
            overflowY: "auto",
            borderRadius: "0.5rem",
          }}
        >
          {filteredPatients.map((p) => (  
            <li
              key={p.patientID}
              className="list-group-item list-group-item-action d-flex align-items-center"
              onClick={() => handleSelect(p)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={p.image}
                alt={p.fullName}
                className="rounded-circle me-2"
                style={{ width: "32px", height: "32px", objectFit: "cover" }}
              />
              <div>
                <div className="fw-semibold">{p.fullName}</div>
                <small className="text-muted">ID: {p.patientID}</small>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
