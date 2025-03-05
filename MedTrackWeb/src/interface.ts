export interface NurseProps {
    image?: string,
    fullName: string,
    gender: string,
    dob: string,
    phone: string,
    nurseID: string,
    address: string,
    email: string
}
export interface RoomProps {
    department: string,
    roomID: string
}
export interface PatientProps {
    image?: string;
    fullName: string;
    gender: string;
    dob: string;
    phone: string;
    patientID: string; // Changed from 'id' to 'patientID' for consistency
    address: string;
    email: string;
    hospitalizationsDiagnosis?: string;
    summaryCondition?: string;
    dischargeDiagnosis?: string;
    BHYT?: string;
    admissionDate?:string;
    relativeName?:string;
    relativeNumber?:string;
}
export interface RecordProps {
    recordID: string,
    timeCreate: string,
    heartRate: string,
    pulse: string,
    height: string,
    weight: string,
    hurtScale: string,
    temperature: string,
    currentCondition: string,
    healthStatus: string,
    SP02: string,
    respiratoryRate: string,
    bloodPressure: string,
    urine: string,
    doctorID: string,
    patientID: string,
    nurseID: string
}
export interface SidebarInfoProps {
    phone?: string;
    fullName?: string;
}
export interface FormData  {
    patient: string;
    pulse: string;
    spo2: string;
    temperature: string;
    oxygenTherapy: string;
    bloodPressure: string;
    height: string;
    weight: string;
    sensorium: string;
    respiratoryRate: string;
    urine: string;
    heartRate: string;
    hurtScale: string;
    currentCondition: string;
};