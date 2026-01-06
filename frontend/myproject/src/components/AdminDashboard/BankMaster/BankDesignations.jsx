import React, { useState } from 'react';

function BankDesignations() {
  // Sample banker designation data
  const [designations, setDesignations] = useState([
    { id: 1, designation_name: 'Bank Manager', status: 1 },
    { id: 2, designation_name: 'Assistant Manager', status: 1 },
    { id: 3, designation_name: 'Relationship Officer', status: 1 },
    { id: 4, designation_name: 'Loan Officer', status: 1 },
    { id: 5, designation_name: 'Branch Head', status: 1 }
  ]);

  const [formData, setFormData] = useState({
    designation_name: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (!formData.designation_name.trim()) {
      alert('Banker Designation field is required');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call delay
    setTimeout(() => {
      // Add new designation
      const newDesignation = {
        id: designations.length + 1,
        designation_name: formData.designation_name,
        status: 1
      };

      setDesignations([...designations, newDesignation]);
      
      // Reset form
      setFormData({ designation_name: '' });
      setIsSubmitting(false);
      
      alert('Banker Designation Added Successfully!');
    }, 500);
  };

  const handleClear = () => {
    setFormData({ designation_name: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this banker designation?')) {
      const updatedDesignations = designations.filter(designation => designation.id !== id);
      setDesignations(updatedDesignations);
      alert('Banker Designation deleted successfully!');
    }
  };

  const handleEdit = (id) => {
    const designationToEdit = designations.find(designation => designation.id === id);
    if (designationToEdit) {
      const newName = prompt('Enter new banker designation:', designationToEdit.designation_name);
      if (newName && newName.trim()) {
        const updatedDesignations = designations.map(designation => 
          designation.id === id ? { ...designation, designation_name: newName.trim() } : designation
        );
        setDesignations(updatedDesignations);
        alert('Banker Designation updated successfully!');
      }
    }
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="row">
        <div className="col-xl">
          <div className="card mb-6">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Add Banker Designation</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <div className="input-group input-group-merge">
                    <span className="input-group-text">
                      <i className="bx bx-id-card"></i>
                    </span>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="designation_name" 
                      id="designation_name" 
                      placeholder="Banker Designation" 
                      value={formData.designation_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-text text-muted mt-1">
                    Enter banker designation (e.g., Bank Manager, Loan Officer, etc.)
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Adding...
                      </>
                    ) : (
                      'Add Banker Designation'
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
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl">
          <div className="card">
            <h5 className="card-header">Banker Designation List</h5>
            <div className="table-responsive text-nowrap">
              <table className="table">
                <thead className="table-dark">
                  <tr>
                    <th>Name</th>
                    <th>STATUS</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {designations.length > 0 ? (
                    designations.map(designation => (
                      <tr key={designation.id}>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <i className="bx bx-user-badge" style={{ color: '#17a2b8' }}></i>
                            <span>{designation.designation_name}</span>
                          </div>
                        </td>
                        <td>
                          {designation.status === 1 ? (
                            <span className="badge bg-primary">Active</span>
                          ) : (
                            <span className="badge bg-danger">Inactive</span>
                          )}
                        </td>
                        <td>
                          <div className="dropdown">
                            <button 
                              className="btn btn-sm btn-secondary dropdown-toggle" 
                              type="button" 
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="bx bx-dots-vertical-rounded"></i>
                            </button>
                            <ul className="dropdown-menu">
                              <li>
                                <button 
                                  className="dropdown-item" 
                                  onClick={() => handleEdit(designation.id)}
                                >
                                  <i className="bx bx-edit me-2"></i> Edit
                                </button>
                              </li>
                              <li>
                                <button 
                                  className="dropdown-item text-danger" 
                                  onClick={() => handleDelete(designation.id)}
                                >
                                  <i className="bx bx-trash me-2"></i> Delete
                                </button>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center py-4">
                        <div className="text-muted">
                          <i className="bx bx-id-card bx-lg mb-2"></i>
                          <p className="mb-0">No banker designations found</p>
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
    </div>
  );
}

export default BankDesignations;