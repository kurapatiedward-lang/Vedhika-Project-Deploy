import React from 'react';
import "./styles/Payout.css";

function PayoutCategory() {
  return (
    <div className="master-page-container">
      <div className="master-header">
        <h2>Payout Category</h2>
        <p>Manage payout categories</p>
      </div>
      <div className="master-content">
        <div className="form-section">
          <h3>Add/Edit Category</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Category Name *</label>
              <input type="text" placeholder="Enter category name" />
            </div>
            <div className="form-group">
              <label>Category Code *</label>
              <input type="text" placeholder="Enter category code" />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea placeholder="Enter description" rows="3" style={{ width: '100%', padding: '8px', marginTop: '4px' }}></textarea>
            </div>
          </div>
          <div className="form-actions">
            <button className="btn btn-primary">Save Category</button>
            <button className="btn btn-secondary">Clear</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PayoutCategory;
