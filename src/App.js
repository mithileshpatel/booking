
// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';
import AdminLayout from './admin/AdminLayout';
import axios from 'axios';

function App() {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [busData, setBusData] = useState([]); // State to store search results

  const exchangeLocations = () => {
    const temp = startLocation;
    setStartLocation(endLocation);
    setEndLocation(temp);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('http://localhost:5000/api/buses/search', {
        params: {
          startLocation,
          endLocation,
          startDate: startDate?.toISOString().split('T')[0],
        },
      });

      setBusData(response.data); // Store the fetched bus data
    } catch (error) {
      console.error('Error fetching buses:', error);
    }
  };

  return (
    <Router>
      <div className="app-background">
        <Routes>
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route
            path="/*"
            element={
              <div className="App">
                <Header />
                <Routes>
                  <Route
                    path="/"
                    element={
                      <div className="form-container">
                        <form className="search-container" onSubmit={handleSearch}>
                          <div className="btnscr2">
                            <input
                              type="text"
                              placeholder="From"
                              value={startLocation}
                              onChange={(e) => setStartLocation(e.target.value)}
                            />
                          </div>
                          <button type="button" className="exchange-button" onClick={exchangeLocations}>
                            <img src="up-down.png" alt="Exchange" className="exchange-icon" />
                          </button>
                          <div className="btnscr1">
                            <input
                              type="text"
                              placeholder="To"
                              value={endLocation}
                              onChange={(e) => setEndLocation(e.target.value)}
                            />
                          </div>
                          <div className="btnscr1 datepicker-wrapper">
                            <DatePicker
                              selected={startDate}
                              onChange={(date) => setStartDate(date)}
                              minDate={new Date()}
                              showTimeSelect
                              dateFormat="Pp"
                              placeholderText="Date"
                              className="datepicker"
                            />
                            <img src="calendar.svg" alt="Calendar" className="calendar-icon" />
                          </div>
                          <div className="btnscr">
                            <button type="submit" className="search-button">
                              <img src="search.svg" alt="Search" className="search-icon" /> Search
                            </button>
                          </div>
                        </form>

                        {busData.length > 0 && (
                          <div className="bus-results">
                            <h2>Available Buses</h2>
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
                                  <th>Fare</th>
                                  <th>Book</th>
                                </tr>
                              </thead>
                              <tbody>
                                {busData.map((bus) => (
                                  <tr key={bus.id}>
                                    <td>{bus.name}</td>
                                    <td>{bus.number}</td>
                                    <td>{bus.type}</td>
                                    <td>{bus.seating_capacity}</td>
                                    <td>{bus.route}</td>
                                    <td>{bus.departure_time}</td>
                                    <td>{bus.arrival_time}</td>
                                    <td>{bus.fare}</td>
                                    <td>
                                      <button className="book-now-button">Book Now</button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    }
                  />
                </Routes>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
