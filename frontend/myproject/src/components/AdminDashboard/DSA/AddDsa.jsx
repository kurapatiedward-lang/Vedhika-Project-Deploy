import React, { useState, useEffect } from 'react';

function AddDsa() {
  // State for form data
  const [formData, setFormData] = useState({
    vendor_bank: '',
    dsa_code: '',
    bsa_name: '',
    loan_type: '',
    state: '',
    location: ''
  });

  // State for dropdown data
  const [vendorBanks, setVendorBanks] = useState([]);
  const [bsaNames, setBsaNames] = useState([]);
  const [loanTypes, setLoanTypes] = useState([]);
  const [branchStates, setBranchStates] = useState([]);
  const [branchLocations, setBranchLocations] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingLocations, setLoadingLocations] = useState(false);

  // Sample data for dropdowns
  useEffect(() => {
    // Simulate API calls to fetch data
    setTimeout(() => {
      setVendorBanks([
        { id: 1, vendor_bank_name: 'ABC Vendor Bank' },
        { id: 2, vendor_bank_name: 'XYZ Financial Services' },
        { id: 3, vendor_bank_name: 'PQR Merchant Bank' }
      ]);

      setBsaNames([
        { id: 1, bsa_name: 'John Smith' },
        { id: 2, bsa_name: 'Sarah Johnson' },
        { id: 3, bsa_name: 'Michael Brown' }
      ]);

      setLoanTypes([
        { id: 1, loan_type: 'Personal Loan' },
        { id: 2, loan_type: 'Home Loan' },
        { id: 3, loan_type: 'Business Loan' },
        { id: 4, loan_type: 'Car Loan' }
      ]);

      setBranchStates([
        { id: 1, branch_state_name: 'Maharashtra' },
        { id: 2, branch_state_name: 'Karnataka' },
        { id: 3, branch_state_name: 'Tamil Nadu' }
      ]);
    }, 500);
  }, []);

  // Load branch locations when state changes
  useEffect(() => {
    if (formData.state) {
      loadBranchLocations(formData.state);
    } else {
      setBranchLocations([]);
      setFormData(prev => ({ ...prev, location: '' }));
    }
  }, [formData.state]);

  const loadBranchLocations = (stateId) => {
    setLoadingLocations(true);
    
    // Simulate API call to fetch locations based on state
    setTimeout(() => {
      const locationsByState = {
        1: [
          { id: 1, branch_location: 'Mumbai' },
          { id: 2, branch_location: 'Pune' },
          { id: 3, branch_location: 'Nagpur' }
        ],
        2: [
          { id: 4, branch_location: 'Bangalore' },
          { id: 5, branch_location: 'Mysore' }
        ],
        3: [
          { id: 6, branch_location: 'Chennai' },
          { id: 7, branch_location: 'Coimbatore' }
        ]
      };

      setBranchLocations(locationsByState[stateId] || []);
      setLoadingLocations(false);
    }, 300);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'state') {
      // When state changes, reset location
      setFormData(prev => ({
        ...prev,
        [name]: value,
        location: ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    const requiredFields = ['vendor_bank', 'dsa_code', 'bsa_name', 'loan_type', 'state', 'location'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      alert('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      
      // Reset form
      setFormData({
        vendor_bank: '',
        dsa_code: '',
        bsa_name: '',
        loan_type: '',
        state: '',
        location: ''
      });
      setBranchLocations([]);
      setIsSubmitting(false);
      
      alert('DSA Code Added successfully!');
    }, 1000);
  };

  const handleClear = () => {
    setFormData({
      vendor_bank: '',
      dsa_code: '',
      bsa_name: '',
      loan_type: '',
      state: '',
      location: ''
    });
    setBranchLocations([]);
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="row">
        <div className="col-xl">
          <div className="card mb-6">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Add DSA Code</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Vendor Bank */}
                <div className="mb-3">
                  <label className="form-label" htmlFor="vendor_bank">
                    Vendor Bank <span className="text-danger">*</span>
                  </label>
                  <div className="input-group input-group-merge">
                    <span className="input-group-text">
                      <i className="bx bx-building"></i>
                    </span>
                    <select 
                      id="vendor_bank" 
                      name="vendor_bank" 
                      className="form-select"
                      value={formData.vendor_bank}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Vendor</option>
                      {vendorBanks.map(bank => (
                        <option key={bank.id} value={bank.id}>
                          {bank.vendor_bank_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* DSA Code */}
                <div className="mb-3">
                  <label className="form-label" htmlFor="dsa_code">
                    DSA Code <span className="text-danger">*</span>
                  </label>
                  <div className="input-group input-group-merge">
                    <span className="input-group-text">
                      <i className="bx bx-code-alt"></i>
                    </span>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="dsa_code" 
                      id="dsa_code" 
                      placeholder="DSA Code" 
                      value={formData.dsa_code}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  {/* DSA Name */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label" htmlFor="bsa_name">
                      DSA Name <span className="text-danger">*</span>
                    </label>
                    <div className="input-group input-group-merge">
                      <span className="input-group-text">
                        <i className="bx bx-id-card"></i>
                      </span>
                      <select 
                        id="bsa_name" 
                        name="bsa_name" 
                        className="form-select"
                        value={formData.bsa_name}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select DSA Name</option>
                        {bsaNames.map(bsa => (
                          <option key={bsa.id} value={bsa.id}>
                            {bsa.bsa_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Type of Loan */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label" htmlFor="loan_type">
                      Type Of Loan <span className="text-danger">*</span>
                    </label>
                    <div className="input-group input-group-merge">
                      <span className="input-group-text">
                        <i className="bx bx-briefcase"></i>
                      </span>
                      <select 
                        id="loan_type" 
                        name="loan_type" 
                        className="form-select"
                        value={formData.loan_type}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Loan Type</option>
                        {loanTypes.map(loan => (
                          <option key={loan.id} value={loan.id}>
                            {loan.loan_type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  {/* Branch State */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label" htmlFor="state">
                      Branch State <span className="text-danger">*</span>
                    </label>
                    <div className="input-group input-group-merge">
                      <span className="input-group-text">
                        <i className="bx bx-map-alt"></i>
                      </span>
                      <select 
                        id="state" 
                        name="state" 
                        className="form-select"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Branch State</option>
                        {branchStates.map(state => (
                          <option key={state.id} value={state.id}>
                            {state.branch_state_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Branch Location */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label" htmlFor="location">
                      Branch Location <span className="text-danger">*</span>
                    </label>
                    <div className="input-group input-group-merge">
                      <span className="input-group-text">
                        <i className="bx bx-id-card"></i>
                      </span>
                      <select 
                        id="location" 
                        name="location" 
                        className="form-select"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                        disabled={!formData.state || loadingLocations}
                      >
                        <option value="">Select Branch Location</option>
                        {loadingLocations ? (
                          <option value="" disabled>Loading locations...</option>
                        ) : (
                          branchLocations.map(loc => (
                            <option key={loc.id} value={loc.id}>
                              {loc.branch_location}
                            </option>
                          ))
                        )}
                      </select>
                      {loadingLocations && (
                        <div className="position-absolute top-50 end-0 translate-middle-y me-3">
                          <div className="spinner-border spinner-border-sm text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="text-end">
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
                    className="btn btn-secondary ms-2"
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
    </div>
  );
}

export default AddDsa;