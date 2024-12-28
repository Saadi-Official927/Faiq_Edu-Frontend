// src/components/Sections/SectionList.js
import React, { useEffect, useState } from 'react';
import axios from '../../api/axiosConfig';
import { Link } from 'react-router-dom';

const SectionList = () => {
    const [sections, setSections] = useState([]);

    useEffect(() => {
        fetchSections();
    }, []);

    const fetchSections = async () => {
        try {
            const response = await axios.get('/section');
            setSections(response.data);
        } catch (error) {
            console.error('Error fetching sections:', error);
        }
    };

    const deleteSection = async (id) => {
        if (window.confirm('Are you sure you want to delete this section?')) {
            try {
                await axios.delete(`/section/${id}`);
                setSections(sections.filter(sec => sec._id !== id));
            } catch (error) {
                console.error('Error deleting section:', error);
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2>Sections</h2>
            <Link to="/sections/add" className="btn btn-primary mb-3">Add Section</Link>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Class</th>
                        <th>Students</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sections.map(sec => (
                        <tr key={sec._id}>
                            <td>{sec.name}</td>
                            <td>{sec.class.name}</td>
                            <td>{sec.students.length}</td>
                            <td>
                                <Link to={`/sections/edit/${sec._id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                                <button onClick={() => deleteSection(sec._id)} className="btn btn-danger btn-sm">Delete</button>
                            </td>
                        </tr>
                    ))}
                    {sections.length === 0 && (
                        <tr>
                            <td colSpan="4" className="text-center">No sections found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default SectionList;
