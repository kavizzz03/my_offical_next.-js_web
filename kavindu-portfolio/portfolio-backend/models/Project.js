const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }, // URL for professional images
    tags: [{ type: String }],
    githubUrl: { type: String, default: "#" },
    liveUrl: { type: String, default: "#" },
    category: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);