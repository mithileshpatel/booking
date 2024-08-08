import React, { useEffect, useState } from 'react';
import './ViewCustomer.css';

const ViewCustomer = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10); // Number of users per page

  useEffect(() => {
    // Fetch user data from your backend
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/signup'); // Corrected endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Error fetching user data');
      }
    };

    fetchUsers();
  }, []);

  // Handle select all checkbox
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(users.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  // Handle individual checkbox selection
  const handleSelectUser = (userId) => {
    setSelectedUsers(prevSelected => 
      prevSelected.includes(userId) 
        ? prevSelected.filter(id => id !== userId) 
        : [...prevSelected, userId]
    );
  };

  // Handle delete action
  const handleDeleteSelected = async () => {
    try {
      await Promise.all(selectedUsers.map(userId =>
        fetch(`http://localhost:5000/api/users/${userId}`, {
          method: 'DELETE'
        })
      ));
      setUsers(users.filter(user => !selectedUsers.includes(user.id)));
      setSelectedUsers([]);
    } catch (error) {
      console.error('Error deleting users:', error);
      setError('Error deleting users');
    }
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="view-customer">
      <h2>View Users</h2>
      {error && <p className="error">{error}</p>}
      <div className="actions">
        <button onClick={handleDeleteSelected} disabled={selectedUsers.length === 0}>Delete Selected</button>
      </div>
      <table className="customer-table">
        <thead>
          <tr>
            <th>
              <input 
                type="checkbox" 
                onChange={handleSelectAll} 
                checked={selectedUsers.length === users.length}
              />
            </th>
            <th>Username</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.length > 0 ? (
            currentUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <input 
                    type="checkbox" 
                    checked={selectedUsers.includes(user.id)} 
                    onChange={() => handleSelectUser(user.id)}
                  />
                </td>
                <td>{user.username}</td>
                <td>{user.mobile}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => alert(`Editing details for ${user.username}`)}>Edit</button>
                  <button  className="dbtn" onClick={async () => {
                    try {
                      await fetch(`http://localhost:5000/api/users/${user.id}`, {
                        method: 'DELETE'
                      });
                      setUsers(users.filter(u => u.id !== user.id));
                    } catch (error) {
                      console.error('Error deleting user:', error);
                      setError('Error deleting user');
                    }
                  }}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination">
        {[...Array(Math.ceil(users.length / usersPerPage)).keys()].map(number => (
          <button 
            key={number + 1} 
            onClick={() => paginate(number + 1)} 
            className={currentPage === number + 1 ? 'active' : ''}
          >
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ViewCustomer;
