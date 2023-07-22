import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Book } from '../entity/Book';
import { Character } from '../entity/Character';
import { HistoricalEvent } from '../entity/HistoricalEvent';
import { Location } from '../entity/Location';
import { Material } from '../entity/Material';
import { River } from '../entity/River';

const joinRelations = ['author', 'historicalEvents', 'materials', 'locations', 'rivers'];

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
        return res.status(400).json({ message: 'Invalid book id' });
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
    const { name, author, historicalEvent, material, location, river } = req.body;

    // Required fields
    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }

    const newBook = new Book();
    newBook.name = name;

    if (author) {
        const charactersRepository = getRepository(Character);
        const authorEntity = await charactersRepository.findOne(author);

        if (!authorEntity) {
            return res.status(404).json({ message: 'Author not found' });
        }

        newBook.author = authorEntity;
    }

    // Optional fields
    if (historicalEvent) {
        const historicalEventRepository = getRepository(HistoricalEvent);
        const historicalEventEntities = await historicalEventRepository.findByIds(historicalEvent);

        if (!historicalEventEntities) {
            return res.status(404).json({ message: 'Event not found' });
        }
        newBook.historicalEvents = historicalEventEntities;
    }

    if (material) {
        const materialRepository = getRepository(Material);
        const materialEntities = await materialRepository.findByIds(material);

        if (!materialEntities) {
            return res.status(404).json({ message: 'Material not found' });
        }
        newBook.materials = materialEntities;
    }

    if (location) {
        const locationRepository = getRepository(Location);
        const locationEntities = await locationRepository.findByIds(location);

        if (!locationEntities) {
            return res.status(404).json({ message: 'Location not found' });
        }
        newBook.locations = locationEntities;
    }

    if (river) {
        const riverRepository = getRepository(River);
        const riverEntities = await riverRepository.findByIds(river);

        if (!riverEntities) {
            return res.status(404).json({ message: 'River not found' });
        }
        newBook.rivers = riverEntities;
    }

    const result = await booksRepository.save(newBook);
    res.status(201).json(result);
};

// Update a Book by id
export const updateBook = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, author, historicalEvent, material, location, river } = req.body;
    const booksRepository = getRepository(Book);

    const idNumber = Number(id);

    const bookToUpdate = await booksRepository.findOne({ where: { id: idNumber } });

    if (!bookToUpdate) {
        return res.status(404).json({ message: 'Book not found' });
    }

    if (name) bookToUpdate.name = name;

    if (author) {
        const authorsRepository = getRepository(Character);
        const authorEntity = await authorsRepository.findOne(author);

        if (!authorEntity) {
            return res.status(404).json({ message: 'Author not found' });
        }
        bookToUpdate.author = authorEntity;
    }

    if (historicalEvent) {
        const historicalEventRepository = getRepository(HistoricalEvent);
        const historicalEventEntities = await historicalEventRepository.findByIds(historicalEvent);

        if (!historicalEventEntities) {
            return res.status(404).json({ message: 'Event not found' });
        }
        bookToUpdate.historicalEvents = historicalEventEntities;
    }

    if (material) {
        const materialRepository = getRepository(Material);
        const materialEntities = await materialRepository.findByIds(material);

        if (!materialEntities) {
            return res.status(404).json({ message: 'Material not found' });
        }
        bookToUpdate.materials = materialEntities;
    }

    if (location) {
        const locationRepository = getRepository(Location);
        const locationEntities = await locationRepository.findByIds(location);

        if (!locationEntities) {
            return res.status(404).json({ message: 'Location not found' });
        }
        bookToUpdate.locations = locationEntities;
    }

    if (river) {
        const riverRepository = getRepository(River);
        const riverEntities = await riverRepository.findByIds(river);

        if (!riverEntities) {
            return res.status(404).json({ message: 'River not found' });
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






