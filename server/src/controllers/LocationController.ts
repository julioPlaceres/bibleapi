import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Book } from '../entity/Book';
import { HistoricalEvent } from '../entity/HistoricalEvent';
import { Location } from '../entity/Location';
import { Material } from '../entity/Material';
import { River } from '../entity/River';

const joinRelations = ['materials', 'rivers', 'historicalEvents', 'books'];

// const extractFieldsFromRequest = (req: Request) => {
//     const { name, description, geographicalLocation, image, materials, rivers, historicalEvents, books } = req.body;
//     return { name, description, geographicalLocation, image, materials, rivers, historicalEvents, books };
// }

// Get all
export const getLocations = async (req: Request, res: Response) => {
    const locationsRepository = getRepository(Location);
    const locations = await locationsRepository.find({ relations: joinRelations });
    res.json(locations);
};

// Get by id
export const getLocation = async (req: Request, res: Response) => {
    const { id } = req.params;
    const locationsRepository = getRepository(Location);

    const idNumber = Number(id);

    if (isNaN(idNumber)) {
        return res.status(400).json({ message: 'Invalid Location id' });
    }

    const location = await locationsRepository.findOne({ where: { id: idNumber }, relations: joinRelations });

    if (!location) {
        return res.status(404).json({ message: 'Location not found' });
    }

    res.json(location);
}

// Create
export const createLocation = async (req: Request, res: Response) => {
    const locationsRepository = getRepository(Location);
    const { name, description, geographicalLocation, image, materials, rivers, historicalEvents, books } = req.body;

    // Required fields
    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }

    const newLocation = new Location();
    newLocation.name = name;

    // Optional fields
    if (description) {
        newLocation.description = description;
    }

    if (geographicalLocation) {
        newLocation.geographicalLocation = geographicalLocation;
    }

    if (image) {
        newLocation.image = image;
    }

    if (materials) {
        const materialRepository = getRepository(Material);
        const materialEntities = [];

        for (const materialId of materials) {
            const materialEntity = await materialRepository.findOne({ where: { id: materialId } });

            if (!materialEntity) {
                return res.status(404).json({ message: `material ID ${materialId} not found` });
            }

            materialEntities.push(materialEntity);
        }

        newLocation.materials = materialEntities;
    }


    if (rivers) {
        const riverRepository = getRepository(River);
        const riverEntities = [];

        for (const riverId of rivers) {
            const riverEntity = await riverRepository.findOne({ where: { id: riverId } });

            if (!riverEntity) {
                return res.status(404).json({ message: `river ID ${riverId} not found` });
            }

            riverEntities.push(riverEntity);
        }

        newLocation.rivers = riverEntities;
    }

    if (historicalEvents) {
        const eventRepository = getRepository(HistoricalEvent);
        const eventEntities = [];

        for (const eventId of historicalEvents) {
            const eventEntity = await eventRepository.findOne({ where: { id: eventId } });

            if (!eventEntity) {
                return res.status(404).json({ message: `Event ID ${eventId} not found` });
            }

            eventEntities.push(eventEntity);
        }

        newLocation.historicalEvents = eventEntities;
    }

    if (books) {
        const bookRepository = getRepository(Book);
        const bookEntities = [];

        for (const bookId of books) {
            const bookEntity = await bookRepository.findOne({ where: { id: bookId } });

            if (!bookEntity) {
                return res.status(404).json({ message: `Book ID ${bookId} not found` });
            }

            bookEntities.push(bookEntity);
        }

        newLocation.books = bookEntities;
    }

    const result = await locationsRepository.save(newLocation);
    res.status(201).json(result);
};

// Update
export const updateLocation = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, geographicalLocation, image, materials, rivers, historicalEvents, books } = req.body;

    const locationRepository = getRepository(Location);

    const idNumber = Number(id);

    const locationToUpdate = await locationRepository.findOne({ where: { id: idNumber } });

    if (!locationToUpdate) {
        return res.status(404).json({ message: 'Location not found' });
    }

    if (name) locationToUpdate.name = name;
    if (description) locationToUpdate.description = description;
    if (geographicalLocation) locationToUpdate.geographicalLocation = geographicalLocation;
    if (image) locationToUpdate.image = image;

    if (materials) {
        const materialRepository = getRepository(Material);
        const materialEntities = [];

        for (const materialId of materials) {
            const materialEntity = await materialRepository.findOne({ where: { id: materialId } });

            if (!materialEntity) {
                return res.status(404).json({ message: `Material id ${materialId} not found` });
            }
            materialEntities.push(materialEntity);
        }
        locationToUpdate.materials = materialEntities;
    }

    if (rivers) {
        const riverRepository = getRepository(River);
        const riverEntities = [];

        for (const riverId of rivers) {
            const riverEntity = await riverRepository.findOne({ where: { id: riverId } });

            if (!riverEntity) {
                return res.status(404).json({ message: `River id ${riverId} not found` });
            }
            riverEntities.push(riverEntity);
        }
        locationToUpdate.rivers = riverEntities;
    }

    if (historicalEvents) {
        const eventRepository = getRepository(HistoricalEvent);
        const eventEntities = [];
        for (const eventId of historicalEvents) {
            const eventEntity = await eventRepository.findOne({ where: { id: eventId } });
            if (!eventEntity) {
                return res.status(404).json({ message: `event id ${eventId} not found` });
            }
            eventEntities.push(eventEntity);
        }
        locationToUpdate.historicalEvents = eventEntities;
    }

    if (books) {
        const bookRepository = getRepository(Book);
        const bookEntities = [];

        for (const bookId of books) {
            const bookEntity = await bookRepository.findOne({ where: { id: bookId } });

            if (!bookEntity) {
                return res.status(404).json({ message: `Book id ${bookId} not found` });
            }
            bookEntities.push(bookEntity);
        }
        locationToUpdate.books = bookEntities;
    }



    const updatedLocation = await locationRepository.save(locationToUpdate);

    res.status(200).json(updatedLocation);
};

// Delete
export const deleteLocation = async (req: Request, res: Response) => {
    const { id } = req.params;
    const locationRepository = getRepository(Location);

    const idNumber = Number(id);
    const locationToDelete = await locationRepository.findOne({ where: { id: idNumber } });

    if (!locationToDelete) {
        return res.status(404).json({ message: 'Location not found' });
    }

    await locationRepository.remove(locationToDelete);
    res.status(204).send();
};






