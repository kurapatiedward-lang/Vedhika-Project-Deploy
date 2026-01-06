import React, { useState, useEffect } from 'react';
import './styles/DsaList.css';

function DsaList() {
  // State for data
  const [dsaCodes, setDsaCodes] = useState([]);
  const [filteredDsaCodes, setFilteredDsaCodes] = useState([]);
  const [vendorBanks, setVendorBanks] = useState([]);
  const [loanTypes, setLoanTypes] = useState([]);
  const [branchStates, setBranchStates] = useState([]);
  const [branchLocations, setBranchLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingLocations, setLoadingLocations] = useState(false);

  // State for filters
  const [filters, setFilters] = useState({
    vendor_bank: '',
    loan_type: '',
    state: '',
    location: ''
  });

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  const [totalPages, setTotalPages] = useState(1);

  // Sample data
  useEffect(() => {
    // Simulate API calls
    setTimeout(() => {
      // Vendor Banks
      setVendorBanks([
        { id: 1, vendor_bank_name: 'ABC Vendor Bank' },
        { id: 2, vendor_bank_name: 'XYZ Financial Services' },
        { id: 3, vendor_bank_name: 'PQR Merchant Bank' }
      ]);

      // Loan Types
      setLoanTypes([
        { id: 1, loan_type: 'Personal Loan' },
        { id: 2, loan_type: 'Home Loan' },
        { id: 3, loan_type: 'Business Loan' },
        { id: 4, loan_type: 'Car Loan' }
      ]);

      // Branch States
      setBranchStates([
        { id: 1, branch_state_name: 'Maharashtra' },
        { id: 2, branch_state_name: 'Karnataka' },
        { id: 3, branch_state_name: 'Tamil Nadu' }
      ]);

      // DSA Codes Data
      const sampleDsaCodes = [
        {
          id: 1,
          vendor_bank: 1,
          dsa_code: 'DSA001',
          bsa_name: 1,
          loan_type: 1,
          state: 1,
          location: 1
        },
        {
          id: 2,
          vendor_bank: 2,
          dsa_code: 'DSA002',
          bsa_name: 2,
          loan_type: 2,
          state: 2,
          location: 4
        },
        {
          id: 3,
          vendor_bank: 3,
          dsa_code: 'DSA003',
          bsa_name: 3,
          loan_type: 3,
          state: 3,
          location: 6
        },
        {
          id: 4,
          vendor_bank: 1,
          dsa_code: 'DSA004',
          bsa_name: 4,
          loan_type: 1,
          state: 1,
          location: 2
        },
        {
          id: 5,
          vendor_bank: 2,
          dsa_code: 'DSA005',
          bsa_name: 5,
          loan_type: 4,
          state: 2,
          location: 5
        },
        {
          id: 6,
          vendor_bank: 3,
          dsa_code: 'DSA006',
          bsa_name: 6,
          loan_type: 2,
          state: 3,
          location: 7
        }
      ];

      setDsaCodes(sampleDsaCodes);
      setFilteredDsaCodes(sampleDsaCodes);
      setTotalPages(Math.ceil(sampleDsaCodes.length / itemsPerPage));
      setLoading(false);
    }, 1000);
  }, []);

  // Load locations when state changes
  useEffect(() => {
    if (filters.state) {
      loadBranchLocations(filters.state);
    } else {
      setBranchLocations([]);
      setFilters(prev => ({ ...prev, location: '' }));
    }
  }, [filters.state]);

  const loadBranchLocations = (stateId) => {
    setLoadingLocations(true);
    
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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'state') {
      setFilters(prev => ({
        ...prev,
        [name]: value,
        location: ''
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const applyFilters = (e) => {
    e.preventDefault();
    
    let filtered = [...dsaCodes];
    
    // Apply filters
    if (filters.vendor_bank) {
      filtered = filtered.filter(item => item.vendor_bank === parseInt(filters.vendor_bank));
    }
    
    if (filters.loan_type) {
      filtered = filtered.filter(item => item.loan_type === parseInt(filters.loan_type));
    }
    
    if (filters.state) {
      filtered = filtered.filter(item => item.state === parseInt(filters.state));
    }
    
    if (filters.location) {
      filtered = filtered.filter(item => item.location === parseInt(filters.location));
    }
    
    setFilteredDsaCodes(filtered);
    setCurrentPage(1);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
  };

  const resetFilters = () => {
    setFilters({
      vendor_bank: '',
      loan_type: '',
      state: '',
      location: ''
    });
    setFilteredDsaCodes(dsaCodes);
    setCurrentPage(1);
    setTotalPages(Math.ceil(dsaCodes.length / itemsPerPage));
    setBranchLocations([]);
  };

  const handleEdit = (id) => {
    alert(`Edit DSA Code ${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this DSA Code?')) {
      const updatedDsaCodes = dsaCodes.filter(item => item.id !== id);
      setDsaCodes(updatedDsaCodes);
      setFilteredDsaCodes(updatedDsaCodes.filter(item => 
        (!filters.vendor_bank || item.vendor_bank === parseInt(filters.vendor_bank)) &&
        (!filters.loan_type || item.loan_type === parseInt(filters.loan_type)) &&
        (!filters.state || item.state === parseInt(filters.state)) &&
        (!filters.location || item.location === parseInt(filters.location))
      ));
      alert('DSA Code deleted successfully!');
    }
  };

  // Helper functions to get names from IDs
  const getVendorBankName = (id) => {
    const bank = vendorBanks.find(b => b.id === id);
    return bank ? bank.vendor_bank_name : 'Unknown';
  };

  const getLoanTypeName = (id) => {
    const loan = loanTypes.find(l => l.id === id);
    return loan ? loan.loan_type : 'Unknown';
  };

  const getBranchStateName = (id) => {
    const state = branchStates.find(s => s.id === id);
    return state ? state.branch_state_name : 'Unknown';
  };

  const getBranchLocationName = (id) => {
    const location = branchLocations.find(l => l.id === id);
    return location ? location.branch_location : 'Unknown';
  };

  const getDsaName = (id) => {
    const dsaNames = {
      1: 'John Smith',
      2: 'Sarah Johnson',
      3: 'Michael Brown',
      4: 'Emily Davis',
      5: 'David Wilson',
      6: 'Lisa Taylor'
    };
    return dsaNames[id] || 'Unknown';
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDsaCodes.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPagination = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage, endPage;

    if (totalPages <= maxVisiblePages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const maxPagesBeforeCurrent = Math.floor(maxVisiblePages / 2);
      const maxPagesAfterCurrent = Math.ceil(maxVisiblePages / 2) - 1;
      
      if (currentPage <= maxPagesBeforeCurrent) {
        startPage = 1;
        endPage = maxVisiblePages;
      } else if (currentPage + maxPagesAfterCurrent >= totalPages) {
        startPage = totalPages - maxVisiblePages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxPagesBeforeCurrent;
        endPage = currentPage + maxPagesAfterCurrent;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="pagination">
        <button 
          className="pagination-btn"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &laquo; Prev
        </button>
        
        {startPage > 1 && (
          <>
            <button className="pagination-btn" onClick={() => paginate(1)}>1</button>
            {startPage > 2 && <span className="pagination-dots">...</span>}
          </>
        )}
        
        {pageNumbers.map(number => (
          <button
            key={number}
            className={`pagination-btn ${currentPage === number ? 'active' : ''}`}
            onClick={() => paginate(number)}
          >
            {number}
          </button>
        ))}
        
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="pagination-dots">...</span>}
            <button className="pagination-btn" onClick={() => paginate(totalPages)}>{totalPages}</button>
          </>
        )}
        
        <button 
          className="pagination-btn"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next &raquo;
        </button>
      </div>
    );
  };

  return (
    <div className="dsa-list-container">
      <div className="container">
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading DSA Code List...</p>
          </div>
        ) : (
          <div className="card">
            <div className="card-header">
              <h2>DSA Code List</h2>
            </div>
            
            {/* Filter Form */}
            <div className="filter-section">
              <form onSubmit={applyFilters} className="filter-form">
                <div className="filter-grid">
                  {/* Vendor Bank Filter */}
                  <div className="filter-group">
                    <label>Vendor Bank</label>
                    <select 
                      name="vendor_bank" 
                      className="filter-select"
                      value={filters.vendor_bank}
                      onChange={handleFilterChange}
                    >
                      <option value="">Select Vendor Bank</option>
                      {vendorBanks.map(bank => (
                        <option key={bank.id} value={bank.id}>
                          {bank.vendor_bank_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Loan Type Filter */}
                  <div className="filter-group">
                    <label>Loan Type</label>
                    <select 
                      name="loan_type" 
                      className="filter-select"
                      value={filters.loan_type}
                      onChange={handleFilterChange}
                    >
                      <option value="">Select Loan Type</option>
                      {loanTypes.map(loan => (
                        <option key={loan.id} value={loan.id}>
                          {loan.loan_type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* State Filter */}
                  <div className="filter-group">
                    <label>Branch State</label>
                    <select 
                      name="state" 
                      className="filter-select"
                      value={filters.state}
                      onChange={handleFilterChange}
                    >
                      <option value="">Select State</option>
                      {branchStates.map(state => (
                        <option key={state.id} value={state.id}>
                          {state.branch_state_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Location Filter */}
                  <div className="filter-group">
                    <label>Branch Location</label>
                    <div className="select-wrapper">
                      <select 
                        name="location" 
                        className="filter-select"
                        value={filters.location}
                        onChange={handleFilterChange}
                        disabled={!filters.state || loadingLocations}
                      >
                        <option value="">Select Location</option>
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
                        <div className="select-spinner">
                          <div className="spinner-small"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Filter & Reset Buttons */}
                <div className="filter-actions">
                  <button type="submit" className="btn btn-primary">
                    <span className="btn-icon">⚡</span>
                    Apply Filters
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={resetFilters}>
                    <span className="btn-icon">↺</span>
                    Reset Filters
                  </button>
                  <div className="filter-info">
                    Showing {filteredDsaCodes.length} of {dsaCodes.length} records
                    {Object.values(filters).some(f => f) && ' (filtered)'}
                  </div>
                </div>
              </form>
            </div>

            {/* Table */}
            <div className="table-container">
              <div className="table-responsive">
                <table className="dsa-table">
                  <thead>
                    <tr>
                      <th>Vendor Bank</th>
                      <th>DSA Code</th>
                      <th>DSA Name</th>
                      <th>Loan Type</th>
                      <th>State</th>
                      <th>Location</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.length > 0 ? (
                      currentItems.map(item => (
                        <tr key={item.id}>
                          <td>
                            <div className="table-cell-content">
                              <span className="cell-icon">🏦</span>
                              {getVendorBankName(item.vendor_bank)}
                            </div>
                          </td>
                          <td>
                            <span className="dsa-code-badge">{item.dsa_code}</span>
                          </td>
                          <td>{getDsaName(item.bsa_name)}</td>
                          <td>
                            <span className="loan-type-badge">
                              {getLoanTypeName(item.loan_type)}
                            </span>
                          </td>
                          <td>{getBranchStateName(item.state)}</td>
                          <td>{getBranchLocationName(item.location)}</td>
                          <td>
                            <div className="actions-dropdown">
                              <button className="dropdown-toggle">
                                <span>⋯</span>
                              </button>
                              <div className="dropdown-menu">
                                <button className="dropdown-item" onClick={() => handleEdit(item.id)}>
                                  <span className="dropdown-icon">✏️</span>
                                  Edit
                                </button>
                                <button className="dropdown-item delete" onClick={() => handleDelete(item.id)}>
                                  <span className="dropdown-icon">🗑️</span>
                                  Delete
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="no-data">
                          <div className="empty-state">
                            <span className="empty-icon">🔍</span>
                            <p>No DSA Codes found</p>
                            {Object.values(filters).some(f => f) && (
                              <small>Try adjusting your filters</small>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                
                {/* Pagination */}
                {filteredDsaCodes.length > itemsPerPage && (
                  <div className="pagination-section">
                    <div className="pagination-info">
                      Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredDsaCodes.length)} of {filteredDsaCodes.length} entries
                    </div>
                    {renderPagination()}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DsaList;