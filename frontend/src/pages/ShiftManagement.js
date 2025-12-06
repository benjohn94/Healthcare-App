import React, { useState, useEffect } from 'react';
import { shiftAPI, staffAPI } from '../utils/api';
import '../styles/ShiftManagement.css';

const ShiftManagement = () => {
  const [shifts, setShifts] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedShift, setSelectedShift] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [filterRole, setFilterRole] = useState('');
  
  const [formData, setFormData] = useState({
    date: '',
    shiftType: 'Morning',
    capacity: 5,
  });

  useEffect(() => {
    fetchShifts();
    fetchStaff();
  }, []);

  const fetchShifts = async () => {
    try {
      setLoading(true);
      const data = await shiftAPI.getAll();
      setShifts(data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch shifts');
    } finally {
      setLoading(false);
    }
  };

  const fetchStaff = async () => {
    try {
      const data = await staffAPI.getAll();
      setStaff(data);
    } catch (err) {
      console.error('Failed to fetch staff:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await shiftAPI.create(formData);
      setShowForm(false);
      setFormData({
        date: '',
        shiftType: 'Morning',
        capacity: 5,
      });
      fetchShifts();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create shift');
    }
  };

  const handleAssignStaff = async (staffId) => {
    try {
      await shiftAPI.assignStaff(selectedShift._id, staffId);
      setShowAssignModal(false);
      setSelectedShift(null);
      fetchShifts();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to assign staff');
    }
  };

  const handleUnassignStaff = async (shiftId, staffId) => {
    try {
      await shiftAPI.unassignStaff(shiftId, staffId);
      fetchShifts();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to unassign staff');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this shift?')) {
      try {
        await shiftAPI.delete(id);
        fetchShifts();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete shift');
      }
    }
  };

  const getShiftColor = (shiftType) => {
    switch (shiftType) {
      case 'Morning':
        return '#FFE5B4';
      case 'Afternoon':
        return '#B4D7FF';
      case 'Night':
        return '#E5B4FF';
      default:
        return '#FFFFFF';
    }
  };

  const getShiftStatus = (shift) => {
    const assigned = shift.assignedStaff.length;
    const capacity = shift.capacity;
    
    if (assigned === 0) return { text: 'Unassigned', color: '#FF6B6B' };
    if (assigned < capacity) return { text: 'Understaffed', color: '#FFA500' };
    if (assigned === capacity) return { text: 'Full', color: '#4CAF50' };
    return { text: 'Overstaffed', color: '#FF0000' };
  };

  const availableStaff = staff.filter((s) => {
    if (!selectedShift) return false;
    const isAlreadyAssigned = selectedShift.assignedStaff.some(
      (assigned) => assigned._id === s._id
    );
    const matchesRole = !filterRole || s.role === filterRole;
    return !isAlreadyAssigned && matchesRole;
  });

  return (
    <div className="shift-management">
      <div className="page-header">
        <h1>Shift Management</h1>
        <button onClick={() => setShowForm(!showForm)} className="add-button">
          {showForm ? 'Cancel' : '+ Create New Shift'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <div className="shift-form-container">
          <h2>Create New Shift</h2>
          <form onSubmit={handleSubmit} className="shift-form">
            <div className="form-row">
              <div className="form-group">
                <label>Date *</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Shift Type *</label>
                <select
                  value={formData.shiftType}
                  onChange={(e) => setFormData({ ...formData, shiftType: e.target.value })}
                  required
                >
                  <option value="Morning">Morning (6 AM - 2 PM)</option>
                  <option value="Afternoon">Afternoon (2 PM - 10 PM)</option>
                  <option value="Night">Night (10 PM - 6 AM)</option>
                </select>
              </div>
              <div className="form-group">
                <label>Capacity *</label>
                <input
                  type="number"
                  min="1"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                  required
                />
              </div>
            </div>
            <button type="submit" className="submit-button">Create Shift</button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="loading">Loading shifts...</div>
      ) : (
        <div className="shifts-grid">
          {shifts.map((shift) => {
            const status = getShiftStatus(shift);
            return (
              <div
                key={shift._id}
                className="shift-card"
                style={{ backgroundColor: getShiftColor(shift.shiftType) }}
              >
                <div className="shift-header">
                  <h3>{shift.shiftType}</h3>
                  <span className="shift-status" style={{ backgroundColor: status.color }}>
                    {status.text}
                  </span>
                </div>
                <div className="shift-details">
                  <p><strong>Date:</strong> {new Date(shift.date).toLocaleDateString()}</p>
                  <p>
                    <strong>Capacity:</strong> {shift.assignedStaff.length} / {shift.capacity}
                  </p>
                </div>

                <div className="assigned-staff">
                  <h4>Assigned Staff:</h4>
                  {shift.assignedStaff.length === 0 ? (
                    <p className="no-staff">No staff assigned</p>
                  ) : (
                    <ul>
                      {shift.assignedStaff.map((s) => (
                        <li key={s._id}>
                          {s.name} ({s.role})
                          <button
                            onClick={() => handleUnassignStaff(shift._id, s._id)}
                            className="unassign-button"
                          >
                            ×
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="shift-actions">
                  <button
                    onClick={() => {
                      setSelectedShift(shift);
                      setShowAssignModal(true);
                    }}
                    className="assign-button"
                  >
                    Assign Staff
                  </button>
                  <button onClick={() => handleDelete(shift._id)} className="delete-button">
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {shifts.length === 0 && !loading && (
        <div className="no-data">No shifts created yet</div>
      )}

      {showAssignModal && selectedShift && (
        <div className="modal-overlay" onClick={() => setShowAssignModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Assign Staff to {selectedShift.shiftType} Shift</h2>
            <p>Date: {new Date(selectedShift.date).toLocaleDateString()}</p>
            
            <div className="filter-group">
              <label>Filter by Role:</label>
              <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
                <option value="">All Roles</option>
                <option value="Doctor">Doctor</option>
                <option value="Nurse">Nurse</option>
                <option value="Technician">Technician</option>
              </select>
            </div>

            <div className="staff-list">
              {availableStaff.map((s) => (
                <div key={s._id} className="staff-item">
                  <div className="staff-info">
                    <strong>{s.name}</strong>
                    <span>
                      {s.role} - Prefers {s.shiftPreference}
                    </span>
                  </div>
                  <button onClick={() => handleAssignStaff(s._id)} className="assign-staff-button">
                    Assign
                  </button>
                </div>
              ))}
            </div>

            {availableStaff.length === 0 && (
              <p className="no-staff">No available staff to assign</p>
            )}

            <button onClick={() => setShowAssignModal(false)} className="close-modal-button">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShiftManagement;
