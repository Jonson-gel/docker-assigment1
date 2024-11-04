const mongoose = require('mongoose');
const uri = 'mongodb://admin:password@mongodb:27017';
const seedData = require('./seeding.json');
const Movies = require('./model/movies.js');
const WAIT_TIME = 5000;
const MAX_RETRY_TIME = 60000;

async function connect() {
    const startTime = Date.now();
    while (true) {
        try {
            await mongoose.connect(uri);
            console.log("Connect successfully!");
            break;
        } catch (error) {
            const elapsedTime = Date.now() - startTime;
            if (elapsedTime >= MAX_RETRY_TIME) {
                console.error("Exceeded maximum retry time for MongoDB connection.");
                throw new Error("Exceeded maximum retry time for MongoDB connection.");
            }
            console.error(`MongoDB connection unsuccessful, retrying after ${WAIT_TIME / 1000} seconds.`);
            await new Promise(resolve => setTimeout(resolve, WAIT_TIME));
        }
    }
}

async function seedDatabase() {
    try {
        await connect();

        const existingData = await Movies.countDocuments();
        if (existingData === 0) {
            await Movies.insertMany(seedData);
            console.log("Insert successfully!");
        } else {
            console.log("Database already has the data.");
        }
    } catch (error) {
        console.error("Something went wrong during seeding database.", error);
    } finally {
        await mongoose.disconnect();
    }
}
seedDatabase();