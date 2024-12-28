// src/components/Attendance/AttendanceList.js
import React, { useEffect, useState } from 'react';
import axios from '../../api/axiosConfig';
import { Link } from 'react-router-dom';

const AttendanceList = () => {
    const [attendanceRecords, setAttendanceRecords] = useState([]);

    useEffect(() => {
        fetchAttendance();
    }, []);

    const fetchAttendance = async () => {
        try {
            const response = await axios.get('/attendance');
            setAttendanceRecords(response.data);
        } catch (error) {
            console.error('Error fetching attendance:', error);
        }
    };

    const deleteAttendance = async (id) => {
        if (window.confirm('Are you sure you want to delete this attendance record?')) {
            try {
                await axios.delete(`/attendance/${id}`);
                setAttendanceRecords(attendanceRecords.filter(att => att._id !== id));
            } catch (error) {
                console.error('Error deleting attendance:', error);
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2>Attendance Records</h2>
            <Link to="/attendance/add" className="btn btn-primary mb-3">Add Attendance</Link>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Class</th>
                        <th>Section</th>
                        <th>Present</th>
                        <th>Absent</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {attendanceRecords.map(att => (
                        <tr key={att._id}>
                            <td>{new Date(att.date).toLocaleDateString()}</td>
                            <td>{att.class.name}</td>
                            <td>{att.section.name}</td>
                            <td>{att.studentsPresent.length}</td>
                            <td>{att.studentsAbsent.length}</td>
                            <td>
                                <Link to={`/attendance/edit/${att._id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                                <button onClick={() => deleteAttendance(att._id)} className="btn btn-danger btn-sm">Delete</button>
                            </td>
                        </tr>
                    ))}
                    {attendanceRecords.length === 0 && (
                        <tr>
                            <td colSpan="6" className="text-center">No attendance records found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AttendanceList;
