import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!admin) return null;

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-logo">
          🏥 Healthcare Scheduler
        </Link>
        
        <div className="navbar-menu">
          <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>
            Dashboard
          </Link>
          <Link to="/staff" className={`nav-link ${isActive('/staff')}`}>
            Staff
          </Link>
          <Link to="/shifts" className={`nav-link ${isActive('/shifts')}`}>
            Shifts
          </Link>
          <Link to="/schedule" className={`nav-link ${isActive('/schedule')}`}>
            Schedule
          </Link>
          <Link to="/attendance" className={`nav-link ${isActive('/attendance')}`}>
            Attendance
          </Link>
        </div>

        <div className="navbar-user">
          <span className="user-name">{admin.name}</span>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
