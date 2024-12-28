// src/components/Subjects/SubjectList.js
import React, { useEffect, useState } from 'react';
import axios from '../../api/axiosConfig';
import { Link } from 'react-router-dom';

const SubjectList = () => {
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        fetchSubjects();
    }, []);

    const fetchSubjects = async () => {
        try {
            const response = await axios.get('/subject');
            setSubjects(response.data);
        } catch (error) {
            console.error('Error fetching subjects:', error);
        }
    };

    const deleteSubject = async (id) => {
        if (window.confirm('Are you sure you want to delete this subject?')) {
            try {
                await axios.delete(`/subject/${id}`);
                setSubjects(subjects.filter(sub => sub._id !== id));
            } catch (error) {
                console.error('Error deleting subject:', error);
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2>Subjects</h2>
            <Link to="/subjects/add" className="btn btn-primary mb-3">Add Subject</Link>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Class</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {subjects.map(sub => (
                        <tr key={sub._id}>
                            <td>{sub.name}</td>
                            <td>{sub.class.name}</td>
                            <td>
                                <Link to={`/subjects/edit/${sub._id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                                <button onClick={() => deleteSubject(sub._id)} className="btn btn-danger btn-sm">Delete</button>
                            </td>
                        </tr>
                    ))}
                    {subjects.length === 0 && (
                        <tr>
                            <td colSpan="3" className="text-center">No subjects found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default SubjectList;
