// src/admin/AdminHeader.js
import React from 'react';
import './AdminHeader.css';

const AdminHeader = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <header className="admin-header">
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isSidebarOpen ? '✖' : '☰'}
      </button>
      <h1>Admin Panel</h1>
    </header>
  );
};

export default AdminHeader;
