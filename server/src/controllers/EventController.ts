import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Book } from '../entity/Book';
import { Character } from '../entity/Character';
import { HistoricalEvent } from '../entity/HistoricalEvent';
import { Location } from '../entity/Location';

// Get all
export const getEvents = async (req: Request, res: Response) => {
    const eventsRepository = getRepository(HistoricalEvent);
    const historicalEvents = await eventsRepository.find();
    res.json(historicalEvents);
};

// Get by id
export const getEvent = async (req: Request, res: Response) => {
    const { id } = req.params;
    const eventsRepository = getRepository(HistoricalEvent);

    const idNumber = Number(id);

    if (isNaN(idNumber)) {
        return res.status(400).json({ message: 'Invalid Event id' });
    }

    const historicalEvent = await eventsRepository.findOne({ where: { id: idNumber } });

    if (!historicalEvent) {
        return res.status(404).json({ message: 'Event not found' });
    }

    res.json(historicalEvent);
}

// Create
export const createEvent = async (req: Request, res: Response) => {
    const eventsRepository = getRepository(HistoricalEvent);
    const { name, dateTime, description, image, characters, locations, bookReferences } = req.body;

    // Required fields
    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }

    const newEvent = new HistoricalEvent();
    newEvent.name = name;

    // Optional fields
    if (dateTime) {
        newEvent.dateTime = dateTime;
    }

    if (description) {
        newEvent.description = description;
    }

    if (image) {
        newEvent.image = image;
    }

    if (characters) {
        const characterRepository = getRepository(Character);
        const characterEntities = [];

        for (const characterId of characters) {
            const characterEntity = await characterRepository.findOne(characterId);

            if (!characterEntity) {
                return res.status(404).json({ message: `Character ID ${characterId} not found` });
            }

            characterEntities.push(characterEntity);
        }

        newEvent.characters = characterEntities;
    }

    if (locations) {
        const locationRepository = getRepository(Location);
        const locationEntities = [];

        for (const locationId of locations) {
            const locationEntity = await locationRepository.findOne(locationId);

            if (!locationEntity) {
                return res.status(404).json({ message: `Location ID ${locationId} not found` });
            }

            locationEntities.push(locationEntity);
        }

        newEvent.locations = locationEntities;
    }

    if (bookReferences) {
        const bookRepository = getRepository(Book);
        const bookEntities = [];

        for (const bookId of bookReferences) {
            const bookEntity = await bookRepository.findOne({ where: { id: bookId } });

            if (!bookEntity) {
                return res.status(404).json({ message: `Book ID ${bookId} not found` });
            }

            bookEntities.push(bookEntity);
        }

        newEvent.bookReferences = bookEntities;
    }

    const result = await eventsRepository.save(newEvent);
    res.status(201).json(result);
};

// Update
export const updateEvent = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, dateTime, description, image, characters, locations, bookReferences } = req.body;
    const eventRepository = getRepository(HistoricalEvent);

    const idNumber = Number(id);

    const eventToUpdate = await eventRepository.findOne({ where: { id: idNumber } });

    if (!eventToUpdate) {
        return res.status(404).json({ message: 'Event not found' });
    }

    if (name) eventToUpdate.name = name;
    if (dateTime) eventToUpdate.dateTime = dateTime;
    if (description) eventToUpdate.description = description;
    if (image) eventToUpdate.image = image;

    if (characters) {
        const characterRepository = getRepository(Character);
        const characterEntities = [];

        for (const characterId of characters) {
            const characterEntity = await characterRepository.findOne(characterId);

            if (!characterEntity) {
                return res.status(404).json({ message: `Character id ${characterId} not found` });
            }
            characterEntities.push(characterEntity);
        }
        eventToUpdate.characters = characterEntities;
    }

    if (locations) {
        const locationRepository = getRepository(Location);
        const locationEntities = [];

        for (const locationId of locations) {
            const locationEntity = await locationRepository.findOne(locationId);

            if (!locationEntity) {
                return res.status(404).json({ message: `Location id ${locationId} not found` });
            }
            locationEntities.push(locationEntity);
        }
        eventToUpdate.locations = locationEntities;
    }

    if (bookReferences) {
        const bookRepository = getRepository(Book);
        const bookEntities = [];

        for (const bookId of bookReferences) {
            const bookEntity = await bookRepository.findOne(bookId);

            if (!bookEntity) {
                return res.status(404).json({ message: `Book id ${bookId} not found` });
            }
            bookEntities.push(bookEntity);
        }
        eventToUpdate.bookReferences = bookEntities;
    }



    const updatedEvent = await eventRepository.save(eventToUpdate);

    res.status(200).json(updatedEvent);
};

// Delete
export const deleteEvent = async (req: Request, res: Response) => {
    const { id } = req.params;
    const eventRepository = getRepository(HistoricalEvent);

    const idNumber = Number(id);
    const eventToDelete = await eventRepository.findOne({ where: { id: idNumber } });

    if (!eventToDelete) {
        return res.status(404).json({ message: 'Event not found' });
    }

    await eventRepository.remove(eventToDelete);
    res.status(204).send();
};






