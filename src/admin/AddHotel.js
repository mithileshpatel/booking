import React, { useState } from 'react';
import axios from 'axios';
import './AddHotel.css';

const AddHotel = () => {
  const [hotelName, setHotelName] = useState('');
  const [hotelAddress, setHotelAddress] = useState('');
  const [hotelCity, setHotelCity] = useState('');
  const [hotelState, setHotelState] = useState('');
  const [hotelZip, setHotelZip] = useState('');
  const [hotelPhone, setHotelPhone] = useState('');
  const [hotelEmail, setHotelEmail] = useState('');
  const [hotelImage, setHotelImage] = useState(null);

  const handleImageChange = (e) => {
    setHotelImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('hotelName', hotelName);
    formData.append('hotelAddress', hotelAddress);
    formData.append('hotelCity', hotelCity);
    formData.append('hotelState', hotelState);
    formData.append('hotelZip', hotelZip);
    formData.append('hotelPhone', hotelPhone);
    formData.append('hotelEmail', hotelEmail);
    if (hotelImage) formData.append('hotelImage', hotelImage);

    try {
      const response = await axios.post('http://localhost:5000/api/hotels/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Hotel added successfully!');
      // Optionally, clear form fields after successful submission
      setHotelName('');
      setHotelAddress('');
      setHotelCity('');
      setHotelState('');
      setHotelZip('');
      setHotelPhone('');
      setHotelEmail('');
      setHotelImage(null);
    } catch (error) {
      console.error('Error adding hotel:', error);
      alert('Failed to add hotel.');
    }
  };

  return (
    <div className="add-hotel-form">
      <h2>Add Hotel</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Hotel Name</label>
          <input
            type="text"
            value={hotelName}
            onChange={(e) => setHotelName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Hotel Address</label>
          <input
            type="text"
            value={hotelAddress}
            onChange={(e) => setHotelAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            value={hotelCity}
            onChange={(e) => setHotelCity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>State</label>
          <input
            type="text"
            value={hotelState}
            onChange={(e) => setHotelState(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Zip Code</label>
          <input
            type="text"
            value={hotelZip}
            onChange={(e) => setHotelZip(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            value={hotelPhone}
            onChange={(e) => setHotelPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={hotelEmail}
            onChange={(e) => setHotelEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Hotel Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit">Add Hotel</button>
      </form>
    </div>
  );
};

export default AddHotel;
