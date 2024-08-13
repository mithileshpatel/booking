import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const BookingDetail = () => {
    const location = useLocation();
    const busData = location.state?.busData || [];

    const [selectedBus, setSelectedBus] = useState(null);
    const [details, setDetails] = useState({
        seats: false,
        amenities: false,
        photos: false,
        points: false,
        reviews: false,
        policies: false,
    });

    const handleShowDetails = (bus, detailType) => {
        setSelectedBus(bus);
        setDetails(prevDetails => ({
            ...prevDetails,
            [detailType]: !prevDetails[detailType]
        }));
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
                <tbody>
                    {busData.map((bus) => (
                        <React.Fragment key={bus.id}>
                            <tr>
                                <td>{bus.name}</td>
                                <td>{bus.number}</td>
                                <td>{bus.type}</td>
                                <td>{bus.seating_capacity}</td>
                                <td>{bus.route}</td>
                                <td>{bus.departure_time}</td>
                                <td>{bus.arrival_time}</td>
                                <td>{bus.fare}</td>
                            </tr>
                            <tr>
                                <td colSpan="8">
                                    <div className="button-row">
                                        <button onClick={() => handleShowDetails(bus, 'seats')}>
                                            View Seats
                                        </button>
                                        <button onClick={() => handleShowDetails(bus, 'amenities')}>
                                            Amenities
                                        </button>
                                        <button onClick={() => handleShowDetails(bus, 'photos')}>
                                            Bus Photos
                                        </button>
                                        <button onClick={() => handleShowDetails(bus, 'points')}>
                                            Boarding & Dropping Points
                                        </button>
                                        <button onClick={() => handleShowDetails(bus, 'reviews')}>
                                            Reviews
                                        </button>
                                        <button onClick={() => handleShowDetails(bus, 'policies')}>
                                            Booking Policies
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            {selectedBus === bus && (
                                <tr>
                                    <td colSpan="8">
                                        {details.seats && <div>Seats Information for {bus.name}</div>}
                                        {details.amenities && <div>Amenities for {bus.name}</div>}
                                        {details.photos && <div>Photos for {bus.name}</div>}
                                        {details.points && <div>Boarding & Dropping Points for {bus.name}</div>}
                                        {details.reviews && <div>Reviews for {bus.name}</div>}
                                        {details.policies && <div>Booking Policies for {bus.name}</div>}
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookingDetail;
