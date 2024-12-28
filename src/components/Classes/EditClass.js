// src/components/Classes/EditClass.js
import React, { useEffect, useState } from 'react';
import axios from '../../api/axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';

const EditClass = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchClass();
        // eslint-disable-next-line
    }, []);

    const fetchClass = async () => {
        try {
            const response = await axios.get(`/class/${id}`);
            setName(response.data.name);
        } catch (error) {
            console.error('Error fetching class:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/class/${id}`, { name });
            navigate('/classes');
        } catch (error) {
            console.error('Error updating class:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Edit Class</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Class Name</label>
                    <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Update Class</button>
            </form>
        </div>
    );
};

export default EditClass;
