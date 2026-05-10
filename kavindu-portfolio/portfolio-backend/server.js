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

// Priority: Env Variable > Hardcoded String
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://kavizz:malshan@cluster0.iizqsvg.mongodb.net/PortfolioDB';

// Connect with retry logic or simple connection
mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ MongoDB: Connection Established'))
    .catch(err => console.error('❌ MongoDB: Connection Failed', err));

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

// Optimized Fetch Route
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 }).lean(); 
        // .lean() makes the query faster by returning plain JS objects instead of Mongoose Documents
        
        if (!projects || projects.length === 0) {
            return res.status(200).json([]); // Return empty array if no data
        }

        res.status(200).json(projects);
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ error: "Internal Server Error while fetching projects" });
    }
});

app.get('/', (req, res) => res.send('System Status: Online. Reach projects at /api/projects'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Node Server spinning on Port ${PORT}`);
});