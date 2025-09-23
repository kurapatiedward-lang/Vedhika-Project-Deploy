// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../api";

// function AdminDashboard() {
//   const [users, setUsers] = useState([]);
//   const navigate = useNavigate();

//   // Check role
//   useEffect(() => {
//     const role = localStorage.getItem("role");
//     if (role !== "admin") navigate("/"); // redirect if not admin

//     // Fetch all users (Trainer/Trainee)
//     const fetchUsers = async () => {
//       try {
//         const res = await api.get("users/", {
//           headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
//         });
//         setUsers(res.data);
//       } catch (err) {
//         console.error(err);
//         if (err.response.status === 401) navigate("/"); // unauthorized
//       }
//     };
//     fetchUsers();
//   }, [navigate]);

//   return (
//     <div>
//       <h1>Admin Dashboard</h1>
//       <h2>Manage Trainers & Trainees</h2>
//       <ul>
//         {users.map((user) => (
//           <li key={user.id}>
//             {user.full_name} - {user.email} - {user.role}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default AdminDashboard;



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ full_name: "", email: "", role: "trainee", contact_info: "", password: "" });
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("access");

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") navigate("/");
    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const res = await api.get("users/", { headers: { Authorization: `Bearer ${token}` } });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      navigate("/");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`users/${editId}/`, formData, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        await api.post("users/", formData, { headers: { Authorization: `Bearer ${token}` } });
      }
      setFormData({ full_name: "", email: "", role: "trainee", contact_info: "", password: "" });
      setEditId(null);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Error: " + JSON.stringify(err.response.data));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this user?")) return;
    try {
      await api.delete(`users/${id}/`, { headers: { Authorization: `Bearer ${token}` } });
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Error deleting user");
    }
  };

  const handleEdit = (user) => {
    setFormData({ full_name: user.full_name, email: user.email, role: user.role, contact_info: user.contact_info || "", password: "" });
    setEditId(user.id);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>
      <h2>Manage Trainers & Trainees</h2>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Full Name" value={formData.full_name} onChange={e => setFormData({ ...formData, full_name: e.target.value })} required />
        <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
        <input type="number" placeholder="Contact Info" value={formData.contact_info} onChange={e => setFormData({ ...formData, contact_info: e.target.value })} />
        <select value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })}>
          <option value="trainer">Trainer</option>
          <option value="trainee">Trainee</option>
        </select>
        <input type="password" placeholder="Password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} required={!editId} />
        <button type="submit">{editId ? "Update" : "Create"}</button>
        {editId && <button type="button" onClick={() => { setEditId(null); setFormData({ full_name: "", email: "", role: "trainee", contact_info: "", password: "" }); }}>Cancel</button>}
      </form>

      {/* Users Table */}
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.full_name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.contact_info}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
