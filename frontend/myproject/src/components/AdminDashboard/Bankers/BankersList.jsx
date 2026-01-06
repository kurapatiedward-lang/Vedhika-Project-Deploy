import React from 'react';
import "./styles/Bankers.css";

function BankersList() {
  return (
    <div className="master-page-container">
      <div className="master-header">
        <h2>Bankers List</h2>
        <p>View and manage all bankers</p>
      </div>
      <div className="master-content">
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa' }}>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Banker Name</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Bank</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Contact</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="4" style={{ textAlign: 'center', padding: '40px' }}>No bankers found</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BankersList;
