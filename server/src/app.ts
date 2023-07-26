import express from 'express';
import { createConnection, getConnectionManager } from 'typeorm';
import setupRoutes from './routes/index';
const cors = require('cors');

const createApp = async () => {
    const connectionManager = getConnectionManager();
    if (!connectionManager.has('default')) {
        await createConnection(); // assume this will throw an error if connection fails
    }

    const app = express();
    
    // Enable CORS
    app.use(cors());

    app.use(express.json()); // Enable JSON body parsing
    setupRoutes(app); // Setup routes

    return app;
};

export default createApp;
