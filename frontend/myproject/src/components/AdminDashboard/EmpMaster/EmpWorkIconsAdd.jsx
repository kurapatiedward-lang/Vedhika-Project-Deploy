import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api';
import './styles/EmpWorkIcons.css';

const EmpWorkIconsAdd = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        icon_name: '',
        url_name: '',
        description: '',
        username: '',
        password: ''
    });
    const [file, setFile] = useState(null);
    const [workIcons, setWorkIcons] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Fetch work icons on component mount
    useEffect(() => {
        fetchWorkIcons();
    }, []);

    const fetchWorkIcons = async () => {
        try {
            setLoading(true);
            const response = await api.get('/api/work-icons/');
            setWorkIcons(response.data);
        } catch (error) {
            console.error('Error fetching work icons:', error);
            showToast('error', 'Error', 'Failed to fetch work icons');
        } finally {
            setLoading(false);
        }
    };

    const showToast = (type, title, message) => {
        // Using browser's built-in notification or custom toast
        // If you have iziToast installed, replace with:
        // window.iziToast[type]({ title, message, position: 'topRight' });

        // Fallback alert
        alert(`${title}: ${message}`);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate required fields
        if (!formData.icon_name || !formData.url_name) {
            showToast('warning', 'Error', 'Icon Name and URL Name are required');
            return;
        }

        try {
            setLoading(true);

            // Create FormData for file upload
            const submitData = new FormData();
            submitData.append('icon_name', formData.icon_name);
            submitData.append('icon_url', formData.url_name);
            submitData.append('icon_description', formData.description);
            submitData.append('username', formData.username);
            submitData.append('password', formData.password);

            if (file) {
                // Validate file extension
                const validExtensions = ['jpeg', 'jpg', 'png'];
                const fileExtension = file.name.split('.').pop().toLowerCase();

                if (!validExtensions.includes(fileExtension)) {
                    showToast('warning', 'Error', 'Invalid file format. Only JPEG, JPG, and PNG allowed.');
                    setLoading(false);
                    return;
                }

                submitData.append('icon_image', file);
            }

            // API call to create work icon
            const response = await api.post('/api/work-icons/create/', submitData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            showToast('success', 'Success', 'Work Icons Added Successfully');

            // Reset form
            setFormData({
                icon_name: '',
                url_name: '',
                description: '',
                username: '',
                password: ''
            });
            setFile(null);

            // Refresh list
            fetchWorkIcons();

            // Optional: redirect after 1 second
            setTimeout(() => {
                navigate('/admin/emp-work-icons');
            }, 1000);

        } catch (error) {
            console.error('Error submitting form:', error);
            showToast('warning', 'Error', 'Something Went Wrong, Please Try Again');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (id) => {
        navigate(`/admin/emp-work-icons/edit/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                setLoading(true);
                await api.delete(`/api/work-icons/${id}/delete/`);
                showToast('success', 'Success', 'Work Icon Deleted Successfully');
                fetchWorkIcons();
            } catch (error) {
                console.error('Error deleting work icon:', error);
                showToast('warning', 'Error', 'Failed to delete work icon');
            } finally {
                setLoading(false);
            }
        }
    };

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
                {/* Add Work Icons Form */}
                <div className="row">
                    <div className="col-xl">
                        <div className="card mb-6">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">Add Work Icons</h5>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit} encType="multipart/form-data" className="form-container">
                                    {/* Row 1: Icon Name and File Upload */}
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label className="form-label">
                                                <i className="bi bi-gear"></i> Icon Name
                                                <span className="required">*</span>
                                            </label>
                                            <div className="input-group input-group-merge">
                                                <span className="input-group-text">
                                                    <i className="bi bi-palette"></i>
                                                </span>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="icon_name"
                                                    value={formData.icon_name}
                                                    onChange={handleInputChange}
                                                    placeholder="e.g., Dashboard, Settings"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">
                                                <i className="bi bi-image"></i> Upload Image
                                            </label>
                                            <div className="input-group input-group-merge">
                                                <span className="input-group-text">
                                                    <i className="bi bi-file-earmark-image"></i>
                                                </span>
                                                <input
                                                    className="form-control"
                                                    type="file"
                                                    onChange={handleFileChange}
                                                    accept=".jpeg,.jpg,.png"
                                                />
                                            </div>
                                            <small className="form-text">Supported: JPEG, JPG, PNG (Max 5MB)</small>
                                        </div>
                                    </div>

                                    {/* Row 2: URL Name */}
                                    <div className="form-row">
                                        <div className="form-group full-width">
                                            <label className="form-label">
                                                <i className="bi bi-link-45deg"></i> URL Name
                                                <span className="required">*</span>
                                            </label>
                                            <div className="input-group input-group-merge">
                                                <span className="input-group-text">
                                                    <i className="bi bi-globe"></i>
                                                </span>
                                                <input
                                                    type="url"
                                                    className="form-control"
                                                    name="url_name"
                                                    value={formData.url_name}
                                                    onChange={handleInputChange}
                                                    placeholder="e.g., https://example.com"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Row 3: Description */}
                                    <div className="form-row">
                                        <div className="form-group full-width">
                                            <label className="form-label">
                                                <i className="bi bi-chat-left-text"></i> Description
                                            </label>
                                            <div className="input-group input-group-merge">
                                                <span className="input-group-text">
                                                    <i className="bi bi-pencil-square"></i>
                                                </span>
                                                <textarea
                                                    name="description"
                                                    className="form-control textarea-control"
                                                    value={formData.description}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter a detailed description..."
                                                    rows="3"
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Row 4: Username and Password */}
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label className="form-label"><i class="bi bi-person-circle"></i>Username</label>
                                            <div className="input-group input-group-merge">
                                                <span className="input-group-text">
                                                    <i class="bi bi-person-circle"></i>
                                                </span>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="username"
                                                    value={formData.username}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter username"
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">
                                                <i className="bi bi-key"></i> Password
                                            </label>
                                            <div className="input-group input-group-merge password-group">
                                                <span className="input-group-text">
                                                    <i className="bi bi-lock"></i>
                                                </span>
                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    className="form-control"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter password"
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-toggle-password"
                                                    onClick={togglePassword}
                                                    tabIndex="-1"
                                                    title={showPassword ? 'Hide password' : 'Show password'}
                                                >
                                                    <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="form-actions">
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-submit"
                                            disabled={loading}
                                        >
                                            <i className="bi bi-check-circle"></i>
                                            {loading ? 'Submitting...' : 'Submit'}
                                        </button>
                                        <button
                                            type="reset"
                                            className="btn btn-secondary btn-reset"
                                            onClick={() => {
                                                setFormData({
                                                    icon_name: '',
                                                    url_name: '',
                                                    description: '',
                                                    username: '',
                                                    password: ''
                                                });
                                                setFile(null);
                                            }}
                                        >
                                            <i className="bi bi-arrow-clockwise"></i>
                                            Reset
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Work Icons List Table */}
                <div className="row">
                    <div className="col-xl">
                        <div className="card">
                            <h5 className="card-header">Work Icon List</h5>
                            <div className="table-responsive text-nowrap">
                                <table className="table">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>Name</th>
                                            <th>UserName</th>
                                            <th>Password</th>
                                            <th>Description</th>
                                            <th>Image</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <tr>
                                                <td colSpan="6" className="text-center py-4">
                                                    <span>Loading...</span>
                                                </td>
                                            </tr>
                                        ) : workIcons.length > 0 ? (
                                            workIcons.map((icon) => (
                                                <tr key={icon.id}>
                                                    <td>{icon.icon_name}</td>
                                                    <td>{icon.username}</td>
                                                    <td>
                                                        <span className="password-mask">
                                                            {icon.password ? '•'.repeat(icon.password.length) : '-'}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span title={icon.icon_description}>
                                                            {icon.icon_description && icon.icon_description.length > 50
                                                                ? icon.icon_description.substring(0, 50) + '...'
                                                                : icon.icon_description}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        {icon.icon_image ? (
                                                            <img
                                                                src={`/api/media/${icon.icon_image}`}
                                                                alt={icon.icon_name}
                                                                style={{ height: '50px', maxWidth: '100%' }}
                                                            />
                                                        ) : (
                                                            <span>-</span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <div className="dropdown">
                                                            <button
                                                                className="btn btn-sm btn-secondary dropdown-toggle"
                                                                type="button"
                                                                data-bs-toggle="dropdown"
                                                            >
                                                                <i className="bx bx-dots-vertical-rounded"></i>
                                                            </button>
                                                            <ul className="dropdown-menu">
                                                                <li>
                                                                    <button
                                                                        className="dropdown-item"
                                                                        onClick={() => handleEdit(icon.id)}
                                                                    >
                                                                        <i className="bx bx-edit"></i> Edit
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button
                                                                        className="dropdown-item text-danger"
                                                                        onClick={() => handleDelete(icon.id)}
                                                                    >
                                                                        <i className="bx bx-trash"></i> Delete
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="text-center py-4">
                                                    No work icons found
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
        </div>
    );
};

export default EmpWorkIconsAdd;
