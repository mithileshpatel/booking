import React, { useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import AdminFooter from './AdminFooter';
import AddBus from './AddBus';
import AddAmenity from './AddAmenity';
import AddSeat from './AddSeat';
import AddBoardingDroppingPoint from './AddBoardingDroppingPoint';
import AddReview from './AddReview';
import AddPolicy from './AddPolicy';
import BusView from './BusView';
import ViewCustomer from './ViewCustomer';
import ViewHotels from './ViewHotels';
import AddHotel from './AddHotel';
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
            <Route path="addAmenity" element={<AddAmenity />} />
            <Route path="addSeat" element={<AddSeat />} />
            <Route path="addBoardingDroppingPoint" element={<AddBoardingDroppingPoint />} />
            <Route path="addReview" element={<AddReview />} />
            <Route path="addPolicy" element={<AddPolicy />} />
            <Route path="viewBus" element={<BusView />} />
            <Route path="viewCustomer" element={<ViewCustomer />} />
            <Route path="viewHotels" element={<ViewHotels />} />
            <Route path="addHotel" element={<AddHotel />} />
            <Route path="/" element={<Outlet />} />
          </Routes>
        </div>
      </div>
      <AdminFooter />
    </div>
  );
};

export default AdminLayout;
