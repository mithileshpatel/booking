import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddPolicy.css';

const AddPolicy = () => {
    const [buses, setBuses] = useState([]);
    const [selectedBus, setSelectedBus] = useState('');
    const [policyTitle, setPolicyTitle] = useState('');
    const [policyDescription, setPolicyDescription] = useState('');
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

    const handleBusChange = (e) => setSelectedBus(e.target.value);
    const handlePolicyTitleChange = (e) => setPolicyTitle(e.target.value);
    const handlePolicyDescriptionChange = (e) => setPolicyDescription(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/buses/booking_policies/add', {
                busId: selectedBus,
                policyTitle,
                policyDescription
            });
            alert('Policy added successfully!');
            setSelectedBus('');
            setPolicyTitle('');
            setPolicyDescription('');
        } catch (error) {
            console.error('Error adding policy:', error);
            alert('Failed to add policy.');
        }
    };

    return (
        loading ? <p>Loading buses...</p> : (
            <div className="add-policy-form">
                <h2>Add Policy</h2>
                <form onSubmit={handleSubmit} className="form-grid">
                    <div className="form-group">
                        <label htmlFor="bus">Bus</label>
                        <select
                            id="bus"
                            value={selectedBus}
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
                        <label htmlFor="policyTitle">Policy Title</label>
                        <input
                            type="text"
                            id="policyTitle"
                            value={policyTitle}
                            onChange={handlePolicyTitleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="policyDescription">Policy Description</label>
                        <textarea
                            id="policyDescription"
                            value={policyDescription}
                            onChange={handlePolicyDescriptionChange}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">Add Policy</button>
                </form>
            </div>
        )
    );
};

export default AddPolicy;
