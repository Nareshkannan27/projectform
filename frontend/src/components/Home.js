import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home-container">
            <h1>Welcome to Project Registration</h1>
            <p>Manage and register your projects effortlessly.</p>
            <div className="home-buttons">
                <Link to="/register" className="btn btn-primary">Register a Project</Link>
                <Link to="/projects" className="btn btn-secondary">View Projects</Link>
            </div>
        </div>
    );
};

export default Home;
