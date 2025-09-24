import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

function AdminDashboard() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "trainer",
    contact_info: "",
    employee_id:"",
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
        password: "",
        role: "trainer",
        contact_info: "",
        employee_id:"",
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
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required={!editId}
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
              type="text"
              placeholder="Employee ID"
              value={formData.employee_id}
              onChange={(e) =>
                setFormData({ ...formData, employee_id: e.target.value })
              }
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
