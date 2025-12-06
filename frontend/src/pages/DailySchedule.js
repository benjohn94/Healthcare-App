import React, { useState, useEffect } from 'react';
import { shiftAPI } from '../utils/api';
import '../styles/DailySchedule.css';

const DailySchedule = () => {
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedWeek, setSelectedWeek] = useState(new Date());

  useEffect(() => {
    fetchWeeklyShifts();
  }, [selectedWeek]);

  const fetchWeeklyShifts = async () => {
    try {
      setLoading(true);
      const startDate = getWeekStart(selectedWeek);
      const endDate = getWeekEnd(selectedWeek);
      
      const data = await shiftAPI.getAll({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      });
      
      setShifts(data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch shifts');
    } finally {
      setLoading(false);
    }
  };

  const getWeekStart = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day;
    return new Date(d.setDate(diff));
  };

  const getWeekEnd = (date) => {
    const start = getWeekStart(date);
    return new Date(start.getTime() + 6 * 24 * 60 * 60 * 1000);
  };

  const getWeekDays = () => {
    const days = [];
    const start = getWeekStart(selectedWeek);
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      days.push(day);
    }
    
    return days;
  };

  const getShiftForDay = (date, shiftType) => {
    return shifts.find((shift) => {
      const shiftDate = new Date(shift.date);
      return (
        shiftDate.toDateString() === date.toDateString() &&
        shift.shiftType === shiftType
      );
    });
  };

  const previousWeek = () => {
    const newDate = new Date(selectedWeek);
    newDate.setDate(newDate.getDate() - 7);
    setSelectedWeek(newDate);
  };

  const nextWeek = () => {
    const newDate = new Date(selectedWeek);
    newDate.setDate(newDate.getDate() + 7);
    setSelectedWeek(newDate);
  };

  const goToToday = () => {
    setSelectedWeek(new Date());
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
    if (!shift) return null;
    const assigned = shift.assignedStaff.length;
    const capacity = shift.capacity;
    
    if (assigned === 0) return { text: 'Unassigned', color: '#FF6B6B' };
    if (assigned < capacity) return { text: 'Understaffed', color: '#FFA500' };
    if (assigned === capacity) return { text: 'Full', color: '#4CAF50' };
    return { text: 'Overstaffed', color: '#FF0000' };
  };

  const weekDays = getWeekDays();
  const shiftTypes = ['Morning', 'Afternoon', 'Night'];

  return (
    <div className="daily-schedule">
      <div className="page-header">
        <h1>Weekly Schedule</h1>
        <div className="week-navigation">
          <button onClick={previousWeek} className="nav-button">← Previous</button>
          <button onClick={goToToday} className="today-button">Today</button>
          <button onClick={nextWeek} className="nav-button">Next →</button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading schedule...</div>
      ) : (
        <div className="schedule-container">
          <div className="schedule-legend">
            <h3>Legend:</h3>
            <div className="legend-items">
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#FFE5B4' }}></span>
                Morning (6 AM - 2 PM)
              </div>
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#B4D7FF' }}></span>
                Afternoon (2 PM - 10 PM)
              </div>
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#E5B4FF' }}></span>
                Night (10 PM - 6 AM)
              </div>
            </div>
          </div>

          <div className="schedule-table-container">
            <table className="schedule-table">
              <thead>
                <tr>
                  <th>Time</th>
                  {weekDays.map((day) => (
                    <th key={day.toISOString()}>
                      <div className="day-header">
                        <div className="day-name">
                          {day.toLocaleDateString('en-US', { weekday: 'short' })}
                        </div>
                        <div className="day-date">
                          {day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {shiftTypes.map((shiftType) => (
                  <tr key={shiftType}>
                    <td className="shift-time-label">
                      <strong>{shiftType}</strong>
                      <br />
                      <small>
                        {shiftType === 'Morning' && '6 AM - 2 PM'}
                        {shiftType === 'Afternoon' && '2 PM - 10 PM'}
                        {shiftType === 'Night' && '10 PM - 6 AM'}
                      </small>
                    </td>
                    {weekDays.map((day) => {
                      const shift = getShiftForDay(day, shiftType);
                      const status = getShiftStatus(shift);
                      
                      return (
                        <td
                          key={`${day.toISOString()}-${shiftType}`}
                          className="shift-cell"
                          style={{ backgroundColor: shift ? getShiftColor(shiftType) : '#f5f5f5' }}
                        >
                          {shift ? (
                            <div className="shift-content">
                              {status && (
                                <div className="shift-status-badge" style={{ backgroundColor: status.color }}>
                                  {status.text}
                                </div>
                              )}
                              <div className="shift-capacity">
                                {shift.assignedStaff.length} / {shift.capacity}
                              </div>
                              <div className="staff-names">
                                {shift.assignedStaff.map((staff, idx) => (
                                  <div key={staff._id} className="staff-name">
                                    {staff.name}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="no-shift">-</div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailySchedule;
