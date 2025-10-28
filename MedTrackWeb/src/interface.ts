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
    phone: number|string;
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
    bloodPressure: string,
    urine: number,
    doctorID: string,
    patientID: string,
    nurseID: string,
    oxygenTherapy: number,
    sensorium: number
}
export interface SidebarInfoProps {
    phone?: string|number;
    fullName?: string;
}
export interface FormData {
    patientID: string;
    pulse: number;
    spo2: number;
    temperature: number;
    oxygenTherapy: number;
    bloodPressure: string;
    height: number;
    weight: number;
    sensorium: number;
    respiratoryRate: number;
    urine: number;
    heartRate: number;
    hurtScale: number;
    currentCondition: string;
};
export interface Schedule{
    subject:string;
    working_hours:number;
    date:string;
    scheduleID:string;
    start_at:string;
    color:string;
    roomID:string;
    room_location:string;
}