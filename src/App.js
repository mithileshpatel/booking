// src/App.js

import React, { useState } from 'react'; // Import useState from React
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom'; // Import useLocation and useNavigate
import Header from './components/Header';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';
import BookingDetail from './components/BookingDetail';
import AdminLayout from './admin/AdminLayout';
import axios from 'axios';

// AppContent Component
const AppContent = () => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [startDate, setStartDate] = useState(null);
  const navigate = useNavigate(); // Hook to navigate programmatically

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

      // Navigate to the booking detail page with bus data
      navigate('/booking-detail', { state: { busData: response.data } });
    } catch (error) {
      console.error('Error fetching buses:', error);
    }
  };

  return (
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
    </div>
  );
};

// Conditional Header Component
const ConditionalHeader = () => {
  const location = useLocation();
  return location.pathname.startsWith('/admin') ? null : <Header />;
};

// App Component
function App() {
  return (
    <Router>
      <div className="app-background">
        <ConditionalHeader />
        <Routes>
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route path="/booking-detail" element={<BookingDetail />} />
          <Route path="/*" element={<AppContent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
