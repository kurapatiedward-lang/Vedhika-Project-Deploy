import React, { useEffect, useState } from 'react';
import "./styles/EmpDepartment.css";
import { useNavigate } from 'react-router-dom';

function EmpDepartment() {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editStatus, setEditStatus] = useState(true);
  const navigate = useNavigate();

  useEffect(() => { fetchList(); }, []);

  function fetchList() {
    setLoading(true);
    fetch('/api/departments/') 
      .then(r => {
        if (!r.ok) {
          throw new Error('Failed to fetch');
        }
        return r.json();
      })
      .then(data => {
        console.log('Fetched data:', data);
        setList(data || []);
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setList([]);
      })
      .finally(() => setLoading(false));
  }

  async function handleAdd(e) {
    e.preventDefault();
    if (!name.trim()) { 
      alert('Department field is required'); 
      return; 
    }
    
    try {
      const res = await fetch('/api/departments/', { 
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          status: true
        })
      });
      
      if (res.ok) { 
        setName(''); 
        fetchList(); 
      } else {
        const errorData = await res.json().catch(() => ({}));
        alert(errorData.name?.[0] || 'Failed to add department');
      }
    } catch (error) { 
      console.error('Add error:', error);
      alert('Request failed'); 
    }
  }

  function startEdit(department) {
    setEditingId(department.id);
    setEditName(department.name);
    setEditStatus(department.status);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditName('');
    setEditStatus(true);
  }

  async function handleEditSubmit(id) {
    if (!editName.trim()) {
      alert('Department name is required');
      return;
    }

    try {
      const res = await fetch(`/api/departments/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editName.trim(),
          status: editStatus
        })
      });

      if (res.ok) {
        setEditingId(null);
        setEditName('');
        setEditStatus(true);
        fetchList();
      } else {
        const errorData = await res.json().catch(() => ({}));
        alert(errorData.name?.[0] || 'Failed to update department');
      }
    } catch (error) {
      console.error('Edit error:', error);
      alert('Request failed');
    }
  }

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this department?')) return;
    
    try {
      const res = await fetch(`/api/departments/${id}/`, {
        method: 'DELETE' 
      });
      
      if (res.ok) {
        fetchList(); 
      } else {
        alert('Delete failed');
      }
    } catch (error) { 
      console.error('Delete error:', error);
      alert('Request failed'); 
    }
  }

  async function handleStatusToggle(id, currentStatus) {
    try {
      const res = await fetch(`/api/departments/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: !currentStatus
        })
      });

      if (res.ok) {
        fetchList();
      } else {
        alert('Failed to toggle status');
      }
    } catch (error) {
      console.error('Toggle error:', error);
      alert('Request failed');
    }
  }

  return (
    <div className="master-page-container">
      <div className="master-header"><h2>Add Department</h2></div>
      <div className="master-content">
        <form className="dept-form" onSubmit={handleAdd}>
          <div className="input-group">
            <input 
              placeholder="Department Name" 
              value={name} 
              onChange={e => setName(e.target.value)} 
            />
            <button className="btn btn-primary" type="submit">Add</button>
          </div>
        </form>

        <div className="dept-list">
          <h3>Department List</h3>
          <table className="dept-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="3" className="loading">Loading...</td></tr>
              ) : list.length === 0 ? (
                <tr><td colSpan="3" className="no-data">No departments found</td></tr>
              ) : (
                list.map(d => (
                  <tr key={d.id}>
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
                          />
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EmpDepartment;