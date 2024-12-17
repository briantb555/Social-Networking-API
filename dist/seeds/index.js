import db from '../config/connection.js';
import { User, Thought } from '../models/index.js';
import cleanDB from './cleanDB.js';
import { userData, thoughtData } from './data.js';
try {
    await db();
    await cleanDB();
    // Seed the database
    await User.create(userData);
    await Thought.create(thoughtData);
    // Log out the seed data to indicate what should appear in the database
    console.info('Seeding complete! 🌱');
    process.exit(0);
}
catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
}
