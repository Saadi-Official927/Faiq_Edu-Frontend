// src/components/Sections/EditSection.js
import React, { useEffect, useState } from 'react';
import axios from '../../api/axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';

const EditSection = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [classId, setClassId] = useState('');
    const [classes, setClasses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchSection();
        fetchClasses();
        // eslint-disable-next-line
    }, []);

    const fetchSection = async () => {
        try {
            const response = await axios.get(`/section/${id}`);
            setName(response.data.name);
            setClassId(response.data.class._id);
        } catch (error) {
            console.error('Error fetching section:', error);
        }
    };

    const fetchClasses = async () => {
        try {
            const response = await axios.get('/class');
            setClasses(response.data);
        } catch (error) {
            console.error('Error fetching classes:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Assuming you might want to update class association as well
            await axios.put(`/section/${id}`, { name });
            navigate('/sections');
        } catch (error) {
            console.error('Error updating section:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Edit Section</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Section Name</label>
                    <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                {/* If class association is editable */}
                {/* <div className="mb-3">
          <label className="form-label">Select Class</label>
          <select className="form-select" value={classId} onChange={e => setClassId(e.target.value)} required>
            {classes.map(cls => (
              <option key={cls._id} value={cls._id}>{cls.name}</option>
            ))}
          </select>
        </div> */}
                <button type="submit" className="btn btn-primary">Update Section</button>
            </form>
        </div>
    );
};

export default EditSection;
