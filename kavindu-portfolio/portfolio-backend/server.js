import dns from 'node:dns';
dns.setServers(['8.8.8.8', '8.8.4.4']); 

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://kavizz:malshan@cluster0.iizqsvg.mongodb.net/PortfolioDB';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ Database Connected'))
    .catch(err => console.error('❌ Connection Error:', err));

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

// This is the route the frontend must call
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch projects" });
    }
});

app.get('/', (req, res) => res.send('API Operational. Use /api/projects for data.'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Server on ${PORT}`));