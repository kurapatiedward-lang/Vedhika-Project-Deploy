import React, { useEffect, useState } from 'react';
import "./styles/EmpDesignation.css";

export default function EmpDesignation() {
  const [departmentId, setDepartmentId] = useState('');
  const [designationName, setDesignationName] = useState('');
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editDepartmentId, setEditDepartmentId] = useState('');
  const [editStatus, setEditStatus] = useState(true);

  useEffect(() => { 
    fetchDepartments(); 
    fetchDesignations(); 
  }, []);

  function fetchDepartments() {
    fetch('/api/departments/')
      .then(r => r.json())
      .then(data => {
        console.log('Departments fetched:', data);
        setDepartments(data || []);
      })
      .catch(error => {
        console.error('Error fetching departments:', error);
        setDepartments([]);
      });
  }

  function fetchDesignations() {
    setLoading(true);
    fetch('/api/designations/')
      .then(r => r.json())
      .then(data => {
        console.log('Designations fetched - Full response:', data);
        // Log the first designation to see structure
        if (data && data.length > 0) {
          console.log('First designation structure:', data[0]);
          console.log('Department field type:', typeof data[0].department);
          console.log('Department field value:', data[0].department);
        }
        setDesignations(data || []);
      })
      .catch(error => {
        console.error('Error fetching designations:', error);
        setDesignations([]);
      })
      .finally(() => setLoading(false));
  }

  async function handleAdd(e) {
    e.preventDefault();
    if (!departmentId || !designationName.trim()) { 
      alert('All fields are required'); 
      return; 
    }
    
    const designationData = {
      name: designationName.trim(),
      department: parseInt(departmentId),
      status: true
    };
    
    console.log('Adding designation:', designationData);
    
    try {
      const res = await fetch('/api/designations/', { 
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(designationData)
      });
      
      console.log('Response status:', res.status);
      
      if (res.ok) { 
        const newDesignation = await res.json();
        console.log('Designation added:', newDesignation);
        
        setDesignationName(''); 
        setDepartmentId(''); 
        fetchDesignations(); 
      } else {
        const errorText = await res.text();
        console.error('Error response:', errorText);
        
        try {
          const errorData = JSON.parse(errorText);
          alert(errorData.name?.[0] || errorData.department?.[0] || 'Failed to add designation');
        } catch {
          alert('Failed to add designation');
        }
      }
    } catch (error) { 
      console.error('Request error:', error);
      alert('Request failed'); 
    }
  }

  function startEdit(designation) {
    console.log('Starting edit for designation:', designation);
    
    // Log to debug department structure
    console.log('Department in designation:', designation.department);
    console.log('Type of department:', typeof designation.department);
    
    setEditingId(designation.id);
    setEditName(designation.name);
    
    // Extract department ID based on API response structure
    let deptId = '';
    
    if (designation.department) {
      if (typeof designation.department === 'object') {
        // If department is an object with id property
        if (designation.department.id) {
          deptId = designation.department.id;
        }
      } else {
        // If department is just an ID (number or string)
        deptId = designation.department;
      }
    }
    
    console.log('Extracted department ID:', deptId);
    setEditDepartmentId(deptId.toString());
    setEditStatus(designation.status !== undefined ? designation.status : true);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditName('');
    setEditDepartmentId('');
    setEditStatus(true);
  }

  async function handleEditSubmit(id) {
    if (!editName.trim() || !editDepartmentId) {
      alert('All fields are required');
      return;
    }

    const updateData = {
      name: editName.trim(),
      department: parseInt(editDepartmentId),
      status: editStatus
    };

    console.log('Updating designation:', id, updateData);

    try {
      const res = await fetch(`/api/designations/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
      });

      if (res.ok) {
        console.log('Designation updated successfully');
        setEditingId(null);
        fetchDesignations();
      } else {
        const errorData = await res.json().catch(() => ({}));
        alert(errorData.name?.[0] || 'Failed to update designation');
      }
    } catch (error) {
      console.error('Edit error:', error);
      alert('Request failed');
    }
  }

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this designation?')) return;
    
    try {
      const res = await fetch(`/api/designations/${id}/`, { method: 'DELETE' });
      if (res.ok) {
        console.log('Designation deleted successfully');
        fetchDesignations(); 
      } else {
        alert('Delete failed');
      }
    } catch { 
      alert('Request failed'); 
    }
  }

  async function handleStatusToggle(id, currentStatus) {
    try {
      const res = await fetch(`/api/designations/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: !currentStatus
        })
      });

      if (res.ok) {
        console.log('Status toggled successfully');
        fetchDesignations();
      } else {
        alert('Failed to toggle status');
      }
    } catch (error) {
      console.error('Toggle error:', error);
      alert('Request failed');
    }
  }

  // Helper function to get department name
  const getDepartmentName = (designation) => {
    // If API returns a department_name field (preferred)
    if (designation.department_name) {
      return designation.department_name;
    }
    
    // Fallback: If department is an object with name
    if (designation.department && typeof designation.department === 'object') {
      return designation.department.name || 'N/A';
    }
    
    // Fallback: If department is just an ID, find in departments list
    if (designation.department) {
      const deptId = parseInt(designation.department);
      const dept = departments.find(d => d.id === deptId);
      return dept ? dept.name : `ID: ${deptId}`;
    }
    
    return 'N/A';
  };

  return (
    <div className="master-page-container">
      <div className="master-header"><h2>Add Designation</h2></div>
      <div className="master-content">
        <form className="designation-form" onSubmit={handleAdd}>
          <div className="form-row">
            <div className="form-group">
              <label>Department *</label>
              <select 
                value={departmentId} 
                onChange={e => setDepartmentId(e.target.value)}
                required
              >
                <option value="">Select Department</option>
                {departments.map(d => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Designation Name *</label>
              <input 
                value={designationName} 
                onChange={e => setDesignationName(e.target.value)} 
                placeholder="Designation Name" 
                required
              />
            </div>

            <div className="form-actions">
              <button className="btn btn-primary" type="submit">Add</button>
            </div>
          </div>
        </form>

        <div className="designation-list">
          <h3>Designation List</h3>
          <table className="designation-table">
            <thead>
              <tr>
                <th>Designation Name </th>
                <th>Department</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" className="loading">Loading...</td></tr>
              ) : designations.length === 0 ? (
                <tr><td colSpan="4" className="no-data">No designations found</td></tr>
              ) : (
                designations.map(d => {
                  const deptName = getDepartmentName(d);
                  console.log(`Designation ${d.name} department:`, d.department, '->', deptName);
                  
                  return (
                    <tr key={d.id} className={editingId === d.id ? 'editing-row' : ''}>
                      {editingId === d.id ? (
                        // Edit Mode
                        <>
                          <td>
                            <input
                              type="text"
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              className="edit-input"
                              autoFocus
                              required
                            />
                          </td>
                          <td>
                            <select
                              value={editDepartmentId}
                              onChange={(e) => setEditDepartmentId(e.target.value)}
                              className="edit-select"
                              required
                            >
                              <option value="">Select Department</option>
                              {departments.map(dept => (
                                <option key={dept.id} value={dept.id}>
                                  {dept.name}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <select
                              value={editStatus ? 'active' : 'inactive'}
                              onChange={(e) => setEditStatus(e.target.value === 'active')}
                              className="status-select"
                            >
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                            </select>
                          </td>
                          <td>
                            <button 
                              className="btn small success"
                              onClick={() => handleEditSubmit(d.id)}
                            >
                              Save
                            </button>
                            <button 
                              className="btn small secondary"
                              onClick={cancelEdit}
                            >
                              Cancel
                            </button>
                          </td>
                        </>
                      ) : (
                        // View Mode
                        <>
                          <td>{d.name}</td>
                          <td>
                            {deptName}
                          </td>
                          <td>
                            <span 
                              className={`badge ${d.status ? 'active' : 'inactive'}`}
                              style={{ cursor: 'pointer' }}
                              onClick={() => handleStatusToggle(d.id, d.status)}
                              title="Click to toggle status"
                            >
                              {d.status ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td>
                            <button 
                              className="btn small" 
                              onClick={() => startEdit(d)}
                            >
                              Edit
                            </button>
                            <button 
                              className="btn small danger" 
                              onClick={() => handleDelete(d.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}