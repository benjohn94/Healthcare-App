import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { admin } = useAuth();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {admin?.name}!</h1>
        <p>Healthcare Staff Shift Scheduler & Attendance Tracker</p>
      </div>

      <div className="dashboard-grid">
        <Link to="/staff" className="dashboard-card">
          <div className="card-icon">👥</div>
          <h3>Staff Management</h3>
          <p>Add, view, and manage healthcare staff</p>
        </Link>

        <Link to="/shifts" className="dashboard-card">
          <div className="card-icon">📅</div>
          <h3>Shift Scheduler</h3>
          <p>Create and manage staff shifts</p>
        </Link>

        <Link to="/schedule" className="dashboard-card">
          <div className="card-icon">🗓️</div>
          <h3>Daily Schedule</h3>
          <p>View daily shift assignments</p>
        </Link>

        <Link to="/attendance" className="dashboard-card">
          <div className="card-icon">✓</div>
          <h3>Attendance Tracking</h3>
          <p>Mark and track staff attendance</p>
        </Link>
      </div>

      <div className="quick-stats">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <Link to="/staff/new" className="action-button">
            Add New Staff
          </Link>
          <Link to="/shifts/new" className="action-button">
            Create New Shift
          </Link>
          <Link to="/attendance/mark" className="action-button">
            Mark Attendance
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
