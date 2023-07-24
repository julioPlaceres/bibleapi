import { Express } from 'express';
import booksRoute from './bookRoutes';
import eventsRoute from './eventRoutes';
import locationRoute from './locationRoutes';
// import charactersRoute from './characterRoutes';

export default (app: Express) => {
    app.use('/books', booksRoute);
    app.use('/events', eventsRoute);
    app.use('/locations', locationRoute);
    // app.use('/characters', charactersRoute);
};
