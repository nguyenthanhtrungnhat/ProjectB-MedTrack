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

// export default function NurseTable({ nurses, onDelete }) {
//     return (
//         <div className="row mt-5">
//             <h2>Nurses List</h2>
//             <div className="table-responsive">
//                 <table className="table table-striped">
//                     <thead>
//                         <tr>
//                             <th>Nurse ID</th>
//                             <th>Username</th>
//                             <th>Full Name</th>
//                             <th>Date of Birth</th>
//                             <th>Phone</th>
//                             <th>Email</th>
//                             <th>CCCD</th>
//                             <th>Address</th>
//                             <th>Department</th>
//                             <th>Room ID</th>
//                             <th>Task Date</th>
//                             <th>Gender</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {nurses.map((nurse) => (
//                             <tr key={nurse.nurseID}>
//                                 <td>{nurse.nurseID}</td>
//                                 <td>{nurse.username}</td>
//                                 <td>{nurse.fullName}</td>
//                                 <td>{formatDate(nurse.dob)}</td>
//                                 <td>{nurse.phone}</td>
//                                 <td>{nurse.email}</td>
//                                 <td>{nurse.CCCD}</td>
//                                 <td>{nurse.address}</td>
//                                 <td>{nurse.department}</td>
//                                 <td>{nurse.roomID}</td>
//                                 <td>{formatDate(nurse.haveTask)}</td>
//                                 <td>{nurse.gender === 1 ? "Male" : "Female"}</td>
//                                 <td>
//                                     <button className="btn btn-danger" onClick={() => onDelete(nurse.nurseID, "nurses")}>Delete</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }
