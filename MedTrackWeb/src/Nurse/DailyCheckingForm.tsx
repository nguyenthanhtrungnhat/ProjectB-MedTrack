import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Header";
import { FormData } from '../interface';


export default function DailyCheckingForm() {
    const nurseID = localStorage.getItem("nurseID");
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
        } catch (error) {
            console.error("Lỗi khi gửi dữ liệu:", error);
            toast.error("Gửi dữ liệu thất bại!", { position: "top-right" });
        }
    };

    return (
        <>
            <ToastContainer /> {/* Add this to show notifications */}
            <Header />
            <div className="dlcForm h1359 main-content padding">
                <div className="d-flex justify-content-center align-items-center">
                    <div className="tracking-sheet">
                        <h1 className="whiteText">Life function tracking sheet <i className="fa fa-file-text" aria-hidden="true"></i></h1>
                        <span className="dlcgray">Update patient diagnostic indicators</span>
                        <div className="mb80"></div>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col">
                                    <p>Choose patient</p>
                                    <input
                                        name="patientID"
                                        value={formData.patientID}
                                         onChange={handleChange}
                                        className="form-control"
                                        type="text"
                                        placeholder="Search"
                                        required
                                    />
                                 
                                </div>
                            </div>
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