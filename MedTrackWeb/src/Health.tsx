import patientImg from './images/Untitled-1.png';
import notgoodpatientImg from './images/red_body.png';
import pluseImg from './images/pulseReal.png';
import tempImg from './images/nhietdo.png';
import bpImg from './images/bloodPressure.png';
import ntImg from './images/nhiptho.png';
import heightImg from './images/pulseReal.png';
import weightImg from './images/pulseReal.png';
import urineImg from './images/pulseReal.png';
import spo2Img from './images/pulseReal.png';
import { useParams } from 'react-router-dom';
import { RecordProps } from './interface';
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function Health() {
    // 🩺 Dynamic badge generator
    const getHealthBadge = (type: string, value?: number | string | null) => {
        if (value === null || value === undefined) return { color: "text-bg-secondary", label: "N/A" };

        switch (type) {
            case "pulse":
                if (Number(value) > 100) return { color: "text-bg-danger", label: "High" };
                if (Number(value) < 60) return { color: "text-bg-warning", label: "Low" };
                return { color: "text-bg-success", label: "Good" };

            case "temperature":
                if (Number(value) > 38) return { color: "text-bg-danger", label: "Fever" };
                if (Number(value) < 36) return { color: "text-bg-warning", label: "Low" };
                return { color: "text-bg-success", label: "Normal" };

            case "respiratory":
                if (Number(value) > 25) return { color: "text-bg-danger", label: "Fast" };
                if (Number(value) < 12) return { color: "text-bg-warning", label: "Slow" };
                return { color: "text-bg-success", label: "Good" };

            case "bloodPressure":
                if (typeof value === "string" && value.includes("/")) {
                    const [systolicStr, diastolicStr] = (value as string).split("/");
                    const systolic = Number(systolicStr);
                    const diastolic = Number(diastolicStr);
                    if (isNaN(systolic) || isNaN(diastolic)) return { color: "text-bg-secondary", label: "Invalid" };
                    if (systolic > 140 || diastolic > 90) return { color: "text-bg-danger", label: "High" };
                    if (systolic < 90 || diastolic < 60) return { color: "text-bg-warning", label: "Low" };
                    return { color: "text-bg-success", label: "Normal" };
                }
                return { color: "text-bg-secondary", label: "N/A" };

            case "spO2":
                if (Number(value) < 90) return { color: "text-bg-danger", label: "Low" };
                if (Number(value) < 95) return { color: "text-bg-warning", label: "Slightly Low" };
                return { color: "text-bg-success", label: "Good" };

            case "heartRate":
                if (Number(value) > 100) return { color: "text-bg-danger", label: "High" };
                if (Number(value) < 60) return { color: "text-bg-warning", label: "Low" };
                return { color: "text-bg-success", label: "Normal" };

            case "oxygenTherapy":
                if (String(value).toLowerCase().includes("mask")) return { color: "text-bg-warning", label: "On Mask" };
                if (String(value).toLowerCase().includes("oxygen")) return { color: "text-bg-danger", label: "Required" };
                return { color: "text-bg-success", label: "Room Air" };

            case "sensorium":
                if (String(value).toLowerCase() === "alert") return { color: "text-bg-success", label: "Alert" };
                if (String(value).toLowerCase() === "drowsy") return { color: "text-bg-warning", label: "Drowsy" };
                return { color: "text-bg-danger", label: "Abnormal" };

            case "painScale":
                if (Number(value) <= 3) return { color: "text-bg-success", label: "Mild" };
                if (Number(value) <= 6) return { color: "text-bg-warning", label: "Moderate" };
                return { color: "text-bg-danger", label: "Severe" };

            default:
                return { color: "text-bg-secondary", label: "" };
        }
    };
    const renderVital = (label: string, imgSrc: string, unit: string, type: string, value?: number | string | null) => {
        const { color, label: status } = getHealthBadge(type, value);
        return (
            <div className="border whiteBg dropShadow padding">
                <p className="blueText">
                    {label} <span className={`badge ${color}`}>{status}</span>
                </p>
                <div className="d-flex align-items-center">
                    <img src={imgSrc} className="pluseImg me-2" alt={label} />
                    <h4 className="blueText mb-0 paddingLeft20 me-3">
                        {value !== null && value !== undefined ? (
                            value
                        ) : (
                            <div className="spinner-border me-3" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        )}
                    </h4>
                    <span className="blueText">{unit}</span>
                </div>
            </div>
        );
    };
    const { patientID } = useParams();
    const [allRecords, setAllRecords] = useState<RecordProps[]>([]);
    const [record, setRecord] = useState<RecordProps | null>(null);
    const [showMore, setShowMore] = useState(false);
    const patientByIdUrl = `http://localhost:3000/patients/${patientID}`;
    const recordBypatientIdUrl = `http://localhost:3000/medical-records/${patientID}`;
    useEffect(() => {

        axios.get(recordBypatientIdUrl)
            .then(response => {
                const sorted = [...response.data].sort(
                    (a, b) => new Date(b.timeCreate).getTime() - new Date(a.timeCreate).getTime()
                );
                setAllRecords(sorted);
                setRecord(sorted[0]);
            })
            .catch(error => {
                console.error('Error fetching records:', error);
                setRecord(null);
                setAllRecords([]);
            });
    }, [patientByIdUrl, recordBypatientIdUrl]);

    const handleRecordSelect = (recordID: number) => {
        axios.get(`http://localhost:3000/medical-records/by-recordId/${recordID}`)
            .then(response => setRecord(response.data))
            .catch(error => console.error('Error fetching selected record:', error));
    };
    return (
        <>
            {/* --- Health Records --- */}
            <div className="row">
                <div className="col-12 padding pt-0">
                    <div className="hasRoomList border padding whiteBg dropShadow">
                        <div className="dropdown mb-3">
                            <button
                                type="button"
                                className={`btn btn-primary ${showMore ? 'active' : ''}`}
                                data-bs-toggle="button"
                                onClick={() => setShowMore(!showMore)}
                            >
                                {showMore ? 'Hide' : 'Show more'}
                            </button>
                            <button className="btn border btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                Record Date
                            </button>
                            <ul className="dropdown-menu">
                                {allRecords.map(rec => (
                                    <li key={rec.recordID}>
                                        <button
                                            className="dropdown-item"
                                            onClick={() => handleRecordSelect(Number(rec.recordID))}
                                        >
                                            {new Date(rec.timeCreate).toLocaleString()}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Main Vitals */}
                        <div className="row">
                            <div className="col-5">
                                <div className="row">
                                    <div className="col-lg-6 col-sm-12 padding">
                                        {renderVital("Pulse", pluseImg, "L/ph", "pulse", record?.pulse)}
                                    </div>
                                    <div className="col-lg-6 col-sm-12 padding">
                                        {renderVital("Temperature", tempImg, "°C", "temperature", record?.temperature)}
                                    </div>
                                    {/* --- Show More Section --- */}
                                    {showMore && (
                                        <>
                                            <div className="col-lg-6 col-sm-12 padding">
                                                {renderVital("Height", heightImg, "cm", "other", record?.height)}
                                            </div>
                                            <div className="col-lg-6 col-sm-12 padding">
                                                {renderVital("Weight", weightImg, "kg", "other", record?.weight)}
                                            </div>
                                            <div className="col-lg-6 col-sm-12 padding">
                                                {renderVital("Sensorium", tempImg, "", "sensorium", record?.sensorium)}
                                            </div>
                                            <div className="col-lg-6 col-sm-12 padding">
                                                {renderVital("Pain Scale", bpImg, "/10", "painScale", record?.hurtScale)}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="col-2 d-flex justify-content-center align-items-center">
                                {record?.healthStatus == 1
                                    ? <img src={patientImg} className="patientImg" alt="Good Health" />
                                    : <img src={notgoodpatientImg} className="patientImg" alt="Not Good Health" />}
                            </div>

                            <div className="col-5">
                                <div className="row">
                                    <div className="col-lg-6 col-sm-12 padding">
                                        {renderVital("Respiratory Rate", ntImg, "times/min", "respiratory", record?.respiratoryRate)}
                                    </div>
                                    <div className="col-lg-6 col-sm-12 padding">
                                        {renderVital("Blood Pressure", bpImg, "mmHg", "bloodPressure", record?.bloodPressure)}
                                    </div>
                                    {/* --- Show More Section --- */}
                                    {showMore && (
                                        <>
                                            <div className="col-lg-6 col-sm-12 padding">
                                                {renderVital("Urine", urineImg, "ml", "other", record?.urine)}
                                            </div>
                                            <div className="col-lg-6 col-sm-12 padding">
                                                {renderVital("SpO₂", spo2Img, "%", "spO2", record?.SP02)}
                                            </div>
                                            <div className="col-lg-6 col-sm-12 padding">
                                                {renderVital("Heart Rate", pluseImg, "bpm", "heartRate", record?.heartRate)}
                                            </div>
                                            <div className="col-lg-6 col-sm-12 padding">
                                                {renderVital("Oxygen Therapy", spo2Img, "", "oxygenTherapy", record?.oxygenTherapy)}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}