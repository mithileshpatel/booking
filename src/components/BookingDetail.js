import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './BookingDetail.css';

const BookingDetail = () => {
    const location = useLocation();
    const busData = location.state?.busData || [];

    const [selectedBus, setSelectedBus] = useState(null);
    const [visibleDetail, setVisibleDetail] = useState(null); // New state to track visible detail section

    const handleShowDetails = (bus, detailType) => {
        if (selectedBus === bus && visibleDetail === detailType) {
            // If the same button is clicked again, hide the section
            setVisibleDetail(null);
        } else {
            // Otherwise, show the selected detail section
            setSelectedBus(bus);
            setVisibleDetail(detailType);
        }
    };

    return (
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
                    </tr>
                </thead>

                {busData.map((bus) => (
                    <React.Fragment key={bus.id}>
                        <tbody className='body'>
                            <tr className='btn'>
                                <td>{bus.name}</td>
                                <td>{bus.number}</td>
                                <td>{bus.type}</td>
                                <td>{bus.seating_capacity}</td>
                                <td>{bus.route}</td>
                                <td>{bus.departure_time}</td>
                                <td>{bus.arrival_time}</td>
                                <td>{bus.fare}</td>
                            </tr>
                            <tr className='btngroup' >
                                <td colSpan="8">
                                    <div className="button-row">
                                        <button onClick={() => handleShowDetails(bus, 'seats')}>View Seats</button>
                                        <button onClick={() => handleShowDetails(bus, 'amenities')}>Amenities</button>
                                        <button onClick={() => handleShowDetails(bus, 'photos')}>Bus Photos</button>
                                        <button onClick={() => handleShowDetails(bus, 'points')}>Boarding & Dropping Points</button>
                                        <button onClick={() => handleShowDetails(bus, 'reviews')}>Reviews</button>
                                        <button onClick={() => handleShowDetails(bus, 'policies')}>Booking Policies</button>
                                    </div>
                                </td>
                            </tr>
                            {selectedBus === bus && (
                                <tr>
                                    <td colSpan="8">
                                        {visibleDetail === 'seats' && <div>Seats Information for {bus.name}</div>}
                                        {visibleDetail === 'amenities' && <div>Amenities for {bus.name}</div>}
                                        {visibleDetail === 'photos' && <div>Photos for {bus.name} {bus.image && <img src={`http://localhost:5000/uploads/${bus.image}`} alt={bus.name} style={{ width: '100px', height: 'auto' }} />}</div>}
                                        {visibleDetail === 'points' && <div>Boarding & Dropping Points for {bus.name}</div>}
                                        {visibleDetail === 'reviews' && <div>Reviews for {bus.name}</div>}
                                        {visibleDetail === 'policies' && <div>Booking Policies for {bus.name}</div>}
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </React.Fragment>
                ))}

            </table>
        </div>
    );
};

export default BookingDetail;
