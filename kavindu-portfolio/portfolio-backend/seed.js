// 1. FORCE DNS TO GOOGLE (Fixes ECONNREFUSED)
const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const mongoose = require('mongoose');
require('dotenv').config();
const Project = require('./models/Project');

const sampleData = [
    {
        title: "ASB Fashion Digital Hub",
        description: "A high-performance management dashboard for ASB Fashions. Features glassmorphic UI, branch data synchronization, and a secure employee complaint portal.",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000",
        tags: ["Next.js", "PHP", "MySQL", "Tailwind CSS"],
        githubUrl: "#",
        liveUrl: "https://asbfashion.lk",
        category: "System Architecture"
    },
    {
        title: "WhatsApp & SMS Manager Elite",
        description: "Backend communication engine integrating WhatsApp Business API and Hutch SMS Gateway. Designed for batch sending elite membership updates to 20,000+ users.",
        image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?q=80&w=1000",
        tags: ["Node.js", "Express", "WhatsApp API", "SMS Gateway"],
        githubUrl: "#",
        liveUrl: "#",
        category: "Backend Engineering"
    },
    {
        title: "Brainana (Mobile Game)",
        description: "Logic-based puzzle game developed with Jetpack Compose. Includes complex state management for timers, scoring systems, and custom yellow-themed UI assets.",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000",
        tags: ["Kotlin", "Jetpack Compose", "Android SDK"],
        githubUrl: "#",
        liveUrl: "#",
        category: "Mobile Development"
    },
    {
        title: "Flood Management System",
        description: "Proposed IoT solution for real-time water flow monitoring and flood risk management in Sri Lankan river basins.",
        image: "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1000",
        tags: ["IoT", "Python", "Data Visualization"],
        githubUrl: "#",
        liveUrl: "#",
        category: "System Design"
    }
];

const seedDB = async () => {
    try {
        console.log("⏳ Connecting to MongoDB Atlas...");
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Connection Successful!");

        // Clear existing data
        await Project.deleteMany({});
        console.log("🗑️  Old data cleared.");

        // Insert new data
        await Project.insertMany(sampleData);
        console.log("🚀 ASB Fashion and other projects added successfully!");

        mongoose.connection.close();
        process.exit();
    } catch (err) {
        console.error("❌ Seeding failed:", err.message);
        process.exit(1);
    }
};

seedDB();