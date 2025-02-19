export interface NurseProps {
    image: string, nurseFullName: string, gender: string, dob: string, phone: string, id: string, address: string, email: string
}
export interface RoomProps {
    department: string, roomID: string
}
export interface PatientProps {
    image: string;
    fullName: string;
    gender: string;
    dob: string;
    phone: string;
    patientID: string; // Changed from 'id' to 'patientID' for consistency
    address: string;
    email: string;
}