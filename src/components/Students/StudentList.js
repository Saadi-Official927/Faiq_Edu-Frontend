// src/components/Students/StudentList.js
import React, { useEffect, useState } from 'react';
import axios from '../../api/axiosConfig';
import { Link } from 'react-router-dom';

const StudentList = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('/student');
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const deleteStudent = async (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                await axios.delete(`/student/${id}`);
                setStudents(students.filter(stu => stu._id !== id));
            } catch (error) {
                console.error('Error deleting student:', error);
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2>Students</h2>
            <Link to="/students/add" className="btn btn-primary mb-3">Add Student</Link>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Roll Number</th>
                        <th>Class</th>
                        <th>Section</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(stu => (
                        <tr key={stu._id}>
                            <td>{stu.name}</td>
                            <td>{stu.rollNumber}</td>
                            <td>{stu.class.name}</td>
                            <td>{stu.section.name}</td>
                            <td>
                                <Link to={`/students/edit/${stu._id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                                <button onClick={() => deleteStudent(stu._id)} className="btn btn-danger btn-sm">Delete</button>
                            </td>
                        </tr>
                    ))}
                    {students.length === 0 && (
                        <tr>
                            <td colSpan="5" className="text-center">No students found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default StudentList;
