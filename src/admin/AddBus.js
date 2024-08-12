import React, { useState } from 'react';
import axios from 'axios';
import './AddBus.css';

const AddBus = () => {
  const [busName, setBusName] = useState('');
  const [busNumber, setBusNumber] = useState('');
  const [busType, setBusType] = useState('');
  const [seatingCapacity, setSeatingCapacity] = useState('');
  const [route, setRoute] = useState('');
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [travelDate, setTravelDate] = useState(null);
  const [busImage, setBusImage] = useState(null);
  const [fare, setFare] = useState('');

  const handleImageChange = (e) => {
    setBusImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('busName', busName);
    formData.append('busNumber', busNumber);
    formData.append('busType', busType);
    formData.append('seatingCapacity', seatingCapacity);
    formData.append('route', route);
    formData.append('startLocation', startLocation);
    formData.append('endLocation', endLocation);
    formData.append('departureTime', departureTime);
    formData.append('arrivalTime', arrivalTime);
    formData.append('travelDate', travelDate);
    if (busImage) formData.append('busImage', busImage);
    formData.append('fare', fare);

    try {
      const response = await axios.post('http://localhost:5000/api/buses/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Bus added successfully!');
    } catch (error) {
      console.error('Error adding bus:', error);
      alert('Failed to add bus.');
    }
  };

  return (
    <div className="add-bus-form">
      <h2>Add Bus</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-group">
          <label>Bus Name</label>
          <input
            type="text"
            value={busName}
            onChange={(e) => setBusName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Bus Number</label>
          <input
            type="text"
            value={busNumber}
            onChange={(e) => setBusNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Bus Type</label>
          <input
            type="text"
            value={busType}
            onChange={(e) => setBusType(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Seating Capacity</label>
          <input
            type="number"
            value={seatingCapacity}
            onChange={(e) => setSeatingCapacity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Route</label>
          <input
            type="text"
            value={route}
            onChange={(e) => setRoute(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Start Location</label>
          <input
            type="text"
            value={startLocation}
            onChange={(e) => setStartLocation(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>End Location</label>
          <input
            type="text"
            value={endLocation}
            onChange={(e) => setEndLocation(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Departure Time</label>
          <input
            type="time"
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Arrival Time</label>
          <input
            type="time"
            value={arrivalTime}
            onChange={(e) => setArrivalTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Travel Date</label>
          <input
            type="date"
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Fare</label>
          <input
            type="number"
            value={fare}
            onChange={(e) => setFare(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Bus Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Add Bus</button>
      </form>
    </div>
  );
};

export default AddBus;
