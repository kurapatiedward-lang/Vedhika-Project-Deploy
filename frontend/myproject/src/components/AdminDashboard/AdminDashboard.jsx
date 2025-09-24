
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../api";

// function AdminDashboard() {
//   const [users, setUsers] = useState([]);
//   const [formData, setFormData] = useState({
//     full_name: "",
//     email: "",
//     role: "trainee",
//     contact_info: "",
//     password: "",
//   });
//   const [editId, setEditId] = useState(null);
//   const navigate = useNavigate();
//   const token = localStorage.getItem("access");

//   useEffect(() => {
//     const role = localStorage.getItem("role");
//     if (role !== "admin") navigate("/");
//     fetchUsers();
//   }, [navigate]);

//   const fetchUsers = async () => {
//     try {
//       const res = await api.get("users/", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(res.data);
//     } catch (err) {
//       console.error(err);
//       navigate("/");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editId) {
//         await api.put(`users/${editId}/`, formData, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//       } else {
//         await api.post("users/", formData, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//       }
//       setFormData({
//         full_name: "",
//         email: "",
//         role: "trainee",
//         contact_info: "",
//         password: "",
//       });
//       setEditId(null);
//       fetchUsers();
//     } catch (err) {
//       console.error(err);
//       alert("Error: " + JSON.stringify(err.response.data));
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure to delete this user?")) return;
//     try {
//       await api.delete(`users/${id}/`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchUsers();
//     } catch (err) {
//       console.error(err);
//       alert("Error deleting user");
//     }
//   };

//   const handleEdit = (user) => {
//     setFormData({
//       full_name: user.full_name,
//       email: user.email,
//       role: user.role,
//       contact_info: user.contact_info || "",
//       password: "",
//     });
//     setEditId(user.id);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
//       {/* Header */}
//       <div className="max-w-6xl w-full mb-8">
//         <h1 className="text-4xl font-bold text-gray-800 mb-2">
//           Admin Dashboard
//         </h1>
//         <p className="text-gray-600">Manage Trainers & Trainees</p>
//       </div>

//       {/* Form */}
//       <div className="max-w-6xl w-full mb-10">
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white shadow-lg rounded-xl p-6 space-y-6"
//         >
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             <input
//               type="text"
//               placeholder="Full Name"
//               value={formData.full_name}
//               onChange={(e) =>
//                 setFormData({ ...formData, full_name: e.target.value })
//               }
//               required
//               className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500"
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={(e) =>
//                 setFormData({ ...formData, email: e.target.value })
//               }
//               required
//               className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500"
//             />
//             <input
//               type="number"
//               placeholder="Contact Info"
//               value={formData.contact_info}
//               onChange={(e) =>
//                 setFormData({ ...formData, contact_info: e.target.value })
//               }
//               className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500"
//             />
//             <select
//               value={formData.role}
//               onChange={(e) =>
//                 setFormData({ ...formData, role: e.target.value })
//               }
//               className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="trainer">Trainer</option>
//               <option value="trainee">Trainee</option>
//             </select>
//             <input
//               type="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={(e) =>
//                 setFormData({ ...formData, password: e.target.value })
//               }
//               required={!editId}
//               className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="flex space-x-4">
//             <button
//               type="submit"
//               className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//             >
//               {editId ? "Update User" : "Create User"}
//             </button>
//             {editId && (
//               <button
//                 type="button"
//                 onClick={() => {
//                   setEditId(null);
//                   setFormData({
//                     full_name: "",
//                     email: "",
//                     role: "trainee",
//                     contact_info: "",
//                     password: "",
//                   });
//                 }}
//                 className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
//               >
//                 Cancel
//               </button>
//             )}
//           </div>
//         </form>
//       </div>

//       {/* Users Table */}
//       <div className="max-w-6xl w-full overflow-x-auto">
//         <table className="w-full border-collapse bg-white shadow-lg rounded-xl overflow-hidden">
//           <thead className="bg-blue-600 text-white">
//             <tr>
//               <th className="p-4 text-left">Full Name</th>
//               <th className="p-4 text-left">Email</th>
//               <th className="p-4 text-left">Role</th>
//               <th className="p-4 text-left">Contact</th>
//               <th className="p-4 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user, idx) => (
//               <tr
//                 key={user.id}
//                 className={`${
//                   idx % 2 === 0 ? "bg-gray-50" : "bg-white"
//                 } hover:bg-gray-100 transition`}
//               >
//                 <td className="p-4">{user.full_name}</td>
//                 <td className="p-4">{user.email}</td>
//                 <td className="p-4 capitalize">{user.role}</td>
//                 <td className="p-4">{user.contact_info}</td>
//                 <td className="p-4 flex justify-center space-x-3">
//                   <button
//                     onClick={() => handleEdit(user)}
//                     className="px-4 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(user.id)}
//                     className="px-4 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {users.length === 0 && (
//               <tr>
//                 <td
//                   colSpan="5"
//                   className="text-center p-6 text-gray-500 italic"
//                 >
//                   No users found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

function AdminDashboard() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    role: "trainee",
    contact_info: "",
    password: "",
  });
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("access");

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") navigate("/");
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`users/${editId}/`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await api.post("users/", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setFormData({
        full_name: "",
        email: "",
        role: "trainee",
        contact_info: "",
        password: "",
      });
      setEditId(null);
    } catch (err) {
      console.error(err);
      alert("Error: " + JSON.stringify(err.response.data));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Header */}
      <div className="max-w-6xl w-full mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">Manage Trainers & Trainees</p>
      </div>

      {/* Form */}
      <div className="max-w-6xl w-full mb-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl p-6 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={(e) =>
                setFormData({ ...formData, full_name: e.target.value })
              }
              required
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Contact Info"
              value={formData.contact_info}
              onChange={(e) =>
                setFormData({ ...formData, contact_info: e.target.value })
              }
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500"
            >
              <option value="trainer">Trainer</option>
              <option value="trainee">Trainee</option>
            </select>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required={!editId}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {editId ? "Update User" : "Create User"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={() => {
                  setEditId(null);
                  setFormData({
                    full_name: "",
                    email: "",
                    role: "trainee",
                    contact_info: "",
                    password: "",
                  });
                }}
                className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminDashboard;
