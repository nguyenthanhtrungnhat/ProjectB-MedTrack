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
    admissionDate?: string;
    relativeName?: string;
    relativeNumber?: number|string
    dischargeDate?: string;
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
    pulse: number|string;
    spo2: number|string;
    temperature: number|string;
    oxygenTherapy: number|string;
    bloodPressure: string;
    height: number|string;
    weight: number|string;
    sensorium: number|string;
    respiratoryRate: number|string;
    urine: number|string;
    heartRate: number|string;
    hurtScale: number|string;
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