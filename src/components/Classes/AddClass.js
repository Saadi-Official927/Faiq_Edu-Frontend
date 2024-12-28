// src/components/Classes/AddClass.js
import React, { useState } from 'react';
import axios from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const AddClass = () => {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/class', { name });
            navigate('/classes');
        } catch (error) {
            console.error('Error adding class:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Add Class</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Class Name</label>
                    <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Add Class</button>
            </form>
        </div>
    );
};

export default AddClass;
