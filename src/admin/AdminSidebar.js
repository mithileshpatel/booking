import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './AdminSidebar.css';

const AdminSidebar = ({ isSidebarOpen }) => {
  const [showHotelsMenu, setShowHotelsMenu] = useState(false);
  const [showBusesMenu, setShowBusesMenu] = useState(false);
  const [showAmenitiesMenu, setShowAmenitiesMenu] = useState(false);
  const [showPoliciesMenu, setShowPoliciesMenu] = useState(false);

  const toggleHotelsMenu = () => {
    setShowHotelsMenu(!showHotelsMenu);
  };

  const toggleBusesMenu = () => {
    setShowBusesMenu(!showBusesMenu);
  };

  const toggleAmenitiesMenu = () => {
    setShowAmenitiesMenu(!showAmenitiesMenu);
  };

  const togglePoliciesMenu = () => {
    setShowPoliciesMenu(!showPoliciesMenu);
  };

  return (
    <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <div
              className="menu-item"
              onClick={toggleBusesMenu}
            >
              <span>Manage Buses</span>
              <span className={`submenu-toggle ${showBusesMenu ? 'open' : ''}`}>▼</span>
            </div>
            {showBusesMenu && (
              <ul className="submenu">
                <li>
                  <NavLink
                    to="/admin/addBus"
                    className={({ isActive }) => isActive ? 'active' : ''}
                  >
                    Add Bus
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/viewBus"
                    className={({ isActive }) => isActive ? 'active' : ''}
                  >
                    View Buses
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/addSeat"
                    className={({ isActive }) => isActive ? 'active' : ''}
                  >
                    Add Seat
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/addAmenity"
                    className={({ isActive }) => isActive ? 'active' : ''}
                  >
                    Add Amenity
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/addBoardingDroppingPoint"
                    className={({ isActive }) => isActive ? 'active' : ''}
                  >
                    Add Boarding/Dropping Point
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/addReview"
                    className={({ isActive }) => isActive ? 'active' : ''}
                  >
                    Add Review
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/addPolicy"
                    className={({ isActive }) => isActive ? 'active' : ''}
                  >
                    Add Policy
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          <li>
            <div
              className="menu-item"
              onClick={toggleHotelsMenu}
            >
              <span>Manage Hotels</span>
              <span className={`submenu-toggle ${showHotelsMenu ? 'open' : ''}`}>▼</span>
            </div>
            {showHotelsMenu && (
              <ul className="submenu">
                <li>
                  <NavLink
                    to="/admin/addHotel"
                    className={({ isActive }) => isActive ? 'active' : ''}
                  >
                    Add Hotel
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/viewHotels"
                    className={({ isActive }) => isActive ? 'active' : ''}
                  >
                    View Hotels
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          <li>
            <NavLink
              to="/admin/viewCustomer"
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Customers
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/logout"
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
