// const formatDate = (dateString: string | null): string => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     return (
//         ("0" + date.getDate()).slice(-2) +
//         "/" +
//         ("0" + (date.getMonth() + 1)).slice(-2) +
//         "/" +
//         date.getFullYear()
//     );
// };

// export default function DoctorTable({ doctors, onDelete }) {
//     return (
//         <div className="row mt-5">
//             <h2>Doctors List</h2>
//             <div className="table-responsive">
//                 <table className="table table-striped">
//                     <thead>
//                         <tr>
//                             <th>Doctor ID</th>
//                             <th>Username</th>
//                             <th>Full Name</th>
//                             <th>Department</th>
//                             <th>Date of Birth</th>
//                             <th>Phone</th>
//                             <th>Email</th>
//                             <th>CCCD</th>
//                             <th>Address</th>
//                             <th>Task Date</th>
//                             <th>Gender</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {doctors.map((doctor) => (
//                             <tr key={doctor.doctorID}>
//                                 <td>{doctor.doctorID}</td>
//                                 <td>{doctor.username}</td>
//                                 <td>{doctor.fullName}</td>
//                                 <td>{doctor.department}</td>
//                                 <td>{formatDate(doctor.dob)}</td>
//                                 <td>{doctor.phone}</td>
//                                 <td>{doctor.email}</td>
//                                 <td>{doctor.CCCD}</td>
//                                 <td>{doctor.address}</td>
//                                 <td>{formatDate(doctor.haveTask)}</td>
//                                 <td>{doctor.gender === 1 ? "Male" : "Female"}</td>
//                                 <td>
//                                     <button className="btn btn-danger" onClick={() => onDelete(doctor.doctorID, "doctors")}>Delete</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }
