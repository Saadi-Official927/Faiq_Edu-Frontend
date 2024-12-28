// src/components/Classes/ClassList.js
import React, { useEffect, useState } from 'react';
import axios from '../../api/axiosConfig';
import { Link } from 'react-router-dom';

const ClassList = () => {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        try {
            const response = await fetch('http://98.84.2.112/faiq/api/class', {
                headers: { "content-type": "application/json" }
            });
            const classData = await response.json()
            console.log("class data=> ", classData);

            setClasses(classData);
        } catch (error) {
            console.error('Error fetching classes:', error);
        }
    };

    const deleteClass = async (id) => {
        if (window.confirm('Are you sure you want to delete this class?')) {
            try {
                await axios.delete(`/class/${id}`);
                setClasses(classes.filter(cls => cls._id !== id));
            } catch (error) {
                console.error('Error deleting class:', error);
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2>Classes</h2>
            <Link to="/classes/add" className="btn btn-primary mb-3">Add Class</Link>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Sections</th>
                        <th>Subjects</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.map(cls => (
                        <tr key={cls._id}>
                            <td>{cls.name}</td>
                            <td>{cls.sections.length}</td>
                            <td>{cls.subjects.length}</td>
                            <td>
                                <Link to={`/classes/edit/${cls._id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                                <button onClick={() => deleteClass(cls._id)} className="btn btn-danger btn-sm">Delete</button>
                            </td>
                        </tr>
                    ))}
                    {classes.length === 0 && (
                        <tr>
                            <td colSpan="4" className="text-center">No classes found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ClassList;
