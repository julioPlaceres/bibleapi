import { Express } from 'express';
import booksRoute from './bookRoutes';
import eventsRoute from './eventRoutes';
import locationRoute from './locationRoutes';
import riverRoute from './riverRoutes';
import materialRoute from './materialRoutes';
import charactersRoute from './characterRoutes';
import searchRoute from './searchRoutes';

export default (app: Express) => {
    app.use('/books', booksRoute);
    app.use('/events', eventsRoute);
    app.use('/locations', locationRoute);
    app.use('/rivers', riverRoute);
    app.use('/materials', materialRoute);
    app.use('/characters', charactersRoute);
    app.use('/search', searchRoute);
};
