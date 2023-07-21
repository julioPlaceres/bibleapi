import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();
import createApp from './app';

const startServer = async () => {
  const app = await createApp();

  const port = process.env.PORT || 4000;

  app.listen(port, () => {
  });
}

startServer();
