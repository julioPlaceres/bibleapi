import { EntityMetadata, createConnection, getConnection, getConnectionManager } from 'typeorm';
import getExpressApp from './app';
import { Server } from 'http';
import { Book } from './entity/Book';
import { HistoricalEvent } from './entity/HistoricalEvent';
// import { Character } from './entity/Character';

let server: Server;

beforeAll(async () => {
    const connectionManager = getConnectionManager();
    if (!connectionManager.has('default')) {
        await createConnection();
    }

    const connection = getConnection();

    const book1 = new Book();
    const book2 = new Book();
    const book3 = new Book();

    book1.name = "Genesis";
    book2.name = "Exodus";
    book3.name = "Leviticus";

    const bookRepository = connection.getRepository(Book);
    await bookRepository.save([book1, book2, book3]);

    const event1 = new HistoricalEvent();
    const event2 = new HistoricalEvent();
    const event3 = new HistoricalEvent();

    event1.name = "The Beginning";
    event2.name = "The Exit";
    event3.name = "The Promise Land";

    const eventRepository = connection.getRepository(HistoricalEvent);
    await eventRepository.save([event1, event2, event3]);

    // const character1 = new Character();
    // const character2 = new Character();
    // const character3 = new Character();

    // character1.name = "Moses";
    // character2.name = "Aaron";
    // character3.name = "Joshua";

    // const characterRepository = connection.getRepository(Character);
    // await characterRepository.save([character1, character2, character3]);

    const app = await getExpressApp();
    server = app.listen();
});

beforeEach(async () => {
    const connection = getConnection();
    const entities: EntityMetadata[] = connection.entityMetadatas;

    for (const entity of entities) {
        const repository = connection.getRepository(entity.name);
        // insert default data per entity if necessary
    }
});

afterAll(async () => {
    // Close the database connection after all tests
    const connection = getConnection();
    if (server) {
        server.close();
    }
    await connection.close();
});

afterEach(async () => {
    const connection = getConnection();
    await connection.query('SET FOREIGN_KEY_CHECKS=0'); // disable foreign key checks

    const entities: EntityMetadata[] = connection.entityMetadatas;

    for (const entity of entities) {
        const repository = connection.getRepository(entity.name);
        await repository.clear(); // Clear each table
    }

    await connection.query('SET FOREIGN_KEY_CHECKS=1'); // enable foreign key checks
}, 10000);

export { server };
