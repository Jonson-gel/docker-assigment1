const mongoose = require('mongoose');

const uri = 'mongodb://admin:secret@mongodb:27017';
const seedData = require('./seeding.json');
const Movies = require('./model/movies.js');

async function connectWithRetry() {
    while (true) {
        try {
            await mongoose.connect(uri);
            console.log("Successfully connected to MongoDB!");
            break;
        } catch (error) {
            console.error("MongoDB connection unsuccessful, retrying after 5 seconds...");
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
}

async function seedDatabase() {
    try {
        await connectWithRetry();

        await Movies.deleteMany({});
        console.log("Old data is cleared!");

        await Movies.insertMany(seedData);
        console.log("Database is seeded");

    } catch (error) {
        console.error("Something went wrong during seeding database", error);
    } finally {
        await mongoose.disconnect();
    }
}

seedDatabase();
