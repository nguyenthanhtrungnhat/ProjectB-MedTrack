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
    phone: number;
    patientID: number; // Changed from 'id' to 'patientID' for consistency
    address: string;
    email: string;
    hospitalizationsDiagnosis?: string;
    summaryCondition?: string;
    dischargeDiagnosis?: string;
    BHYT?: string;
    admissionDate?: string | null;
    relativeName?: string;
    relativeNumber?: number;
    dischargeDate?: string | null;
    CCCD?: number;
    username?: string;
}

export interface RecordProps {
    recordID: string,
    timeCreate: string,
    heartRate: number,
    pulse: number,
    height: number,
    weight: number,
    hurtScale: number,
    temperature: number,
    currentCondition: number,
    healthStatus: number,
    SP02: number,
    respiratoryRate: number,
    bloodPressure: number,
    urine: number,
    doctorID: string,
    patientID: string,
    nurseID: string,
    oxygenTherapy: number,
    sensorium: number
}
export interface SidebarInfoProps {
    phone?: string;
    fullName?: string;
}
export interface FormData {
    patientID: string;
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