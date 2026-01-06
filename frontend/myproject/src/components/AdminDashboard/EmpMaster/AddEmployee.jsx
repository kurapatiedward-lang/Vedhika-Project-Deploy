// src/components/AddEmployee.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/AddEmployee.css';

const AddEmployee = () => {
  const API_BASE_URL = 'http://localhost:8000';
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    employee_no: '',
    password: '',
    Phone_number: '',
    email_id: '',
    official_phone: '',
    official_email: '',
    branch_state: '',
    branch_location: '',
    department: '',
    designation: '',
    aadhaar_number: '',
    pan_number: '',
    account_number: '',
    ifsc_code: '',
    bank_name: '',
    account_type: '',
    present_address: '',
    permanent_address: '',
    reportingTo: '',
    birth_date: '',
    pan_img: null,
    aadhaar_img: null,
    bankproof_img: null,
    emp_image: null,
  });

  const [dropdowns, setDropdowns] = useState({
    branchStates: [],
    branchLocations: [],
    departments: [],
    designations: [],
    banks: [],
    accountTypes: [],
    users: [],
  });

  const [usernameError, setUsernameError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingBranchStates, setLoadingBranchStates] = useState(false);
  const [loadingBranchLocations, setLoadingBranchLocations] = useState(false);

  // Load options for dropdowns
  useEffect(() => {
    fetchBranchStates();
    fetchDepartments();
    fetchBanks();
    fetchAccountTypes();
    fetchUsers();
  }, []);

  // Fetch branch states from Django API
  const fetchBranchStates = async () => {
    try {
      setLoadingBranchStates(true);
      const response = await axios.get(`${API_BASE_URL}/api/branch-states/`);
      
      // Filter only active states
      const activeStates = response.data.filter(state => state.status === true);
      
      setDropdowns(prev => ({ 
        ...prev, 
        branchStates: activeStates 
      }));
    } catch (error) {
      console.error('Error fetching branch states:', error);
      setDropdowns(prev => ({ ...prev, branchStates: [] }));
    } finally {
      setLoadingBranchStates(false);
    }
  };

  // Load branch locations when branch state changes
  const handleBranchStateChange = async (value) => {
    console.log('Branch state changed to:', value);
    
    setFormData(prev => ({
      ...prev,
      branch_state: value,
      branch_location: '' // Reset location when state changes
    }));

    if (value) {
      try {
        setLoadingBranchLocations(true);
        // Fetch all branch locations from API
        const response = await axios.get(`${API_BASE_URL}/api/branch-locations/`);
        console.log('All branch locations:', response.data);
        
        // Filter locations for the selected state AND active status
        const filteredLocations = response.data.filter(
          loc => loc.branch_state == value && loc.status === true
        );
        
        console.log('Filtered locations for state', value, ':', filteredLocations);
        setDropdowns(prev => ({ ...prev, branchLocations: filteredLocations }));
      } catch (error) {
        console.error('Error fetching branch locations:', error);
        setDropdowns(prev => ({ ...prev, branchLocations: [] }));
      } finally {
        setLoadingBranchLocations(false);
      }
    } else {
      setDropdowns(prev => ({ ...prev, branchLocations: [] }));
    }
  };

  // Fetch departments
  const fetchDepartments = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/departments/`);
      
      // Filter only active departments
      const activeDepartments = response.data.filter(dept => dept.status === true);
      
      setDropdowns(prev => ({ 
        ...prev, 
        departments: activeDepartments 
      }));
    } catch (err) {
      console.error('Error fetching departments:', err);
      setDropdowns(prev => ({ ...prev, departments: [] }));
    }
  };

  // Load designations when department changes
  const handleDepartmentChange = async (value) => {
    console.log('Selected department ID:', value);
    
    setFormData(prev => ({
      ...prev,
      department: value,
      designation: ''
    }));

    if (value) {
      try {
        // Fetch all designations and filter by department
        const response = await axios.get(`${API_BASE_URL}/api/designations/`);
        
        // Filter designations for the selected department AND active status
        const departmentDesignations = response.data.filter(
          des => des.department == value && des.status === true
        );
        
        setDropdowns(prev => ({ ...prev, designations: departmentDesignations }));
      } catch (err) {
        console.error('Error fetching designations:', err);
        setDropdowns(prev => ({ ...prev, designations: [] }));
      }
    } else {
      setDropdowns(prev => ({ ...prev, designations: [] }));
    }
  };

  // Fetch banks
  const fetchBanks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/banks/`);
      console.log('Banks API Response:', response.data);
      setDropdowns(prev => ({ ...prev, banks: response.data }));
    } catch (err) {
      console.error('Error fetching banks:', err);
      setDropdowns(prev => ({ ...prev, banks: [] }));
    }
  };

  // Fetch account types
  const fetchAccountTypes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/typeofaccounts/`);
      console.log('Account Types API Response:', response.data);
      setDropdowns(prev => ({ ...prev, accountTypes: response.data }));
    } catch (err) {
      console.error('Error fetching account types:', err);
      setDropdowns(prev => ({ ...prev, accountTypes: [] }));
    }
  };

  // Fetch users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users/`);
      setDropdowns(prev => ({ ...prev, users: response.data }));
    } catch (err) {
      console.error('Error fetching users:', err);
      setDropdowns(prev => ({ ...prev, users: [] }));
    }
  };

  // Check username uniqueness
  const checkUserName = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/check-username/`, {
        employee_no: formData.employee_no
      });
      
      if (response.data.exists) {
        setUsernameError('This Employee Id is already registered!');
      } else {
        setUsernameError('');
      }
    } catch (err) {
      console.error('Error checking username', err);
      setUsernameError('Error checking Employee Id.');
    } finally {
      setLoading(false);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      let processedValue = value;

      // Remove non-digits for specific fields
      if (['Phone_number', 'aadhaar_number', 'account_number', 'official_phone'].includes(name)) {
        processedValue = value.replace(/\D/g, '');
      }

      setFormData(prev => ({ ...prev, [name]: processedValue }));
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const requiredFields = [
      'first_name', 'last_name', 'employee_no', 'password', 'Phone_number', 'email_id',
      'official_phone', 'official_email', 'branch_state', 'branch_location',
      'department', 'designation', 'aadhaar_number', 'pan_number', 'account_number',
      'ifsc_code', 'bank_name', 'account_type', 'present_address', 'permanent_address',
      'reportingTo', 'birth_date'
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill the ${field.replace('_', ' ')} field`);
        return;
      }
    }

    // Prepare form data for submission
    const data = new FormData();

    // Add all form fields
    Object.entries(formData).forEach(([key, value]) => {
      if (value instanceof File) {
        data.append(key, value);
      } else if (value !== null && value !== undefined) {
        data.append(key, value);
      }
    });

    // Add additional data for backend
    const selectedState = dropdowns.branchStates.find(
      state => state.id === parseInt(formData.branch_state)
    );
    if (selectedState) {
      data.append('branch_state_name', selectedState.name);
    }

    const selectedLocation = dropdowns.branchLocations.find(
      loc => loc.id === parseInt(formData.branch_location)
    );
    if (selectedLocation) {
      data.append('branch_location_name', selectedLocation.name);
    }

    const selectedDept = dropdowns.departments.find(
      dept => dept.id === parseInt(formData.department)
    );
    if (selectedDept) {
      data.append('department_name', selectedDept.name);
    }

    const selectedDes = dropdowns.designations.find(
      des => des.id === parseInt(formData.designation)
    );
    if (selectedDes) {
      data.append('designation_name', selectedDes.name);
    }

    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/api/employees/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        alert('Employee Added Successfully');
        // Reset form
        resetForm();
      } else {
        alert('Error: ' + (response.data.message || 'Failed to add employee'));
      }
    } catch (err) {
      console.error('Error submitting form', err);
      alert('Error submitting form: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  // Reset form function
  const resetForm = () => {
    setFormData({
      first_name: '',
      last_name: '',
      employee_no: '',
      password: '',
      Phone_number: '',
      email_id: '',
      official_phone: '',
      official_email: '',
      branch_state: '',
      branch_location: '',
      department: '',
      designation: '',
      aadhaar_number: '',
      pan_number: '',
      account_number: '',
      ifsc_code: '',
      bank_name: '',
      account_type: '',
      present_address: '',
      permanent_address: '',
      reportingTo: '',
      birth_date: '',
      pan_img: null,
      aadhaar_img: null,
      bankproof_img: null,
      emp_image: null,
    });
    setUsernameError('');
    setDropdowns(prev => ({ 
      ...prev, 
      designations: [], 
      branchLocations: [] 
    }));
  };

  // Render form
  return (
    <div className="add-employee-container">
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        {/* First Name & Last Name */}
        <div className="row">
          <div className="form-group">
            <label>First Name <span className="required">*</span></label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="First Name"
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name <span className="required">*</span></label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              required
            />
          </div>
        </div>

        {/* Employee No & Password */}
        <div className="row">
          <div className="form-group">
            <label>Employee Id <span className="required">*</span></label>
            <input
              type="text"
              name="employee_no"
              value={formData.employee_no}
              onChange={handleChange}
              onBlur={checkUserName}
              placeholder="Employee No"
              required
            />
            {loading && <span className="loading-text">Checking...</span>}
            {usernameError && <small className="error">{usernameError}</small>}
          </div>
          <div className="form-group">
            <label>Password <span className="required">*</span></label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
        </div>

        {/* Phone Numbers & Emails */}
        <div className="row">
          <div className="form-group">
            <label>Personal Phone No <span className="required">*</span></label>
            <input
              type="tel"
              name="Phone_number"
              value={formData.Phone_number}
              onChange={handleChange}
              placeholder="6587998941"
              maxLength="10"
              minLength="10"
              required
            />
          </div>
          <div className="form-group">
            <label>Personal Email <span className="required">*</span></label>
            <input
              type="email"
              name="email_id"
              value={formData.email_id}
              onChange={handleChange}
              placeholder="User Email"
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="form-group">
            <label>Official Phone No <span className="required">*</span></label>
            <input
              type="tel"
              name="official_phone"
              value={formData.official_phone}
              onChange={handleChange}
              placeholder="0807998941"
              maxLength="10"
              minLength="10"
              required
            />
          </div>
          <div className="form-group">
            <label>Official Email <span className="required">*</span></label>
            <input
              type="email"
              name="official_email"
              value={formData.official_email}
              onChange={handleChange}
              placeholder="Office Email"
              required
            />
          </div>
        </div>

        {/* Branch State & Location - FIXED */}
        <div className="row">
          <div className="form-group">
            <label>Branch State <span className="required">*</span></label>
            <select
              name="branch_state"
              value={formData.branch_state}
              onChange={(e) => handleBranchStateChange(e.target.value)}
              disabled={loadingBranchStates}
              required
            >
              <option value="">Select Branch State</option>
              {dropdowns.branchStates.map(state => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
            {loadingBranchStates && <span className="loading-text">Loading states...</span>}
          </div>
          <div className="form-group">
            <label>Branch Location <span className="required">*</span></label>
            <select
              name="branch_location"
              value={formData.branch_location}
              onChange={handleChange}
              disabled={!formData.branch_state || loadingBranchLocations}
              required
            >
              <option value="">Select Branch Location</option>
              {loadingBranchLocations ? (
                <option value="" disabled>Loading locations...</option>
              ) : dropdowns.branchLocations.length === 0 ? (
                <option value="" disabled>
                  {formData.branch_state ? 'No locations available for this state' : 'Select a state first'}
                </option>
              ) : (
                dropdowns.branchLocations.map(loc => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))
              )}
            </select>
            {!formData.branch_state && (
              <div className="hint">Please select a branch state first</div>
            )}
          </div>
        </div>

        {/* Department & Designation */}
        <div className="row">
          <div className="form-group">
            <label>Department <span className="required">*</span></label>
            <select
              name="department"
              value={formData.department}
              onChange={(e) => handleDepartmentChange(e.target.value)}
              required
            >
              <option value="">Select Department</option>
              {dropdowns.departments.map(dep => (
                <option key={dep.id} value={dep.id}>
                  {dep.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Designation <span className="required">*</span></label>
            <select
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              disabled={!formData.department || dropdowns.designations.length === 0}
              required
            >
              <option value="">Select Designation</option>
              {dropdowns.designations.map(des => (
                <option key={des.id} value={des.id}>
                  {des.name}
                </option>
              ))}
            </select>
            {!formData.department && (
              <div className="hint">Please select a department first</div>
            )}
            {formData.department && dropdowns.designations.length === 0 && (
              <div className="hint">No designations available for this department</div>
            )}
          </div>
        </div>

        {/* Aadhaar & PAN */}
        <div className="row">
          <div className="form-group">
            <label>Aadhaar Number <span className="required">*</span></label>
            <input
              type="tel"
              name="aadhaar_number"
              maxLength={12}
              minLength={12}
              value={formData.aadhaar_number}
              onChange={handleChange}
              placeholder="814781478147"
              required
            />
          </div>
          <div className="form-group">
            <label>Pan Number <span className="required">*</span></label>
            <input
              type="text"
              name="pan_number"
              maxLength={10}
              value={formData.pan_number}
              onChange={handleChange}
              placeholder="ABCD1234A"
              style={{ textTransform: 'uppercase' }}
              onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
              required
            />
          </div>
        </div>

        {/* Account & Bank details */}
        <div className="row">
          <div className="form-group">
            <label>Account Number <span className="required">*</span></label>
            <input
              type="tel"
              name="account_number"
              maxLength={18}
              value={formData.account_number}
              onChange={handleChange}
              placeholder="658179918941"
              required
            />
          </div>
          <div className="form-group">
            <label>IFSC Code <span className="required">*</span></label>
            <input
              type="text"
              name="ifsc_code"
              style={{ textTransform: 'uppercase' }}
              onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
              maxLength={11}
              value={formData.ifsc_code}
              onChange={handleChange}
              placeholder="HDFC0001111"
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="form-group">
            <label>Bank Name <span className="required">*</span></label>
            <select
              name="bank_name"
              value={formData.bank_name}
              onChange={handleChange}
              required
            >
              <option value="">Select Bank</option>
              {dropdowns.banks.map(bank => (
                <option key={bank.id} value={bank.id}>
                  {bank.bank_name || bank.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Account Type <span className="required">*</span></label>
            <select
              name="account_type"
              value={formData.account_type}
              onChange={handleChange}
              required
            >
              <option value="">Select Account Type</option>
              {dropdowns.accountTypes.map(type => (
                <option key={type.id} value={type.id}>
                  {type.account_type || type.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* File Uploads */}
        <div className="row">
          <div className="form-group">
            <label>Pan Card Upload</label>
            <input
              type="file"
              name="pan_img"
              onChange={handleChange}
              accept=".jpg,.jpeg,.png,.pdf"
            />
          </div>
          <div className="form-group">
            <label>Aadhaar Card Upload</label>
            <input
              type="file"
              name="aadhaar_img"
              onChange={handleChange}
              accept=".jpg,.jpeg,.png,.pdf"
            />
          </div>
        </div>

        <div className="row">
          <div className="form-group">
            <label>Bank Proof Upload</label>
            <input
              type="file"
              name="bankproof_img"
              onChange={handleChange}
              accept=".jpg,.jpeg,.png,.pdf"
            />
          </div>
          <div className="form-group">
            <label>Employee Image</label>
            <input
              type="file"
              name="emp_image"
              onChange={handleChange}
              accept=".jpg,.jpeg,.png"
            />
          </div>
        </div>

        {/* Addresses */}
        <div className="row">
          <div className="form-group">
            <label>Present Address <span className="required">*</span></label>
            <textarea
              name="present_address"
              value={formData.present_address}
              onChange={handleChange}
              placeholder="Present Address"
              rows="3"
              required
            />
          </div>
          <div className="form-group">
            <label>Permanent Address <span className="required">*</span></label>
            <textarea
              name="permanent_address"
              value={formData.permanent_address}
              onChange={handleChange}
              placeholder="Permanent Address"
              rows="3"
              required
            />
          </div>
        </div>

        {/* Reporting & DOB */}
        <div className="row">
          <div className="form-group">
            <label>Reporting To <span className="required">*</span></label>
            <select
              name="reportingTo"
              value={formData.reportingTo}
              onChange={handleChange}
              required
            >
              <option value="">Select Reporting To</option>
              {dropdowns.users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.first_name} {user.last_name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Date of Birth <span className="required">*</span></label>
            <input
              type="date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
              required
              max={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={resetForm}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;