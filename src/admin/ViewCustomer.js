// src/admin/ViewCustomer.js
import React, { useEffect, useState } from 'react';
import './ViewCustomer.css';

const ViewCustomer = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Fetch customer data from your backend
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/customers');
        if (response.ok) {
          const data = await response.json();
          setCustomers(data);
        } else {
          console.error('Failed to fetch customer data');
        }
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className="view-customer">
      <h2>View Customers</h2>
      <table className="customer-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.username}</td>
              <td>{customer.mobile}</td>
              <td>{customer.email}</td>
              <td>
                <button onClick={() => alert(`Viewing details for ${customer.username}`)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewCustomer;
