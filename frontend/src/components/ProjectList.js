import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/projects');
        setProjects(response.data); // Assuming response.data is an array of projects
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <h2>Project List</h2>
      {projects.length > 0 ? (
        <ul>
          {projects.map((project, index) => (
            <li key={index}>
              <strong>Name:</strong> {project.name || 'N/A'},  
              <strong>Phone:</strong> {project.phone || 'N/A'}, 
              <strong>Email:</strong> {project.email || 'N/A'}, 
              <strong>College:</strong> {project.college || 'N/A'},
              <strong>Project Type:</strong> {project.projectType || 'N/A'},
              <strong>Department:</strong> {project.department || 'N/A'},
              <strong>Domains:</strong> {project.domains ? project.domains.join(', ') : 'N/A'}
            </li>
          ))}
        </ul>
      ) : (
        <p>No projects available</p>
      )}
    </div>
  );
};

export default ProjectList;
