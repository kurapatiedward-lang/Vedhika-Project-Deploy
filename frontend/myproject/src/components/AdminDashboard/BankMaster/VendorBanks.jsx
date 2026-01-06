import React, { useState } from 'react';

function VendorBank() {
  // Sample vendor bank data
  const [vendorBanks, setVendorBanks] = useState([
    { id: 1, vendor_bank_name: 'ABC Vendor Bank', status: 1 },
    { id: 2, vendor_bank_name: 'XYZ Financial Services', status: 1 },
    { id: 3, vendor_bank_name: 'PQR Merchant Bank', status: 1 },
    { id: 4, vendor_bank_name: 'LMN Corporate Bank', status: 1 },
    { id: 5, vendor_bank_name: 'DEF Vendor Solutions', status: 1 }
  ]);

  const [formData, setFormData] = useState({
    vendor_bank_name: ''
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
    if (!formData.vendor_bank_name.trim()) {
      alert('Vendor Bank field is required');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call delay
    setTimeout(() => {
      // Add new vendor bank
      const newVendorBank = {
        id: vendorBanks.length + 1,
        vendor_bank_name: formData.vendor_bank_name,
        status: 1
      };

      setVendorBanks([...vendorBanks, newVendorBank]);
      
      // Reset form
      setFormData({ vendor_bank_name: '' });
      setIsSubmitting(false);
      
      alert('Vendor Bank Added Successfully!');
    }, 500);
  };

  const handleClear = () => {
    setFormData({ vendor_bank_name: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this vendor bank?')) {
      const updatedVendorBanks = vendorBanks.filter(bank => bank.id !== id);
      setVendorBanks(updatedVendorBanks);
      alert('Vendor Bank deleted successfully!');
    }
  };

  const handleEdit = (id) => {
    const vendorBankToEdit = vendorBanks.find(bank => bank.id === id);
    if (vendorBankToEdit) {
      const newName = prompt('Enter new vendor bank name:', vendorBankToEdit.vendor_bank_name);
      if (newName && newName.trim()) {
        const updatedVendorBanks = vendorBanks.map(bank => 
          bank.id === id ? { ...bank, vendor_bank_name: newName.trim() } : bank
        );
        setVendorBanks(updatedVendorBanks);
        alert('Vendor Bank updated successfully!');
      }
    }
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="row">
        <div className="col-xl">
          <div className="card mb-6">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Add Vendor Bank</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <div className="input-group input-group-merge">
                    <span className="input-group-text">
                      <i className="bx bx-buildings"></i>
                    </span>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="vendor_bank_name" 
                      id="vendor_bank_name" 
                      placeholder="Vendor Bank Name" 
                      value={formData.vendor_bank_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-text text-muted mt-1">
                    Enter the name of the vendor bank
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
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl">
          <div className="card">
            <h5 className="card-header">Vendor Bank List</h5>
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
                  {vendorBanks.length > 0 ? (
                    vendorBanks.map(vendorBank => (
                      <tr key={vendorBank.id}>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <i className="bx bx-building" style={{ color: '#28a745' }}></i>
                            <span>{vendorBank.vendor_bank_name}</span>
                          </div>
                        </td>
                        <td>
                          {vendorBank.status === 1 ? (
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
                                  onClick={() => handleEdit(vendorBank.id)}
                                >
                                  <i className="bx bx-edit me-2"></i> Edit
                                </button>
                              </li>
                              <li>
                                <button 
                                  className="dropdown-item text-danger" 
                                  onClick={() => handleDelete(vendorBank.id)}
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
                          <i className="bx bx-building-house bx-lg mb-2"></i>
                          <p className="mb-0">No vendor banks found</p>
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

export default VendorBank;