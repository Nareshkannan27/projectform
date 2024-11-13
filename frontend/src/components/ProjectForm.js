import React, { useState } from 'react';
import axios from 'axios';

// ProjectForm Component
const ProjectForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        college: '',
        projectType: '',
        department: '',
        domains: []
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData({
                ...formData,
                domains: checked
                    ? [...formData.domains, value]
                    : formData.domains.filter(domain => domain !== value)
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/projects', formData); // Removed response
            alert('Project submitted successfully!');
            setFormData({ name: '', phone: '', email: '', college: '', projectType: '', department: '', domains: [] });
        } catch (error) {
            alert('Failed to submit project');
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Phone:</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
                <label>College:</label>
                <input type="text" name="college" value={formData.college} onChange={handleChange} required />
            </div>
            <div>
                <label>Project Type:</label>
                <input type="radio" name="projectType" value="Mini Project" onChange={handleChange} /> Mini Project
                <input type="radio" name="projectType" value="Final Year Project" onChange={handleChange} /> Final Year Project
            </div>
            <div>
                <label>Department:</label>
                <select name="department" value={formData.department} onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="cse">CSE</option>
                    <option value="ece">ECE</option>
                </select>
            </div>
            {formData.department === 'cse' && (
                <div>
                    <label>Domains:</label>
                    <input type="checkbox" value="Deep Learning" onChange={handleChange} /> Deep Learning
                    <input type="checkbox" value="Machine Learning" onChange={handleChange} /> Machine Learning
                    <input type="checkbox" value="Data Science" onChange={handleChange} /> Data Science
                </div>
            )}
            {formData.department === 'ece' && (
                <div>
                    <label>Domains:</label>
                    <input type="checkbox" value="Signal Processing" onChange={handleChange} /> Signal Processing
                    <input type="checkbox" value="VLSI" onChange={handleChange} /> VLSI
                    <input type="checkbox" value="Embedded Systems" onChange={handleChange} /> Embedded Systems
                </div>
            )}
            <button type="submit">Submit</button>
        </form>
    );
};

// ProjectList Component

export default ProjectForm;
