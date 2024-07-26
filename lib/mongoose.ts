import mongoose, { Connection } from 'mongoose';

const MONGODB_URI = "mongodb://localhost:27017/nexus";

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cachedConnection: Connection | null = null;

async function connectToDatabase() {
    if (cachedConnection) {
        return cachedConnection;
    }

    try {
        const connection = await mongoose.connect(MONGODB_URI);
        cachedConnection = connection.connection; // Store the connection object
        console.log("Database Connected Successfully!!!");
        return cachedConnection;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw new Error('Failed to connect to MongoDB');
    }
}

export default connectToDatabase;
