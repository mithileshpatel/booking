import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddBoardingDroppingPoint.css';

const AddBoardingDroppingPoint = () => {
    const [buses, setBuses] = useState([]);
    const [busId, setBusId] = useState('');
    const [pointName, setPointName] = useState('');
    const [address, setAddress] = useState('');
    const [time, setTime] = useState('');
    const [type, setType] = useState('Boarding');
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/buses/boardingDroppingPoints/add', {
                busId,
                pointName,
                address,
                time,
                type
            });
            alert('Boarding/Dropping point added successfully!');
            // Reset form
            setBusId('');
            setPointName('');
            setAddress('');
            setTime('');
            setType('Boarding');
        } catch (error) {
            console.error('Error adding point:', error);
            alert('Failed to add point.');
        }
    };

    return (
        loading ? <p>Loading buses...</p> : (
            <div className="add-point-form">
                <h2>Add Boarding/Dropping Point</h2>
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
                        <label>Point Name</label>
                        <input
                            type="text"
                            value={pointName}
                            onChange={(e) => setPointName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Time</label>
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Type</label>
                        <select value={type} onChange={(e) => setType(e.target.value)} required>
                            <option value="Boarding">Boarding</option>
                            <option value="Dropping">Dropping</option>
                        </select>
                    </div>
                    <button type="submit" className="submit-button">Add Point</button>
                </form>
            </div>
        )
    );
};

export default AddBoardingDroppingPoint;
