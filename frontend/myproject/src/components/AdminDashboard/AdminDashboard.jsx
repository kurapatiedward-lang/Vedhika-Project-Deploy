import { useEffect, useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import api from "../../api";
import "./AdminDashboard.css";
import Sidebar from "./Sidebar/Sidebar";

function AdminDashboard() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "trainer",
    contact_info: "",
    employee_id: "",
  });
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
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
        employee_id: "",
      });
      setEditId(null);
      alert(editId ? "User updated successfully!" : "User created successfully!");
    } catch (err) {
      console.error(err);
      alert("Error: " + JSON.stringify(err.response?.data || err.message));
    }
  };

  // Sidebar moved to separate component

  return (
    <div className="admin-dashboard-container">
      {/* Sidebar component */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="main-content">
        {/* Check if a child route is active (subpage) */}
        <Outlet />

        {/* Show default dashboard content only if no child route is active */}
        {!location.pathname.includes('/admin-dashboard/') && (
          <>
            {/* Header Section */}
            <div className="dashboard-header">
              <h1>Welcome KRAJESHK</h1>
              <p className="welcome-text">
                Welcome, Superadmin! Easily manage users, track system performance,
                configure settings, and ensure security — all from a powerful,
                centralized dashboard.
              </p>
              <div className="header-divider"></div>
            </div>

            {/* Main Content */}
            <div className="dashboard-content">
              {/* Left Column - Stats and Sections */}
              <div className="dashboard-left">
                {/* Total Emp Card */}
                <div className="stat-card total-emp-card">
                  <h2>Total Emp</h2>
                  <div className="emp-count">0</div>
                </div>

                {/* Offers Section */}
                <div className="content-section">
                  <h3 className="section-title">OFFERS</h3>
                  <div className="image-grid">
                    <div className="image-item">
                      <div className="image-placeholder">📄 Offer Image</div>
                      <div className="image-subitem">News Image</div>
                    </div>
                    <div className="image-item">
                      <div className="image-placeholder">📄 Offer Image</div>
                      <div className="image-subitem">News Image</div>
                    </div>
                    <div className="image-item">
                      <div className="image-placeholder">📄 Offer Image</div>
                      <div className="image-subitem">Policy Image</div>
                    </div>
                    <div className="image-item">
                      <div className="image-placeholder">📄 Offer Image</div>
                      <div className="image-subitem">Policy Image</div>
                    </div>
                  </div>
                </div>

                {/* News Section */}
                <div className="content-section">
                  <h3 className="section-title">NEWS</h3>
                  <div className="image-grid">
                    <div className="image-item">
                      <div className="image-placeholder">📰 News Image</div>
                      <div className="image-subitem">News Image</div>
                    </div>
                    <div className="image-item">
                      <div className="image-placeholder">📰 News Image</div>
                      <div className="image-subitem">News Image</div>
                    </div>
                    <div className="image-item">
                      <div className="image-placeholder">📰 News Image</div>
                      <div className="image-subitem">Policy Image</div>
                    </div>
                    <div className="image-item">
                      <div className="image-placeholder">📰 News Image</div>
                      <div className="image-subitem">Policy Image</div>
                    </div>
                  </div>
                </div>

                {/* Policy Section */}
                <div className="content-section">
                  <h3 className="section-title">POLICY</h3>
                  <div className="image-grid">
                    <div className="image-item">
                      <div className="image-placeholder">📋 Policy Image</div>
                      <div className="image-subitem">Policy Image</div>
                    </div>
                    <div className="image-item">
                      <div className="image-placeholder">📋 Policy Image</div>
                      <div className="image-subitem">Policy Image</div>
                    </div>
                    <div className="image-item">
                      <div className="image-placeholder">📋 Policy Image</div>
                      <div className="image-subitem">Policy Image</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - User Management Form */}
              <div className="dashboard-right">
                <div className="user-management-section">
                  <h2 className="form-title">User Management</h2>
                  <p className="form-description">Create or update trainers and trainees</p>

                  <form onSubmit={handleSubmit} className="user-form">
                    <div className="form-grid">
                      <div className="form-group">
                        <label htmlFor="full_name">Full Name *</label>
                        <input
                          id="full_name"
                          type="text"
                          placeholder="Enter full name"
                          value={formData.full_name}
                          onChange={(e) =>
                            setFormData({ ...formData, full_name: e.target.value })
                          }
                          required
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">Email *</label>
                        <input
                          id="email"
                          type="email"
                          placeholder="Enter email address"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          required
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="password">Password {!editId && '*'}</label>
                        <input
                          id="password"
                          type="password"
                          placeholder="Enter password"
                          value={formData.password}
                          onChange={(e) =>
                            setFormData({ ...formData, password: e.target.value })
                          }
                          required={!editId}
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="contact_info">Contact Info</label>
                        <input
                          id="contact_info"
                          type="tel"
                          placeholder="Enter contact number"
                          value={formData.contact_info}
                          onChange={(e) =>
                            setFormData({ ...formData, contact_info: e.target.value })
                          }
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="role">Role *</label>
                        <select
                          id="role"
                          value={formData.role}
                          onChange={(e) =>
                            setFormData({ ...formData, role: e.target.value })
                          }
                          className="form-input"
                        >
                          <option value="trainer">Trainer</option>
                          <option value="trainee">Trainee</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label htmlFor="employee_id">Employee ID</label>
                        <input
                          id="employee_id"
                          type="text"
                          placeholder="Enter employee ID"
                          value={formData.employee_id}
                          onChange={(e) =>
                            setFormData({ ...formData, employee_id: e.target.value })
                          }
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div className="form-actions">
                      <button type="submit" className="submit-btn">
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
                              role: "trainer",
                              contact_info: "",
                              password: "",
                              employee_id: "",
                            });
                          }}
                          className="cancel-btn"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;