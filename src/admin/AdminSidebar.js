import React from 'react';
import { Link } from 'react-router-dom';

function AdminSidebar() {
  return (
    <aside>
      <nav>
        <ul>
          <li><Link to="/admin/dashboard">Dashboard</Link></li>
          <li><Link to="/admin/users">User Management</Link></li>
          {/* Add more admin links here */}
        </ul>
      </nav>
    </aside>
  );
}

export default AdminSidebar;
