import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./styles/ListPages.css";

function ActiveEmpList() {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [me, setMe] = useState(null);
  const limit = 50;
  const navigate = useNavigate();

  // inject bootstrap-icons if not present
  useEffect(() => {
    const href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css';
    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    }
  }, []);

  useEffect(() => {
    // try to load current user info (optional endpoint)
    fetch('/api/me').then(r => r.json()).then(data => setMe(data)).catch(()=>{});
  }, []);

  useEffect(() => { fetchEmployees(page); }, [page]);

  function fetchEmployees(p = 1) {
    setLoading(true);
    const url = `/api/active-employees?page=${p}&limit=${limit}`;
    fetch(url)
      .then(r => r.json())
      .then(data => {
        // expect { data: [...], total: 123 }
        const list = data.data || data.items || data || [];
        const total = data.total || data.totalRows || (Array.isArray(list) ? list.length : 0);
        setEmployees(list);
        setTotalPages(Math.max(1, Math.ceil(total / limit)));
      })
      .catch(() => {
        setEmployees([]);
        setTotalPages(1);
      })
      .finally(() => setLoading(false));
  }

  function handleView(id) {
    navigate(`/admin-dashboard/emp/view/${id}`);
  }

  function handleEdit(id) {
    navigate(`/admin-dashboard/emp/edit/${id}`);
  }

  async function handleInactivate(id) {
    if (!confirm('Mark this employee as inactive?')) return;
    try {
      const res = await fetch(`/api/user/inactivate/${id}`, { method: 'POST' });
      if (res.ok) fetchEmployees(page);
      else alert('Failed to change status');
    } catch (e) { alert('Request failed'); }
  }

  function renderActions(row) {
    // show status column when superAdmin
    return (
      <td>
        <div className="actions-dropdown">
          <button className="btn small"> <i className="bi bi-three-dots-vertical"></i> </button>
          <div className="actions-menu">
            <button className="action-item" onClick={() => handleView(row.id)}><i className="bi bi-person"></i> View</button>
            <button className="action-item" onClick={() => handleEdit(row.id)}><i className="bi bi-pencil"></i> Edit</button>
            {me && me.rank === 'superAdmin' && (
              <>
                <button className="action-item" onClick={() => handleInactivate(row.id)}><i className="bi bi-toggle-off"></i> Inactivate</button>
              </>
            )}
          </div>
        </div>
      </td>
    );
  }

  return (
    <div className="list-container">
      <div className="list-header">
        <h2>Active Employee List</h2>
        <p>View and manage all active employees</p>
      </div>

      <div className="list-content">
        <table className="list-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Employee Id</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Reporting To</th>
              {me && me.rank === 'superAdmin' && <th>STATUS</th>}
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} style={{textAlign:'center', padding:40}}>Loading...</td></tr>
            ) : employees.length === 0 ? (
              <tr><td colSpan={7} style={{textAlign:'center', padding:40}}>No employees found</td></tr>
            ) : (
              employees.map(row => (
                <tr key={row.id}>
                  <td>{(row.firstName||row.first_name||'') + ' ' + (row.lastName||row.last_name||'')}</td>
                  <td>{row.username || row.employee_no}</td>
                  <td>{row.official_phone || row.mobile || ''}</td>
                  <td>{row.official_email || row.email_id || ''}</td>
                  <td>{row.reportingToName || row.reportingTo || ''}</td>
                  {me && me.rank === 'superAdmin' && <td><span className="badge bg-success">Active</span></td>}
                  {renderActions(row)}
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="pagination">
          <button className="btn" onClick={() => setPage(p => Math.max(1, p-1))} disabled={page===1}>Prev</button>
          <span style={{padding:'0 12px'}}>Page {page} / {totalPages}</span>
          <button className="btn" onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page===totalPages}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default ActiveEmpList;
