// src/admin/AdminLayout.js
import React, { useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import AdminFooter from './AdminFooter';
import AddBus from './AddBus';
import AddHotel from './AddHotel';
import ViewCustomer from './ViewCustomer';
import './AdminLayout.css';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="admin-layout">
      <AdminHeader toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className="admin-content">
        <AdminSidebar isSidebarOpen={isSidebarOpen} />
        <div className="admin-main">
          <Routes>
            <Route path="dashboard" element={<div>Dashboard</div>} />
            <Route path="addBus" element={<AddBus />} />
            <Route path="addHotel" element={<AddHotel />} />
            <Route path="viewCustomer" element={<ViewCustomer />} />
            <Route path="/" element={<Outlet />} />
          </Routes>
        </div>
      </div>
      <AdminFooter />
    </div>
  );
};

export default AdminLayout;