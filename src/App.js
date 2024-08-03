// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AdminLayout from './admin/AdminLayout';

function App() {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [startDate, setStartDate] = useState(null);

  const exchangeLocations = () => {
    const temp = startLocation;
    setStartLocation(endLocation);
    setEndLocation(temp);
  };

  return (
    <Router>
      <div className="app-background">
        <Routes>
          <Route
            path="/admin/*"
            element={<AdminLayout />}
          />
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
                        <form className="search-container">
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
