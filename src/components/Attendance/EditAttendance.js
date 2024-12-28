// src/components/Attendance/EditAttendance.js
import React, { useEffect, useState } from 'react';
import axios from '../../api/axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';

const EditAttendance = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [date, setDate] = useState('');
    const [classId, setClassId] = useState('');
    const [sectionId, setSectionId] = useState('');
    const [classes, setClasses] = useState([]);
    const [sections, setSections] = useState([]);
    const [students, setStudents] = useState([]);
    const [attendanceStatus, setAttendanceStatus] = useState({});

    useEffect(() => {
        fetchAttendance();
        fetchClasses();
        // eslint-disable-next-line
    }, []);

    const fetchAttendance = async () => {
        try {
            const response = await axios.get(`/attendance/${id}`);
            const att = response.data;

            // Set date (YYYY-MM-DD substring)
            setDate(att.date ? att.date.substring(0, 10) : '');
            setClassId(att.class._id);
            setSectionId(att.section._id);

            // We'll fetch sections & students below
            // Convert existing attendance data into an object
            const statusObject = {};
            att.studentsPresent.forEach(stu => {
                statusObject[stu._id] = 'present';
            });
            att.studentsAbsent.forEach(stu => {
                statusObject[stu._id] = 'absent';
            });
            setAttendanceStatus(statusObject);

            fetchSections(att.class._id, att.section._id);
        } catch (error) {
            console.error('Error fetching attendance:', error);
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

    // We can pass the current section ID to ensure we fetch the students for the correct section
    const fetchSections = async (clsId, secId) => {
        try {
            const response = await axios.get('/section');
            const filteredSections = response.data.filter(sec => sec.class._id === clsId);
            setSections(filteredSections);

            // fetch students after sections are set
            fetchStudents(secId);
        } catch (error) {
            console.error('Error fetching sections:', error);
        }
    };

    const fetchStudents = async (secId) => {
        try {
            const response = await axios.get('/student');
            const filteredStudents = response.data.filter(stu => stu.section._id === secId);
            setStudents(filteredStudents);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    // Handling changes
    const handleClassChange = (e) => {
        const selectedClassId = e.target.value;
        setClassId(selectedClassId);
        // Re-fetch sections
        fetchSections(selectedClassId, '');
    };

    const handleSectionChange = (e) => {
        const selectedSectionId = e.target.value;
        setSectionId(selectedSectionId);
        // Re-fetch students
        fetchStudents(selectedSectionId);

        // Reset attendance for newly loaded students if needed
        setAttendanceStatus({});
    };

    const handleRadioChange = (studentId, value) => {
        setAttendanceStatus(prev => ({
            ...prev,
            [studentId]: value
        }));
    };

    // Submitting
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convert attendanceStatus object to arrays
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
            await axios.put(`/attendance/${id}`, {
                studentsPresent,
                studentsAbsent
            });
            navigate('/attendance');
        } catch (error) {
            console.error('Error updating attendance:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Edit Attendance</h2>
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
                <h4>Update Attendance</h4>
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
                    Update Attendance
                </button>
            </form>
        </div>
    );
};

export default EditAttendance;
