// src/admin/AdminSidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './AdminSidebar.css';

const AdminSidebar = ({ isSidebarOpen }) => {
  return (
    <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink to="/admin/dashboard" activeClassName="active">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/addBus" activeClassName="active">
              Add Bus
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/addHotel" activeClassName="active">
              Add Hotel
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/viewCustomer" activeClassName="active">
              Customers
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/logout" activeClassName="active">
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
