import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Book } from '../entity/Book';
import { Character } from '../entity/Character';
import { HistoricalEvent } from '../entity/HistoricalEvent';
import { Location } from '../entity/Location';
import { Material } from '../entity/Material';
import { River } from '../entity/River';

const joinRelations = ['author', 'historicalEvents', 'materials', 'locations', 'rivers'];

const extractFieldsFromRequest = (req: Request) => {
    const { bookName, author, historicalEvents, materials, locations, rivers } = req.body;
    return { bookName, author, historicalEvents, materials, locations, rivers };
}

// Get all Books
export const getBooks = async (req: Request, res: Response) => {
    const booksRepository = getRepository(Book);
    const books = await booksRepository.find({ relations: joinRelations });
    res.json(books);
};

// Get a Book by id
export const getBook = async (req: Request, res: Response) => {
    const { id } = req.params;
    const booksRepository = getRepository(Book);

    const idNumber = Number(id);

    if (isNaN(idNumber)) {
        return res.status(400).json({ message: 'Invalid Book id' });
    }

    const book = await booksRepository.findOne({ where: { id: idNumber }, relations: joinRelations });

    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
}

// Create a new Book
export const createBook = async (req: Request, res: Response) => {
    const booksRepository = getRepository(Book);
    const fields = extractFieldsFromRequest(req);

    // Required fields
    if (!fields.bookName) {
        return res.status(400).json({ message: 'Book Name is required' });
    }

    const newBook = new Book();
    newBook.bookName = fields.bookName;

    // Optional fields
    if (fields.author) {
        const charactersRepository = getRepository(Character);
        const authorEntity = await charactersRepository.findOne({ where: { id: fields.author } });

        if (!authorEntity) {
            return res.status(404).json({ message: 'Author not found' });
        }

        newBook.author = authorEntity;
    }

    // Optional fields
    if (fields.historicalEvents) {
        const historicalEventRepository = getRepository(HistoricalEvent);
        const historicalEventEntities = [];

        for (const historicalEvent of fields.historicalEvents) {
            const historicalEventEntity = await historicalEventRepository.findOne({ where: { id: historicalEvent } });

            if (!historicalEventEntity) {
                return res.status(404).json({ message: `Event ID ${historicalEvent} not found` });
            }
            historicalEventEntities.push(historicalEventEntity);
        }
        newBook.historicalEvents = historicalEventEntities;
    }

    if (fields.materials) {
        const materialRepository = getRepository(Material);
        const materialEntities = [];

        for (const material of fields.materials) {
            const materialEntity = await materialRepository.findOne({ where: { id: material } });

            if (!materialEntity) {
                return res.status(404).json({ message: `Material ID ${material} not found` });
            }

            materialEntities.push(materialEntity);
        }
        newBook.materials = materialEntities;
    }

    if (fields.locations) {
        const locationRepository = getRepository(Location);
        const locationEntities = [];

        for (const location of fields.locations) {
            const locationEntity = await locationRepository.findOne({ where: { id: location } });

            if (!locationEntity) {
                return res.status(404).json({ message: `Location ID ${location} not found` });
            }

            locationEntities.push(locationEntity);
        }
        newBook.locations = locationEntities;
    }

    if (fields.rivers) {
        const riverRepository = getRepository(River);
        const riverEntities = [];

        for (const river of fields.rivers) {
            const riverEntity = await riverRepository.findOne({ where: { id: river } });

            if (!riverEntity) {
                return res.status(404).json({ message: `River ID ${riverEntity} not found` });
            }

            riverEntities.push(riverEntity);
        }
        newBook.rivers = riverEntities;
    }

    const result = await booksRepository.save(newBook);
    res.status(201).json(result);
};

// Update a Book by id
export const updateBook = async (req: Request, res: Response) => {
    const { id } = req.params;
    const fields = extractFieldsFromRequest(req);
    const booksRepository = getRepository(Book);

    const idNumber = Number(id);

    const bookToUpdate = await booksRepository.findOne({ where: { id: idNumber } });

    if (!bookToUpdate) {
        return res.status(404).json({ message: 'Book not found' });
    }

    if (fields.bookName) bookToUpdate.bookName = fields.bookName;

    if (fields.author) {
        const authorsRepository = getRepository(Character);
        const authorEntity = await authorsRepository.findOne({ where: { id: fields.author } });

        if (!authorEntity) {
            return res.status(404).json({ message: `Author ${fields.author} not found` });
        }
        bookToUpdate.author = authorEntity;
    }

    if (fields.historicalEvents) {
        const historicalEventRepository = getRepository(HistoricalEvent);
        const historicalEventEntities = [];

        for (const historicalEvent of fields.historicalEvents) {
            const historicalEventEntity = await historicalEventRepository.findOne({ where: { id: historicalEvent } });

            if (!historicalEventEntity) {
                return res.status(404).json({ message: `Event ID ${historicalEvent} not found` });
            }
            historicalEventEntities.push(historicalEventEntity);
        }
        bookToUpdate.historicalEvents = historicalEventEntities;
    }

    if (fields.materials) {
        const materialRepository = getRepository(Material);
        const materialEntities = [];

        for (const material of fields.materials) {
            const materialEntity = await materialRepository.findOne({ where: { id: material } });

            if (!materialEntity) {
                return res.status(404).json({ message: `Material ID ${material} not found` });
            }

            materialEntities.push(materialEntity);
        }
        bookToUpdate.materials = materialEntities;
    }

    if (fields.locations) {
        const locationRepository = getRepository(Location);
        const locationEntities = [];

        for (const location of fields.locations) {
            const locationEntity = await locationRepository.findOne({ where: { id: location } });

            if (!locationEntity) {
                return res.status(404).json({ message: `Location ID ${location} not found` });
            }

            locationEntities.push(locationEntity);
        }
        bookToUpdate.locations = locationEntities;
    }

    if (fields.rivers) {
        const riverRepository = getRepository(River);
        const riverEntities = [];

        for (const river of fields.rivers) {
            const riverEntity = await riverRepository.findOne({ where: { id: river } });

            if (!riverEntity) {
                return res.status(404).json({ message: `River ID ${river} not found` });
            }

            riverEntities.push(riverEntity);
        }
        bookToUpdate.rivers = riverEntities;
    }

    const updatedBook = await booksRepository.save(bookToUpdate);

    res.status(200).json(updatedBook);
};

// Delete a Book by id
export const deleteBook = async (req: Request, res: Response) => {
    const { id } = req.params;
    const booksRepository = getRepository(Book);

    const idNumber = Number(id);
    const bookToDelete = await booksRepository.findOne({ where: { id: idNumber } });

    if (!bookToDelete) {
        return res.status(404).json({ message: 'Book not found' });
    }

    await booksRepository.remove(bookToDelete);
    res.status(204).send();
};






