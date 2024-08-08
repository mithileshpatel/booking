import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BusView.css';

const BusView = () => {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/buses');
        setBuses(response.data);
      } catch (error) {
        console.error('Error fetching buses:', error);
      }
    };

    fetchBuses();
  }, []);

  return (
    <div className="bus-view">
      <h2>Bus List</h2>
      <table>
        <thead>
          <tr>
            <th>Bus Name</th>
            <th>Bus Number</th>
            <th>Bus Type</th>
            <th>Seating Capacity</th>
            <th>Route</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Bus Image</th>
          </tr>
        </thead>
        <tbody>
          {buses.map((bus) => (
            <tr key={bus.id}>
              <td>{bus.name}</td>
              <td>{bus.number}</td>
              <td>{bus.type}</td>
              <td>{bus.seating_capacity}</td>
              <td>{bus.route}</td>
              <td>{bus.departure_time}</td>
              <td>{bus.arrival_time}</td>
              <td>
                {bus.image && <img src={`http://localhost:5000/uploads/${bus.image}`} alt={bus.name} style={{ width: '100px', height: 'auto' }} />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BusView;
