import React from 'react';
import { useAuth } from '../context/AuthContext';
import './AdminDashboard.css';

function AdminDashboard() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/admin'; // Redirect to login page
  };

  return (
    <div className="admin-dashboard">
      <h2>Welcome to the Admin Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
      {/* Add dashboard content here */}
    </div>
  );
}

export default AdminDashboard;
