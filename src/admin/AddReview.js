import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddReview.css';

const AddReview = () => {
    const [buses, setBuses] = useState([]);
    const [busId, setBusId] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [rating, setRating] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [reviewDate, setReviewDate] = useState('');
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
    const handleCustomerNameChange = (e) => setCustomerName(e.target.value);
    const handleRatingChange = (e) => setRating(e.target.value);
    const handleReviewTextChange = (e) => setReviewText(e.target.value);
    const handleReviewDateChange = (e) => setReviewDate(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/buses/reviews/add', { busId, customerName, rating, reviewText, reviewDate });
            alert('Review added successfully!');
            // Reset form
            setBusId('');
            setCustomerName('');
            setRating('');
            setReviewText('');
            setReviewDate('');
        } catch (error) {
            console.error('Error adding review:', error);
            alert('Failed to add review.');
        }
    };

    return (
        loading ? <p>Loading buses...</p> : (
            <div className="add-review-form">
                <h2>Add Review</h2>
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
                        <label>Customer Name</label>
                        <input
                            type="text"
                            value={customerName}
                            onChange={handleCustomerNameChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Rating (1-5)</label>
                        <input
                            type="number"
                            min="1"
                            max="5"
                            value={rating}
                            onChange={handleRatingChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Review Text</label>
                        <textarea
                            value={reviewText}
                            onChange={handleReviewTextChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Review Date</label>
                        <input
                            type="date"
                            value={reviewDate}
                            onChange={handleReviewDateChange}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">Add Review</button>
                </form>
            </div>
        )
    );
};

export default AddReview;
