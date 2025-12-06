import React, { useState, useEffect } from 'react';
import { attendanceAPI, shiftAPI } from '../utils/api';
import '../styles/Attendance.css';

const Attendance = () => {
  const [shifts, setShifts] = useState([]);
  const [selectedShift, setSelectedShift] = useState(null);
  const [attendanceRecords, setAttendanceRecords] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const fetchShifts = async () => {
    try {
      setLoading(true);
      const data = await shiftAPI.getAll({ date: selectedDate });
      setShifts(data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch shifts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShifts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  const handleShiftSelect = async (shift) => {
    setSelectedShift(shift);
    setSuccess('');
    setError('');
    
    // Initialize attendance records for all assigned staff
    const records = {};
    shift.assignedStaff.forEach((staff) => {
      records[staff._id] = {
        staffId: staff._id,
        status: 'Present',
        remarks: '',
      };
    });
    setAttendanceRecords(records);

    // Fetch existing attendance records
    try {
      const existingAttendance = await attendanceAPI.getAll({
        shiftId: shift._id,
        date: selectedDate,
      });

      existingAttendance.forEach((record) => {
        if (records[record.staff._id]) {
          records[record.staff._id] = {
            staffId: record.staff._id,
            status: record.status,
            remarks: record.remarks || '',
            id: record._id,
          };
        }
      });

      setAttendanceRecords({ ...records });
    } catch (err) {
      console.error('Failed to fetch existing attendance:', err);
    }
  };

  const updateAttendance = (staffId, field, value) => {
    setAttendanceRecords({
      ...attendanceRecords,
      [staffId]: {
        ...attendanceRecords[staffId],
        [field]: value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const records = Object.values(attendanceRecords);
      await attendanceAPI.bulkCreate(selectedShift._id, records);
      setSuccess('Attendance marked successfully!');
      setSelectedShift(null);
      setAttendanceRecords({});
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to mark attendance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="attendance">
      <div className="page-header">
        <h1>Attendance Tracking</h1>
        <div className="date-selector">
          <label>Select Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {!selectedShift ? (
        <div className="shift-selection">
          <h2>Select a Shift to Mark Attendance</h2>
          {loading ? (
            <div className="loading">Loading shifts...</div>
          ) : shifts.length === 0 ? (
            <div className="no-data">No shifts found for this date</div>
          ) : (
            <div className="shifts-grid">
              {shifts.map((shift) => (
                <div
                  key={shift._id}
                  className="shift-card"
                  onClick={() => handleShiftSelect(shift)}
                >
                  <h3>{shift.shiftType}</h3>
                  <p>Date: {new Date(shift.date).toLocaleDateString()}</p>
                  <p>Assigned Staff: {shift.assignedStaff.length}</p>
                  <button className="select-button">Mark Attendance</button>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="attendance-form-container">
          <div className="form-header">
            <h2>Mark Attendance - {selectedShift.shiftType} Shift</h2>
            <p>Date: {new Date(selectedShift.date).toLocaleDateString()}</p>
            <button onClick={() => setSelectedShift(null)} className="back-button">
              ← Back to Shifts
            </button>
          </div>

          {selectedShift.assignedStaff.length === 0 ? (
            <div className="no-data">No staff assigned to this shift</div>
          ) : (
            <form onSubmit={handleSubmit}>
              <table className="attendance-table">
                <thead>
                  <tr>
                    <th>Staff ID</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedShift.assignedStaff.map((staff) => (
                    <tr key={staff._id}>
                      <td>{staff.staffId}</td>
                      <td>{staff.name}</td>
                      <td>{staff.role}</td>
                      <td>
                        <select
                          value={attendanceRecords[staff._id]?.status || 'Present'}
                          onChange={(e) => updateAttendance(staff._id, 'status', e.target.value)}
                          className="status-select"
                        >
                          <option value="Present">Present</option>
                          <option value="Absent">Absent</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          value={attendanceRecords[staff._id]?.remarks || ''}
                          onChange={(e) => updateAttendance(staff._id, 'remarks', e.target.value)}
                          placeholder="e.g., Sick Leave, Late"
                          className="remarks-input"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="form-actions">
                <button type="submit" className="submit-button" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Attendance'}
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default Attendance;
