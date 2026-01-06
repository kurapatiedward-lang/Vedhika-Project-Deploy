import React from 'react';
import "./styles/Bankers.css";

function AddBanker() {
  return (
    <div className="master-page-container">
      <div className="master-header">
        <h2>Add Banker</h2>
        <p>Register a new banker in the system</p>
      </div>
      <div className="master-content">
        <div className="form-section">
          <h3>Banker Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="banker-name">Banker Name *</label>
              <input id="banker-name" type="text" placeholder="Enter banker name" required />
            </div>
            <div className="form-group">
              <label htmlFor="banker-bank">Bank Name</label>
              <select id="banker-bank">
                <option>Select Bank</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="banker-contact">Contact</label>
              <input id="banker-contact" type="tel" placeholder="Enter contact number" />
            </div>
            <div className="form-group">
              <label htmlFor="banker-email">Email</label>
              <input id="banker-email" type="email" placeholder="Enter email" />
            </div>
          </div>
          <div className="form-actions">
            <button className="btn btn-primary">Add Banker</button>
            <button className="btn btn-secondary">Clear</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBanker;
