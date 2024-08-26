import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddAmenity.css';

const AddAmenity = () => {
    const [buses, setBuses] = useState([]);
    const [selectedBus, setSelectedBus] = useState('');
    const [amenityName, setAmenityName] = useState('');
    const [description, setDescription] = useState('');
    const [amenityType, setAmenityType] = useState('');
    const [amenityImage, setAmenityImage] = useState(null);
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
    const handleAmenityNameChange = (e) => setAmenityName(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleAmenityTypeChange = (e) => setAmenityType(e.target.value);

    const handleAmenityImageChange = (e) => {
        const file = e.target.files[0];

        if (!file) {
            alert('No file selected. Please choose an image file.');
            setAmenityImage(null);
            return;
        }

        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
        const maxSizeInBytes = 5 * 1024 * 1024; // 5MB

        if (!validImageTypes.includes(file.type)) {
            alert('Please upload a valid image file (JPEG, PNG, GIF).');
            setAmenityImage(null);
        } else if (file.size > maxSizeInBytes) {
            alert('File size exceeds 5MB. Please upload a smaller image.');
            setAmenityImage(null);
        } else {
            setAmenityImage(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!amenityImage) {
            alert('Please select an image for the amenity');
            return;
        }

        const formData = new FormData();
        formData.append('busId', selectedBus);
        formData.append('amenityName', amenityName);
        formData.append('description', description);
        formData.append('amenityType', amenityType);
        formData.append('amenityImage', amenityImage);

        try {
            await axios.post('http://localhost:5000/api/buses/bus_amenities/add', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Amenity added successfully!');
            // Reset form
            setSelectedBus('');
            setAmenityName('');
            setDescription('');
            setAmenityType('');
            setAmenityImage(null);
        } catch (error) {
            console.error('Error adding amenity:', error);
            alert('Failed to add amenity. Please try again.');
        }
    };

    return (
        loading ? <p>Loading buses...</p> : (
            <form onSubmit={handleSubmit} className="add-amenity-form">
                <div className="form-group">
                    <label htmlFor="busid">Bus</label>
                    <select
                        id="busid"
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
                    <label htmlFor="amenityName">Amenity Name</label>
                    <input
                        type="text"
                        id="amenityName"
                        value={amenityName}
                        onChange={handleAmenityNameChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={handleDescriptionChange}
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="amenityType">Amenity Type</label>
                    <input
                        type="text"
                        id="amenityType"
                        value={amenityType}
                        onChange={handleAmenityTypeChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="amenityImage">Amenity Image</label>
                    <input
                        type="file"
                        id="amenityImage"
                        onChange={handleAmenityImageChange}
                        required
                    />
                </div>

                <button type="submit" className="submit-btn">Add Amenity</button>
            </form>
        )
    );
};

export default AddAmenity;
