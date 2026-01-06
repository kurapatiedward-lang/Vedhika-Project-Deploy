import React from 'react';
import "./styles/Payout.css";

function PayoutType() {
  return (
    <div className="master-page-container">
      <div className="master-header">
        <h2>Payout Type</h2>
        <p>Manage payout types</p>
      </div>
      <div className="master-content">
        <div className="form-section">
          <h3>Add/Edit Type</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Type Name *</label>
              <input type="text" placeholder="Enter type name" />
            </div>
            <div className="form-group">
              <label>Type Code *</label>
              <input type="text" placeholder="Enter type code" />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select>
                <option>Select Category</option>
              </select>
            </div>
            <div className="form-group">
              <label>Status</label>
              <select>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
          <div className="form-actions">
            <button className="btn btn-primary">Save Type</button>
            <button className="btn btn-secondary">Clear</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PayoutType;
