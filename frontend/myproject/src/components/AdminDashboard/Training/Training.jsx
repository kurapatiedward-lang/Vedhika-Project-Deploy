import React from 'react';
import "./styles/Training.css";

function Training() {
  return (
    <div className="master-page-container">
      <div className="master-header">
        <h2>Training Programs</h2>
        <p>Manage training programs and modules</p>
      </div>
      <div className="master-content">
        <div style={{ marginBottom: '30px' }}>
          <h3>Add New Training Program</h3>
          <div className="form-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-group">
              <label>Program Name *</label>
              <input type="text" placeholder="Enter program name" />
            </div>
            <div className="form-group">
              <label>Trainer Name *</label>
              <input type="text" placeholder="Enter trainer name" />
            </div>
            <div className="form-group">
              <label>Duration (Days) *</label>
              <input type="number" placeholder="Enter duration" />
            </div>
            <div className="form-group">
              <label>Start Date *</label>
              <input type="date" />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea placeholder="Enter description" rows="3" style={{ width: '100%', padding: '8px', marginTop: '4px' }}></textarea>
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
            <button className="btn btn-primary">Create Program</button>
            <button className="btn btn-secondary">Clear</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Training;
