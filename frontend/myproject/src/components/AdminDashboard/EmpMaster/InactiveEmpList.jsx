import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./styles/InactiveEmpList.css";

function InactiveEmpList() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 50;
  const navigate = useNavigate();

  useEffect(() => {
    const href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css';
    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    }
  }, []);

  useEffect(() => { fetchItems(page); }, [page]);

  function fetchItems(p = 1) {
    setLoading(true);
    fetch(`/api/inactive-employees?page=${p}&limit=${limit}`)
      .then(r => r.json())
      .then(data => {
        const list = data.data || data.items || data || [];
        const total = data.total || data.totalRows || (Array.isArray(list) ? list.length : 0);
        setItems(list);
        setTotalPages(Math.max(1, Math.ceil(total / limit)));
      })
      .catch(() => { setItems([]); setTotalPages(1); })
      .finally(() => setLoading(false));
  }

  function handleView(id) {
    navigate(`/admin-dashboard/emp/view/${id}`);
  }

  async function handleActivate(id) {
    if (!confirm('Activate this user?')) return;
    try {
      const res = await fetch(`/api/user/activate/${id}`, { method: 'POST' });
      if (res.ok) fetchItems(page);
      else alert('Failed to activate');
    } catch (e) { alert('Request failed'); }
  }

  return (
    <div className="list-container">
      <div className="list-header">
        <h2>Inactive Employee List</h2>
        <p>View and manage all inactive employees</p>
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
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} style={{textAlign:'center', padding:40}}>Loading...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={6} style={{textAlign:'center', padding:40}}>No inactive users found</td></tr>
            ) : (
              items.map(row => (
                <tr key={row.id}>
                  <td>{(row.firstName||row.first_name||'') + ' ' + (row.lastName||row.last_name||'')}</td>
                  <td>{row.username || row.employee_no}</td>
                  <td>{row.official_phone || row.mobile || ''}</td>
                  <td>{row.official_email || row.email_id || ''}</td>
                  <td>{row.reportingToName || row.reportingTo || ''}</td>
                  <td>
                    <button className="btn small activate-btn" onClick={() => handleActivate(row.id)}>
                      <i className="bi bi-arrow-counterclockwise"></i> Activate
                    </button>
                  </td>
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

export default InactiveEmpList;
