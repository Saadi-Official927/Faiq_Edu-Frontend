// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';

// Classes
import ClassList from './components/Classes/ClassList';
import AddClass from './components/Classes/AddClass';
import EditClass from './components/Classes/EditClass';

// Sections
import SectionList from './components/Sections/SectionList';
import AddSection from './components/Sections/AddSection';
import EditSection from './components/Sections/EditSection';

// Subjects
import SubjectList from './components/Subjects/SubjectList';
import AddSubject from './components/Subjects/AddSubject';
import EditSubject from './components/Subjects/EditSubject';

// Students
import StudentList from './components/Students/StudentList';
import AddStudent from './components/Students/AddStudent';
import EditStudent from './components/Students/EditStudent';

// Diaries
import DiaryList from './components/Diaries/DiaryList';
import AddDiary from './components/Diaries/AddDiary';
import EditDiary from './components/Diaries/EditDiary';

// Attendance
import AttendanceList from './components/Attendance/AttendanceList';
import AddAttendance from './components/Attendance/AddAttendance';
import EditAttendance from './components/Attendance/EditAttendance';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Classes */}
        <Route path="/classes" element={<ClassList />} />
        <Route path="/classes/add" element={<AddClass />} />
        <Route path="/classes/edit/:id" element={<EditClass />} />

        {/* Sections */}
        <Route path="/sections" element={<SectionList />} />
        <Route path="/sections/add" element={<AddSection />} />
        <Route path="/sections/edit/:id" element={<EditSection />} />

        {/* Subjects */}
        <Route path="/subjects" element={<SubjectList />} />
        <Route path="/subjects/add" element={<AddSubject />} />
        <Route path="/subjects/edit/:id" element={<EditSubject />} />

        {/* Students */}
        <Route path="/students" element={<StudentList />} />
        <Route path="/students/add" element={<AddStudent />} />
        <Route path="/students/edit/:id" element={<EditStudent />} />

        {/* Diaries */}
        <Route path="/diaries" element={<DiaryList />} />
        <Route path="/diaries/add" element={<AddDiary />} />
        <Route path="/diaries/edit/:id" element={<EditDiary />} />

        {/* Attendance */}
        <Route path="/attendance" element={<AttendanceList />} />
        <Route path="/attendance/add" element={<AddAttendance />} />
        <Route path="/attendance/edit/:id" element={<EditAttendance />} />
      </Routes>
    </Router>
  );
}

export default App;
