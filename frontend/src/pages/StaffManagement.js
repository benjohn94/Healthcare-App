import React, { useState, useEffect } from 'react';
import { staffAPI } from '../utils/api';
import '../styles/StaffManagement.css';

const StaffManagement = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterShift, setFilterShift] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    staffId: '',
    role: 'Doctor',
    shiftPreference: 'Morning',
    contactNumber: '',
    department: 'General',
  });

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const data = await staffAPI.getAll();
      setStaff(data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch staff');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await staffAPI.create(formData);
      setShowForm(false);
      setFormData({
        name: '',
        staffId: '',
        role: 'Doctor',
        shiftPreference: 'Morning',
        contactNumber: '',
        department: 'General',
      });
      fetchStaff();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create staff');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      try {
        await staffAPI.delete(id);
        fetchStaff();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete staff');
      }
    }
  };

  const filteredStaff = staff.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         s.staffId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !filterRole || s.role === filterRole;
    const matchesShift = !filterShift || s.shiftPreference === filterShift;
    return matchesSearch && matchesRole && matchesShift;
  });

  return (
    <div className="staff-management">
      <div className="page-header">
        <h1>Staff Management</h1>
        <button onClick={() => setShowForm(!showForm)} className="add-button">
          {showForm ? 'Cancel' : '+ Add New Staff'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <div className="staff-form-container">
          <h2>Add New Staff</h2>
          <form onSubmit={handleSubmit} className="staff-form">
            <div className="form-row">
              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Staff ID *</label>
                <input
                  type="text"
                  value={formData.staffId}
                  onChange={(e) => setFormData({ ...formData, staffId: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Role *</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                >
                  <option value="Doctor">Doctor</option>
                  <option value="Nurse">Nurse</option>
                  <option value="Technician">Technician</option>
                </select>
              </div>
              <div className="form-group">
                <label>Shift Preference *</label>
                <select
                  value={formData.shiftPreference}
                  onChange={(e) => setFormData({ ...formData, shiftPreference: e.target.value })}
                  required
                >
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Night">Night</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Contact Number *</label>
                <input
                  type="text"
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Department</label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                />
              </div>
            </div>

            <button type="submit" className="submit-button">Add Staff</button>
          </form>
        </div>
      )}

      <div className="filters-section">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Search by name or staff ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-group">
          <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
            <option value="">All Roles</option>
            <option value="Doctor">Doctor</option>
            <option value="Nurse">Nurse</option>
            <option value="Technician">Technician</option>
          </select>
        </div>
        <div className="filter-group">
          <select value={filterShift} onChange={(e) => setFilterShift(e.target.value)}>
            <option value="">All Shifts</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Night">Night</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading staff...</div>
      ) : (
        <div className="staff-table-container">
          <table className="staff-table">
            <thead>
              <tr>
                <th>Staff ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Shift Preference</th>
                <th>Department</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.map((s) => (
                <tr key={s._id}>
                  <td>{s.staffId}</td>
                  <td>{s.name}</td>
                  <td>{s.role}</td>
                  <td>{s.shiftPreference}</td>
                  <td>{s.department}</td>
                  <td>{s.contactNumber}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(s._id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredStaff.length === 0 && (
            <div className="no-data">No staff members found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default StaffManagement;
