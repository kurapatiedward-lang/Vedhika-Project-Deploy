import React from 'react';
import "./styles/Payout.css";

function Payout() {
  return (
    <div className="master-page-container">
      <div className="master-header">
        <h2>Payout</h2>
        <p>Manage payout records</p>
      </div>
      <div className="master-content">
        <div className="form-section">
          <h3>Add/Edit Payout</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Employee *</label>
              <select>
                <option>Select Employee</option>
              </select>
            </div>
            <div className="form-group">
              <label>Payout Category *</label>
              <select>
                <option>Select Category</option>
              </select>
            </div>
            <div className="form-group">
              <label>Payout Type *</label>
              <select>
                <option>Select Type</option>
              </select>
            </div>
            <div className="form-group">
              <label>Amount *</label>
              <input type="number" placeholder="Enter amount" />
            </div>
            <div className="form-group">
              <label>Date *</label>
              <input type="date" />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select>
                <option>Pending</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
            </div>
          </div>
          <div className="form-actions">
            <button className="btn btn-primary">Save Payout</button>
            <button className="btn btn-secondary">Clear</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payout;
