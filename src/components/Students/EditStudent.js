// src/components/Students/EditStudent.js
import React, { useEffect, useState } from 'react';
import axios from '../../api/axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';

const EditStudent = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [rollNumber, setRollNumber] = useState('');
    const [classId, setClassId] = useState('');
    const [sectionId, setSectionId] = useState('');
    const [classes, setClasses] = useState([]);
    const [sections, setSections] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchStudent();
        fetchClasses();
        // eslint-disable-next-line
    }, []);

    const fetchStudent = async () => {
        try {
            const response = await axios.get(`/student/${id}`);
            setName(response.data.name);
            setRollNumber(response.data.rollNumber);
            setClassId(response.data.class._id);
            setSectionId(response.data.section._id);
            fetchSections(response.data.class._id);
        } catch (error) {
            console.error('Error fetching student:', error);
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

    const fetchSections = async (clsId) => {
        try {
            const response = await axios.get('/section');
            const filteredSections = response.data.filter(sec => sec.class._id === clsId);
            setSections(filteredSections);
            if (!filteredSections.find(sec => sec._id === sectionId)) {
                setSectionId(filteredSections.length > 0 ? filteredSections[0]._id : '');
            }
        } catch (error) {
            console.error('Error fetching sections:', error);
        }
    };

    const handleClassChange = (e) => {
        const selectedClassId = e.target.value;
        setClassId(selectedClassId);
        fetchSections(selectedClassId);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/student/${id}`, { name, rollNumber });
            navigate('/students');
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Edit Student</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Student Name</label>
                    <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Roll Number</label>
                    <input type="text" className="form-control" value={rollNumber} onChange={e => setRollNumber(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Select Class</label>
                    <select className="form-select" value={classId} onChange={handleClassChange} required>
                        {classes.map(cls => (
                            <option key={cls._id} value={cls._id}>{cls.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Select Section</label>
                    <select className="form-select" value={sectionId} onChange={e => setSectionId(e.target.value)} required>
                        {sections.map(sec => (
                            <option key={sec._id} value={sec._id}>{sec.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Update Student</button>
            </form>
        </div>
    );
};

export default EditStudent;
