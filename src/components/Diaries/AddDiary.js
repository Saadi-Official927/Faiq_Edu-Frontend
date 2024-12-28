// src/components/Diaries/AddDiary.js
import React, { useEffect, useState } from 'react';
import axios from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const AddDiary = () => {
    const [date, setDate] = useState('');
    const [content, setContent] = useState('');
    const [classes, setClasses] = useState([]);
    const [sections, setSections] = useState([]);
    const [classId, setClassId] = useState('');
    const [sectionId, setSectionId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        try {
            const response = await axios.get('/class');
            setClasses(response.data);
            if (response.data.length > 0) {
                setClassId(response.data[0]._id);
                fetchSections(response.data[0]._id);
            }
        } catch (error) {
            console.error('Error fetching classes:', error);
        }
    };

    const fetchSections = async (clsId) => {
        try {
            const response = await axios.get('/section');
            const filteredSections = response.data.filter(sec => sec.class._id === clsId);
            setSections(filteredSections);
            if (filteredSections.length > 0) setSectionId(filteredSections[0]._id);
            else setSectionId('');
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
            await axios.post('/diary', { date: date || undefined, class: classId, section: sectionId, content });
            navigate('/diaries');
        } catch (error) {
            console.error('Error adding diary:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Add Diary</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Date</label>
                    <input type="date" className="form-control" value={date} onChange={e => setDate(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Class</label>
                    <select className="form-select" value={classId} onChange={handleClassChange} required>
                        {classes.map(cls => (
                            <option key={cls._id} value={cls._id}>{cls.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Section</label>
                    <select className="form-select" value={sectionId} onChange={e => setSectionId(e.target.value)} required>
                        {sections.map(sec => (
                            <option key={sec._id} value={sec._id}>{sec.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Content</label>
                    <textarea className="form-control" value={content} onChange={e => setContent(e.target.value)} rows="4" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Add Diary</button>
            </form>
        </div>
    );
};

export default AddDiary;
