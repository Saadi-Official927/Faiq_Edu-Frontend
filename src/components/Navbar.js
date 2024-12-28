// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">School System</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/classes">Classes</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/sections">Sections</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/subjects">Subjects</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/students">Students</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/diaries">Diaries</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/attendance">Attendance</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
