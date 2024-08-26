import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddSeat.css';

const AddSeat = () => {
    const [buses, setBuses] = useState([]);
    const [busId, setBusId] = useState('');
    const [seatNumber, setSeatNumber] = useState('');
    const [deck, setDeck] = useState('Lower');
    const [isBooked, setIsBooked] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBuses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/buses');
                setBuses(response.data);
            } catch (error) {
                console.error('Error fetching buses:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBuses();
    }, []);

    const handleBusChange = (e) => setBusId(e.target.value);
    const handleSeatNumberChange = (e) => setSeatNumber(e.target.value);
    const handleDeckChange = (e) => setDeck(e.target.value);
    const handleIsBookedChange = (e) => setIsBooked(e.target.checked);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/buses/seats/add', { busId, seatNumber, deck, isBooked });
            alert('Seat added successfully!');
            // Reset form
            setBusId('');
            setSeatNumber('');
            setDeck('Lower');
            setIsBooked(false);
        } catch (error) {
            console.error('Error adding seat:', error);
            alert('Failed to add seat.');
        }
    };

    return (
        loading ? <p>Loading buses...</p> : (
            <div className="add-seat-form">
                <h2>Add Seat</h2>
                <form onSubmit={handleSubmit} className="form-grid">
                    <div className="form-group">
                        <label>Bus</label>
                        <select
                            value={busId}
                            onChange={handleBusChange}
                            required
                        >
                            <option value="" disabled>Select a Bus</option>
                            {buses.map((bus) => (
                                <option key={bus.id} value={bus.id}>
                                    {bus.id} - {bus.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Seat Number</label>
                        <input
                            type="text"
                            value={seatNumber}
                            onChange={handleSeatNumberChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Deck</label>
                        <select value={deck} onChange={handleDeckChange} required>
                            <option value="Lower">Lower Deck</option>
                            <option value="Upper">Upper Deck</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Is Booked</label>
                        <input
                            type="checkbox"
                            checked={isBooked}
                            onChange={handleIsBookedChange}
                        />
                    </div>
                    <button type="submit" className="submit-button">Add Seat</button>
                </form>
            </div>
        )
    );
};

export default AddSeat;
