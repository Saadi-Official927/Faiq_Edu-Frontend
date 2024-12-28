// src/components/Subjects/AddSubject.js
import React, { useEffect, useState } from 'react';
import axios from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const AddSubject = () => {
    const [name, setName] = useState('');
    const [classes, setClasses] = useState([]);
    const [classId, setClassId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        try {
            const response = await axios.get('/class');
            setClasses(response.data);
            if (response.data.length > 0) setClassId(response.data[0]._id);
        } catch (error) {
            console.error('Error fetching classes:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/subject', { name, classId });
            navigate('/subjects');
        } catch (error) {
            console.error('Error adding subject:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Add Subject</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Subject Name</label>
                    <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Select Class</label>
                    <select className="form-select" value={classId} onChange={e => setClassId(e.target.value)} required>
                        {classes.map(cls => (
                            <option key={cls._id} value={cls._id}>{cls.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Add Subject</button>
            </form>
        </div>
    );
};

export default AddSubject;
