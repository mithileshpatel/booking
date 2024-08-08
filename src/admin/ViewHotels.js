import React, { useEffect, useState } from 'react';
import './ViewHotels.css';

const ViewHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedHotels, setSelectedHotels] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    // Fetch hotel data from your backend
    const fetchHotels = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/hotels');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setHotels(data);
      } catch (error) {
        console.error('Error fetching hotel data:', error);
      }
    };

    fetchHotels();
  }, []);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allHotelIds = new Set(hotels.map(hotel => hotel.id));
      setSelectedHotels(allHotelIds);
    } else {
      setSelectedHotels(new Set());
    }
    setSelectAll(e.target.checked);
  };

  const handleCheckboxChange = (id) => {
    const updatedSelection = new Set(selectedHotels);
    if (updatedSelection.has(id)) {
      updatedSelection.delete(id);
    } else {
      updatedSelection.add(id);
    }
    setSelectedHotels(updatedSelection);
    setSelectAll(updatedSelection.size === hotels.length);
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(
        Array.from(selectedHotels).map(id =>
          fetch(`http://localhost:5000/api/hotels/${id}`, {
            method: 'DELETE',
          })
        )
      );
      setHotels(hotels.filter(hotel => !selectedHotels.has(hotel.id)));
      setSelectedHotels(new Set());
      setSelectAll(false);
    } catch (error) {
      console.error('Error deleting hotels:', error);
    }
  };

  return (
    <div className="view-hotels">
      <h2>View Hotels</h2>
      <button onClick={handleDeleteSelected} className="delete-selected-button" disabled={!selectedHotels.size}>
        Delete Selected
      </button>
      <table className="hotel-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th>Name</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {hotels.length ? (
            hotels.map((hotel) => (
              <tr key={hotel.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedHotels.has(hotel.id)}
                    onChange={() => handleCheckboxChange(hotel.id)}
                  />
                </td>
                <td>{hotel.name}</td>
                <td>{hotel.address}</td>
                <td>{hotel.city}</td>
                <td>{hotel.state}</td>
                <td>{hotel.zip}</td>
                <td>{hotel.phone}</td>
                <td>{hotel.email}</td>
                <td>
                  {hotel.image && (
                    <img
                      src={`http://localhost:5000/uploads/${hotel.image}`}
                      alt={hotel.name}
                      className="hotel-image"
                    />
                  )}
                </td>
                <td>
                  <button onClick={() => alert(`Editing ${hotel.name}`)} className="action-button">Edit</button>
                  <button onClick={async () => {
                    if (window.confirm(`Are you sure you want to delete ${hotel.name}?`)) {
                      await fetch(`http://localhost:5000/api/hotels/${hotel.id}`, {
                        method: 'DELETE',
                      });
                      setHotels(hotels.filter(h => h.id !== hotel.id));
                    }
                  }} className="action-button-d">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10">No hotels found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewHotels;
