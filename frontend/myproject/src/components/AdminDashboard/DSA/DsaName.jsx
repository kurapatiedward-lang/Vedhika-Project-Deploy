import React, { useState } from 'react';
import './styles/DsaName.css';

function DsaName() {
  // Sample DSA names data
  const [dsaNames, setDsaNames] = useState([
    { id: 1, bsa_name: 'John Smith', status: 1 },
    { id: 2, bsa_name: 'Sarah Johnson', status: 1 },
    { id: 3, bsa_name: 'Michael Brown', status: 1 },
    { id: 4, bsa_name: 'Emily Davis', status: 1 },
    { id: 5, bsa_name: 'David Wilson', status: 1 }
  ]);

  const [formData, setFormData] = useState({
    bsa_name: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.bsa_name.trim()) {
      alert('DSA Name field is required');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call delay
    setTimeout(() => {
      // Add new DSA name
      const newDsaName = {
        id: dsaNames.length + 1,
        bsa_name: formData.bsa_name,
        status: 1
      };

      setDsaNames([...dsaNames, newDsaName]);
      
      // Reset form
      setFormData({ bsa_name: '' });
      setIsSubmitting(false);
      
      alert('DSA Name Added Successfully!');
    }, 500);
  };

  const handleClear = () => {
    setFormData({ bsa_name: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this DSA Name?')) {
      const updatedDsaNames = dsaNames.filter(name => name.id !== id);
      setDsaNames(updatedDsaNames);
      alert('DSA Name deleted successfully!');
    }
  };

  const handleEdit = (id) => {
    const dsaNameToEdit = dsaNames.find(name => name.id === id);
    if (dsaNameToEdit) {
      const newName = prompt('Enter new DSA name:', dsaNameToEdit.bsa_name);
      if (newName && newName.trim()) {
        const updatedDsaNames = dsaNames.map(name => 
          name.id === id ? { ...name, bsa_name: newName.trim() } : name
        );
        setDsaNames(updatedDsaNames);
        alert('DSA Name updated successfully!');
      }
    }
  };

  const toggleSort = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    
    const sortedNames = [...dsaNames].sort((a, b) => {
      const nameA = a.bsa_name.toLowerCase();
      const nameB = b.bsa_name.toLowerCase();
      
      if (newSortOrder === 'asc') {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
    
    setDsaNames(sortedNames);
  };

  return (
    <div className="master-page-container">
      <div className="master-header">
        <h2>DSA Name Management</h2>
        <p>Add and manage DSA names</p>
      </div>
      
      <div className="master-content">
        {/* Add DSA Name Form */}
        <div className="form-section">
          <h3>Add New DSA Name</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group-full">
              <div className="form-group">
                <label htmlFor="bsa_name">
                  <i className="icon-building"></i> DSA Name <span className="required">*</span>
                </label>
                <div className="input-with-icon">
                  <i className="icon-building icon-left"></i>
                  <input 
                    id="bsa_name" 
                    type="text" 
                    name="bsa_name"
                    placeholder="Enter DSA name" 
                    value={formData.bsa_name}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-hint">
                  Enter the DSA (Direct Selling Agent) name
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Submitting...
                  </>
                ) : (
                  'Submit'
                )}
              </button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={handleClear}
                disabled={isSubmitting}
              >
                Clear
              </button>
            </div>
          </form>
        </div>

        {/* DSA Name List Table */}
        <div className="table-section">
          <div className="table-header">
            <h3>DSA Name List</h3>
            <button 
              className="sort-btn"
              onClick={toggleSort}
              title={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
            >
              <i className={`sort-icon ${sortOrder === 'asc' ? 'asc' : 'desc'}`}>
                {sortOrder === 'asc' ? '↑' : '↓'}
              </i>
              Sort {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
            </button>
          </div>
          
          <div className="table-responsive">
            <table className="master-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {dsaNames.length > 0 ? (
                  dsaNames.map(dsaName => (
                    <tr key={dsaName.id}>
                      <td>
                        <div className="name-cell">
                          <i className="icon-user"></i>
                          <span>{dsaName.bsa_name}</span>
                        </div>
                      </td>
                      <td>
                        {dsaName.status === 1 ? (
                          <span className="status-badge active">Active</span>
                        ) : (
                          <span className="status-badge inactive">Inactive</span>
                        )}
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="btn-edit"
                            title="Edit"
                            onClick={() => handleEdit(dsaName.id)}
                          >
                            <i className="icon-edit"></i>
                          </button>
                          <button 
                            onClick={() => handleDelete(dsaName.id)}
                            className="btn-delete"
                            title="Delete"
                          >
                            <i className="icon-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="no-data">
                      <div className="empty-state">
                        <i className="icon-user-large"></i>
                        <p>No DSA names found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DsaName;