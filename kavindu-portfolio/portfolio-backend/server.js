import dns from 'node:dns';
dns.setServers(['8.8.8.8', '8.8.4.4']); // Bypasses local ISP connection errors

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Database Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://kavizz:malshan@cluster0.iizqsvg.mongodb.net/PortfolioDB';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ System Database Online'))
    .catch(err => console.error('❌ Connection Error:', err));

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
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
});

app.listen(5000, () => console.log('🚀 API Service active on Port 5000'));