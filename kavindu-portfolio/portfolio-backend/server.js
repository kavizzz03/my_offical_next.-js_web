import dns from 'node:dns';
// Bypasses local ISP connection errors (useful for certain regions/SL)
dns.setServers(['8.8.8.8', '8.8.4.4']); 

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
// Priority: 1. Environment Variable (Safe) | 2. Direct string (Fallback)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://kavizz:malshan@cluster0.iizqsvg.mongodb.net/PortfolioDB';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ System Database Online'))
    .catch(err => {
        console.error('❌ Connection Error:', err);
        process.exit(1); // Stop the server if DB connection fails
    });

// Project Schema
const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    tags: [String],
    githubUrl: { type: String, default: "#" },
    liveUrl: { type: String, default: "#" },
    category: { type: String, required: true }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

// API Routes
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ error: "Failed to fetch projects" });
    }
});

// Health Check Route (Helps Render monitor your app)
app.get('/', (req, res) => {
    res.send('Backend System is Operational.');
});

// CRITICAL FOR RENDER: 
// 1. Port must be dynamic using process.env.PORT
// 2. Bind to '0.0.0.0' to allow external traffic
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 API Service active on Port ${PORT}`);
});