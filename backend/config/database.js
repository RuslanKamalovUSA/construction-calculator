
import { MongoClient } from 'mongodb'
const config = require('./env.config')

function createMongoURI() {
    const {
        MONGO_PROTOCOL,
        MONGO_USER,
        MONGO_PASSWORD,
        MONGO_HOST,
        MONGO_RETRY_WRITES,
        MONGO_WRITE_CONCERN,
        MONGO_APP_NAME
    } = process.env;
    
    if (!MONGO_PROTOCOL ||
        !MONGO_USER ||
        !MONGO_PASSWORD ||
        !MONGO_HOST ||
        !MONGO_RETRY_WRITES ||
        !MONGO_WRITE_CONCERN ||
        !MONGO_APP_NAME) {
            throw new Error('Missing required connections parameters!')
        }
    return `${MONGO_PROTOCOL}//${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/?retryWrites=${MONGO_RETRY_WRITES}&w=${MONGO_WRITE_CONCERN}&appName=${MONGO_APP_NAME}`;
}

async function connectToDatabase() { 
    try {
        await new MongoClient(createMongoURI()).connect()
        console.log("success connected to database")
    } catch (error) {
        console.error('error to connect to database')
    }
}

module.exports = {
    connectToDatabase
}
