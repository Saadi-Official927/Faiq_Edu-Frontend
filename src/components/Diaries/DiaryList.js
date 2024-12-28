// src/components/Diaries/DiaryList.js
import React, { useEffect, useState } from 'react';
import axios from '../../api/axiosConfig';
import { Link } from 'react-router-dom';

const DiaryList = () => {
    const [diaries, setDiaries] = useState([]);

    useEffect(() => {
        fetchDiaries();
    }, []);

    const fetchDiaries = async () => {
        try {
            const response = await axios.get('/diary');
            setDiaries(response.data);
        } catch (error) {
            console.error('Error fetching diaries:', error);
        }
    };

    const deleteDiary = async (id) => {
        if (window.confirm('Are you sure you want to delete this diary entry?')) {
            try {
                await axios.delete(`/diary/${id}`);
                setDiaries(diaries.filter(diary => diary._id !== id));
            } catch (error) {
                console.error('Error deleting diary:', error);
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2>Diaries</h2>
            <Link to="/diaries/add" className="btn btn-primary mb-3">Add Diary</Link>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Class</th>
                        <th>Section</th>
                        <th>Content</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {diaries.map(diary => (
                        <tr key={diary._id}>
                            <td>{new Date(diary.date).toLocaleDateString()}</td>
                            <td>{diary.class.name}</td>
                            <td>{diary.section.name}</td>
                            <td>{diary.content}</td>
                            <td>
                                <Link to={`/diaries/edit/${diary._id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                                <button onClick={() => deleteDiary(diary._id)} className="btn btn-danger btn-sm">Delete</button>
                            </td>
                        </tr>
                    ))}
                    {diaries.length === 0 && (
                        <tr>
                            <td colSpan="5" className="text-center">No diary entries found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DiaryList;
