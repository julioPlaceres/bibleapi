import { Express } from 'express';
import booksRoute from './bookRoutes';
// import charactersRoute from './characterRoutes';
// import historicalEventsRoute from './historicalEventRoutes';

export default (app: Express) => {
    app.use('/books', booksRoute);
    // app.use('/characters', charactersRoute);
    // app.use('/events', historicalEventsRoute);
};
