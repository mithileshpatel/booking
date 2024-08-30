import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './BookingDetail.css';

const BookingDetail = () => {
    const location = useLocation();
    const busData = location.state?.busData || [];
    const [selectedBus, setSelectedBus] = useState(null);
    const [visibleDetail, setVisibleDetail] = useState(null);
    const [busDetailData, setBusDetailData] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);

    const handleShowDetails = (bus, detailType) => {
        setSelectedBus(bus);
        setVisibleDetail(detailType);
        // Fetch data based on the detailType and bus ID
        fetch(`http://localhost:5000/api/buses/${detailType}/${bus.id}`)
            .then(response => response.json())
            .then(data => setBusDetailData(data))
            .catch(error => console.error("Error fetching data: ", error));
    };

    const handleSeatSelect = (seat) => {
        setSelectedSeats(prevState => {
            if (prevState.includes(seat)) {
                return prevState.filter(selectedSeat => selectedSeat !== seat);
            } else {
                return [...prevState, seat];
            }
        });
    };

    const renderSeats = (seats) => {
        const upperDeckSeats = seats.filter(seat => seat.deck === 'Upper');
        const lowerDeckSeats = seats.filter(seat => seat.deck === 'Lower');

        return (
            <div className="seating-layout">
                <div className="deck">
                    <h4>Lower Deck</h4>
                    <div className="seat-row">
                        {lowerDeckSeats.map((seat, index) => (
                            <button
                                key={index}
                                className={`seat ${selectedSeats.includes(seat.seat_number) ? 'selected' : ''}`}
                                onClick={() => handleSeatSelect(seat.seat_number)}
                                disabled={seat.status === 'Booked'}
                            >
                                {seat.seat_number}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="deck">
                    <h4>Upper Deck</h4>
                    <div className="seat-row">
                        {upperDeckSeats.map((seat, index) => (
                            <button
                                key={index}
                                className={`seat ${selectedSeats.includes(seat.seat_number) ? 'selected' : ''}`}
                                onClick={() => handleSeatSelect(seat.seat_number)}
                                disabled={seat.status === 'Booked'}
                            >
                                {seat.seat_number}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
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
                            <tr className='btngroup'>
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
                                        {visibleDetail === 'seats' && (
                                            <div className="seat-selection">
                                                <h3>Select Your Seats:</h3>
                                                {busDetailData && busDetailData.length > 0 ? (
                                                    renderSeats(busDetailData)
                                                ) : <p>No seat information available.</p>}
                                            </div>
                                        )}
                                        {visibleDetail === 'amenities' && (
                                            <div className='bus-results'>
                                                <h3>Amenities:</h3>
                                                {busDetailData && busDetailData.length > 0 ? (
                                                    <ul className="detail-list">
                                                        {busDetailData.map((amenity, index) => (
                                                            <li key={index}>
                                                                <strong>Amenity Name:</strong> {amenity.name}<br />
                                                                <strong>Description:</strong> {amenity.description}<br />
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : <p>No amenities available.</p>}
                                            </div>
                                        )}
                                        {visibleDetail === 'photos' && (
                                            <div className='bus-results'>
                                                <h3>Bus Photos:</h3>
                                                {bus.image ? (
                                                    <img src={`http://localhost:5000/uploads/${bus.image}`} alt={bus.name} style={{ width: '200px', height: 'auto', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }} />
                                                ) : <p>No photos available.</p>}
                                            </div>
                                        )}
                                        {visibleDetail === 'points' && (
                                            <div className='bus-results'>
                                                <h3>Boarding & Dropping Points:</h3>
                                                {busDetailData && busDetailData.length > 0 ? (
                                                    <ul className="detail-list">
                                                        {busDetailData.map((point, index) => (
                                                            <li key={index}>
                                                                <strong>Location:</strong> {point.location}<br />
                                                                <strong>Time:</strong> {point.time}<br />
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : <p>No points available.</p>}
                                            </div>
                                        )}
                                        {visibleDetail === 'reviews' && (
                                            <div className='bus-results'>
                                                <h3>Reviews:</h3>
                                                {busDetailData && busDetailData.length > 0 ? (
                                                    <ul className="detail-list">
                                                        {busDetailData.map((review, index) => (
                                                            <li key={index}>
                                                                <strong>Customer Name:</strong> {review.customer_name}<br />
                                                                <strong>Rating:</strong> {review.rating}<br />
                                                                <strong>Review:</strong> {review.review_text}<br />
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : <p>No reviews available.</p>}
                                            </div>
                                        )}
                                        {visibleDetail === 'policies' && (
                                            <div className='bus-results'>
                                                <h3>Booking Policies:</h3>
                                                {busDetailData && busDetailData.length > 0 ? (
                                                    <ul className="detail-list">
                                                        {busDetailData.map((policy, index) => (
                                                            <li key={index}>
                                                                <strong>Policy Name:</strong> {policy.policy_name}<br />
                                                                <strong>Details:</strong> {policy.details}<br />
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : <p>No policies available.</p>}
                                            </div>
                                        )}
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
