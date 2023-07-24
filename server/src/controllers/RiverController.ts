import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Book } from '../entity/Book';
import { Location } from '../entity/Location';
import { River } from '../entity/River';

const joinRelations = ['locations', 'books'];

const extractFieldsFromRequest = (req: Request) => {
    const { name, description, image, locations, books } = req.body;
    return { name, description, image, locations, books };
}

// Get all
export const getRivers = async (req: Request, res: Response) => {
    const riverRepository = getRepository(River);
    const rivers = await riverRepository.find({ relations: joinRelations });
    res.json(rivers);
};

// Get by id
export const getRiver = async (req: Request, res: Response) => {
    const { id } = req.params;
    const riverRepository = getRepository(River);

    const idNumber = Number(id);

    if (isNaN(idNumber)) {
        return res.status(400).json({ message: 'Invalid River id' });
    }

    const river = await riverRepository.findOne({ where: { id: idNumber }, relations: joinRelations });

    if (!river) {
        return res.status(404).json({ message: 'River not found' });
    }

    res.json(river);
}

// Create
export const createRiver = async (req: Request, res: Response) => {
    const riverRepository = getRepository(River);
    const fields = extractFieldsFromRequest(req);

    // Required fields
    if (!fields.name) {
        return res.status(400).json({ message: 'Name is required' });
    }

    const newRiver = new River();
    newRiver.name = fields.name;

    // Optional fields
    if (fields.description) {
        newRiver.description = fields.description;
    }

    if (fields.image) {
        newRiver.image = fields.image;
    }

    if (fields.locations) {
        const locationRepository = getRepository(Location);
        const locationEntities = [];

        for (const locationId of fields.locations) {
            const locationEntity = await locationRepository.findOne({ where: { id: locationId } });

            if (!locationEntity) {
                return res.status(404).json({ message: `Location ID ${locationId} not found` });
            }

            locationEntities.push(locationEntity);
        }

        newRiver.locations = fields.locations;
    }

    if (fields.books) {
        const bookRepository = getRepository(Book);
        const bookEntities = [];

        for (const bookId of fields.books) {
            const bookEntity = await bookRepository.findOne({ where: { id: bookId } });

            if (!bookEntity) {
                return res.status(404).json({ message: `Book ID ${bookId} not found` });
            }

            bookEntities.push(bookEntity);
        }

        newRiver.books = bookEntities;
    }

    const result = await riverRepository.save(newRiver);
    res.status(201).json(result);
};

// Update
export const updateRiver = async (req: Request, res: Response) => {
    const { id } = req.params;
    const fields = extractFieldsFromRequest(req);

    const riverRepository = getRepository(River);

    const idNumber = Number(id);

    const riverToUpdate = await riverRepository.findOne({ where: { id: idNumber } });

    if (!riverToUpdate) {
        return res.status(404).json({ message: 'River not found' });
    }

    if (fields.name) riverToUpdate.name = fields.name;
    if (fields.description) riverToUpdate.description = fields.description;
    if (fields.image) riverToUpdate.image = fields.image;

    if (fields.locations) {
        const locationRepository = getRepository(Location);
        const locationEntities = [];

        for (const locationId of fields.locations) {
            const locationEntity = await locationRepository.findOne({ where: { id: locationId } });

            if (!locationEntity) {
                return res.status(404).json({ message: `Location id ${locationId} not found` });
            }
            locationEntities.push(locationEntity);
        }
        riverToUpdate.locations = locationEntities;
    }

    if (fields.books) {
        const bookRepository = getRepository(Book);
        const bookEntities = [];

        for (const bookId of fields.books) {
            const bookEntity = await bookRepository.findOne({ where: { id: bookId } });

            if (!bookEntity) {
                return res.status(404).json({ message: `Book id ${bookId} not found` });
            }
            bookEntities.push(bookEntity);
        }
        riverToUpdate.books = fields.books;
    }

    const updatedRiver = await riverRepository.save(riverToUpdate);

    res.status(200).json(updatedRiver);
};

// Delete
export const deleteRiver = async (req: Request, res: Response) => {
    const { id } = req.params;
    const riverRepository = getRepository(River);

    const idNumber = Number(id);
    const riverToDelete = await riverRepository.findOne({ where: { id: idNumber } });

    if (!riverToDelete) {
        return res.status(404).json({ message: 'River not found' });
    }

    await riverRepository.remove(riverToDelete);
    res.status(204).send();
};






