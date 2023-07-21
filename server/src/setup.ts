import { EntityMetadata, createConnection, getConnection, getConnectionManager } from 'typeorm';

beforeAll(async () => {
    const connectionManager = getConnectionManager();
    if (!connectionManager.has('default')) {
        await createConnection();
    }
});

afterAll(async () => {
    // Close the database connection after all tests
    const connection = getConnection();
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
