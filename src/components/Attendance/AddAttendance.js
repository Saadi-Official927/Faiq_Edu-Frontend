// src/components/Attendance/AddAttendance.js
import React, { useEffect, useState } from 'react';
import axios from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const AddAttendance = () => {
    const [date, setDate] = useState('');
    const [classes, setClasses] = useState([]);
    const [sections, setSections] = useState([]);
    const [students, setStudents] = useState([]);
    const [classId, setClassId] = useState('');
    const [sectionId, setSectionId] = useState('');
    const [attendanceStatus, setAttendanceStatus] = useState({});
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
            if (filteredSections.length > 0) {
                setSectionId(filteredSections[0]._id);
                fetchStudents(filteredSections[0]._id);
            } else {
                setStudents([]);
                setSectionId('');
            }
        } catch (error) {
            console.error('Error fetching sections:', error);
        }
    };

    const fetchStudents = async (secId) => {
        try {
            const response = await axios.get('/student');
            const filteredStudents = response.data.filter(stu => stu.section._id === secId);
            setStudents(filteredStudents);

            // Initialize each student's status as 'absent' or 'present' if you prefer
            const initialStatus = {};
            filteredStudents.forEach(stu => {
                initialStatus[stu._id] = 'present';
            });
            setAttendanceStatus(initialStatus);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const handleClassChange = (e) => {
        const selectedClassId = e.target.value;
        setClassId(selectedClassId);
        fetchSections(selectedClassId);
    };

    const handleSectionChange = (e) => {
        const selectedSectionId = e.target.value;
        setSectionId(selectedSectionId);
        fetchStudents(selectedSectionId);
    };

    const handleRadioChange = (studentId, value) => {
        setAttendanceStatus(prev => ({
            ...prev,
            [studentId]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Separate studentsPresent & studentsAbsent based on attendanceStatus
        const studentsPresent = [];
        const studentsAbsent = [];

        Object.entries(attendanceStatus).forEach(([stuId, status]) => {
            if (status === 'present') {
                studentsPresent.push(stuId);
            } else {
                studentsAbsent.push(stuId);
            }
        });

        try {
            await axios.post('/attendance', {
                date: date || undefined,
                class: classId,
                section: sectionId,
                studentsPresent,
                studentsAbsent
            });
            navigate('/attendance');
        } catch (error) {
            console.error('Error adding attendance:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Add Attendance</h2>
            <form onSubmit={handleSubmit}>
                {/* Date */}
                <div className="mb-3">
                    <label className="form-label">Date</label>
                    <input
                        type="date"
                        className="form-control"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                    />
                </div>

                {/* Class */}
                <div className="mb-3">
                    <label className="form-label">Class</label>
                    <select
                        className="form-select"
                        value={classId}
                        onChange={handleClassChange}
                        required
                    >
                        {classes.map(cls => (
                            <option key={cls._id} value={cls._id}>
                                {cls.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Section */}
                <div className="mb-3">
                    <label className="form-label">Section</label>
                    <select
                        className="form-select"
                        value={sectionId}
                        onChange={handleSectionChange}
                        required
                    >
                        {sections.map(sec => (
                            <option key={sec._id} value={sec._id}>
                                {sec.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Attendance Table */}
                <h4>Mark Attendance</h4>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Roll Number</th>
                            <th className="text-center">Present</th>
                            <th className="text-center">Absent</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(stu => (
                            <tr key={stu._id}>
                                <td>{stu.name}</td>
                                <td>{stu.rollNumber}</td>
                                <td className="text-center">
                                    <input
                                        type="radio"
                                        name={`attendance-${stu._id}`}
                                        checked={attendanceStatus[stu._id] === 'present'}
                                        onChange={() => handleRadioChange(stu._id, 'present')}
                                    />
                                </td>
                                <td className="text-center">
                                    <input
                                        type="radio"
                                        name={`attendance-${stu._id}`}
                                        checked={attendanceStatus[stu._id] === 'absent'}
                                        onChange={() => handleRadioChange(stu._id, 'absent')}
                                    />
                                </td>
                            </tr>
                        ))}
                        {students.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center">
                                    No students found in this section.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <button type="submit" className="btn btn-primary">
                    Add Attendance
                </button>
            </form>
        </div>
    );
};

export default AddAttendance;
