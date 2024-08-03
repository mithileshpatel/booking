// src/admin/AdminRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';
import AdminSidebar from './AdminSidebar';
import './AdminApp.css';

function AdminRoutes() {
  return (
    <div className="admin-app">
      <AdminHeader />
      <div className="admin-content">
        <AdminSidebar />
        <div className="admin-main">
          <Routes>
            <Route path="login" element={<AdminLogin />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            {/* Add more admin routes if needed */}
          </Routes>
        </div>
      </div>
      <AdminFooter />
    </div>
  );
}

export default AdminRoutes;
