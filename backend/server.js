const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/projectRegistrationDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB')).catch(err => console.error('Connection error:', err));

// Define Project Schema
const projectSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    college: String,
    projectType: String,
    department: String,
    domains: [String]
});

const Project = mongoose.model('Project', projectSchema);

// Routes
// Create Project
app.post('/api/projects', async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(201).send(project);
    } catch (error) {
        res.status(400).send({ error: 'Failed to create project' });
    }
});

// View Projects
app.get('/api/projects', async (req, res) => {
    try {
        // Fetch all projects from the database
        const projects = await Project.find();
        
        // Send the list of projects as a response with status 200
        res.status(200).json(projects);  // Using .json() to send JSON response
    } catch (error) {
        // If there is an error, send a 500 status with error message
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
