// Change synchronize to false in production in the ormconfig.json file
import { config } from 'dotenv';
config();
import { createConnection } from 'typeorm';

createConnection().then(() => {
  console.log('Successfully connected to the database.');
}).catch((error) => console.log(error));