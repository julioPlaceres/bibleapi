import { Express } from 'express';
import booksRoute from './bookRoutes';
import eventsRoute from './eventRoutes';
// import charactersRoute from './characterRoutes';

export default (app: Express) => {
    app.use('/books', booksRoute);
    app.use('/events', eventsRoute);
    // app.use('/characters', charactersRoute);
};
