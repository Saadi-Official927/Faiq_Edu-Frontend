// src/components/Diaries/EditDiary.js
import React, { useEffect, useState } from 'react';
import axios from '../../api/axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';

const EditDiary = () => {
    const { id } = useParams();
    const [date, setDate] = useState('');
    const [content, setContent] = useState('');
    const [classId, setClassId] = useState('');
    const [sectionId, setSectionId] = useState('');
    const [classes, setClasses] = useState([]);
    const [sections, setSections] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDiary();
        fetchClasses();
        // eslint-disable-next-line
    }, []);

    const fetchDiary = async () => {
        try {
            const response = await axios.get(`/diary/${id}`);
            const diary = response.data;
            setDate(diary.date ? diary.date.substring(0, 10) : '');
            setContent(diary.content);
            setClassId(diary.class._id);
            setSectionId(diary.section._id);
            fetchSections(diary.class._id);
        } catch (error) {
            console.error('Error fetching diary:', error);
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
            await axios.put(`/diary/${id}`, { content });
            navigate('/diaries');
        } catch (error) {
            console.error('Error updating diary:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Edit Diary</h2>
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
                <button type="submit" className="btn btn-primary">Update Diary</button>
            </form>
        </div>
    );
};

export default EditDiary;
