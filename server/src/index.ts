// Change synchronize to false in production in the ormconfig.json file
import express from 'express';
import { createConnection } from 'typeorm';
import { config } from 'dotenv';
import setupRoutes from './routes/index';

config();

createConnection()
  .then(async () => {
    const app = express();

    app.use(express.json()); // Enable JSON body parsing
    setupRoutes(app); // Setup routes

    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}.`);
      console.log('Successfully connected to the database.');
    });
  })
  .catch((error) => console.log(error));
