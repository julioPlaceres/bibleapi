import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Book } from '../entity/Book';
import { HistoricalEvent } from '../entity/HistoricalEvent';
import { Character } from '../entity/Character';

const joinRelations = ['father', 'mother', 'childrenFromFather', 'childrenFromMother', 'siblings', 'spouse', 'spouseOf', 'historicalEvents', 'booksWritten'];

const extractFieldsFromRequest = (req: Request) => {
    const { name, gender, yearsLived, role, nameMeaning, married, image, otherNames, fatherId, motherId, siblings, spouseId, historicalEvents, booksWritten } = req.body;
    return { name, gender, yearsLived, role, nameMeaning, married, image, otherNames, fatherId, motherId, siblings, spouseId, historicalEvents, booksWritten };
}

// Get All
export const getCharacters = async (req: Request, res: Response) => {
    const characterRepository = getRepository(Character);
    const characters = await characterRepository.find({ relations: joinRelations });
    res.json(characters);
};

// Get By ID
export const getCharacter = async (req: Request, res: Response) => {
    const { id } = req.params;
    const characterRepository = getRepository(Character);

    const idNumber = Number(id);

    if (isNaN(idNumber)) {
        return res.status(400).json({ message: 'Invalid Character id' });
    }

    const character = await characterRepository.findOne({ where: { id: idNumber }, relations: joinRelations });

    if (!character) {
        return res.status(404).json({ message: 'Character not found' });
    }

    res.json(character);
}

// Create
export const createCharacter = async (req: Request, res: Response) => {
    const characterRepository = getRepository(Character);
    const fields = extractFieldsFromRequest(req);

    // Required fields
    if (!fields.name) {
        return res.status(400).json({ message: 'Name is required' });
    }

    const newCharacter = new Character();
    newCharacter.name = fields.name;

    // Optional fields
    if (fields.gender) {
        newCharacter.gender = fields.gender;
    }

    if (fields.yearsLived) {
        newCharacter.yearsLived = fields.yearsLived;
    }

    if (fields.role) {
        newCharacter.role = fields.role;
    }

    if (fields.nameMeaning) {
        newCharacter.nameMeaning = fields.nameMeaning;
    }

    if (fields.married) {
        newCharacter.married = fields.married;
    }

    if (fields.image) {
        newCharacter.image = fields.image;
    }

    if (fields.otherNames) {
        newCharacter.otherNames = fields.otherNames;
    }

    if (fields.fatherId) {
        const fatherCharacter = await characterRepository.findOne({ where: { id: fields.fatherId } });
        if (!fatherCharacter) {
            return res.status(404).json({ message: `Father character ID ${fields.fatherId} not found` });
        }
        newCharacter.father = fatherCharacter;
    }

    if (fields.motherId) {
        const motherCharacter = await characterRepository.findOne({ where: { id: fields.motherId } });
        if (!motherCharacter) {
            return res.status(404).json({ message: `Mother character ID ${fields.motherId} not found` });
        }
        newCharacter.mother = motherCharacter;
    }

    if (fields.siblings) {
        const siblingRepository = getRepository(Character);
        const siblingEntities = [];

        for (const siblingId of fields.siblings) {
            const siblingEntity = await siblingRepository.findOne({ where: { id: siblingId } });

            if (!siblingEntity) {
                return res.status(404).json({ message: `Sibling ID ${siblingId} not found` });
            }

            siblingEntities.push(siblingEntity);
        }

        newCharacter.siblings = siblingEntities;
    }

    if (fields.spouseId) {
        const spouseCharacter = await characterRepository.findOne({ where: { id: fields.spouseId } });
        if (!spouseCharacter) {
            return res.status(404).json({ message: `Spouse character ID ${fields.spouseId} not found` });
        }
        newCharacter.spouse = spouseCharacter;
    }

    if (fields.historicalEvents) {
        const eventRepository = getRepository(HistoricalEvent);
        const eventEntities = [];

        for (const eventId of fields.historicalEvents) {
            const eventEntity = await eventRepository.findOne({ where: { id: eventId } });

            if (!eventEntity) {
                return res.status(404).json({ message: `Event ID ${eventId} not found` });
            }

            eventEntities.push(eventEntity);
        }

        newCharacter.historicalEvents = fields.historicalEvents;
    }

    if (fields.booksWritten) {
        const bookRepository = getRepository(Book);
        const bookEntities = [];

        for (const bookId of fields.booksWritten) {
            const bookEntity = await bookRepository.findOne({ where: { id: bookId } });

            if (!bookEntity) {
                return res.status(404).json({ message: `Book ID ${bookId} not found` });
            }

            bookEntities.push(bookEntity);
        }

        newCharacter.booksWritten = bookEntities;
    }

    const result = await characterRepository.save(newCharacter);
    res.status(201).json(result);
};

// Update
export const updateCharacter = async (req: Request, res: Response) => {
    const { id } = req.params;
    const fields = extractFieldsFromRequest(req);

    const characterRepository = getRepository(Character);

    const idNumber = Number(id);

    const characterToUpdate = await characterRepository.findOne({ where: { id: idNumber }, relations: ['siblings'] });

    if (!characterToUpdate) {
        return res.status(404).json({ message: 'Character not found' });
    }

    if (fields.name) characterToUpdate.name = fields.name;
    if (fields.gender) characterToUpdate.gender = fields.gender;
    if (fields.yearsLived) characterToUpdate.yearsLived = fields.yearsLived;
    if (fields.role) characterToUpdate.role = fields.role;
    if (fields.nameMeaning) characterToUpdate.nameMeaning = fields.nameMeaning;
    if (fields.married) characterToUpdate.married = fields.married;
    if (fields.image) characterToUpdate.image = fields.image;
    if (fields.otherNames) characterToUpdate.otherNames = fields.otherNames;
    if (fields.fatherId) { characterToUpdate.father = await characterRepository.findOne({ where: { id: fields.fatherId } }); }
    if (fields.motherId) { characterToUpdate.mother = await characterRepository.findOne({ where: { id: fields.motherId } }); }
    if (fields.spouseId) { characterToUpdate.spouse = await characterRepository.findOne({ where: { id: fields.spouseId } }); }

    if (fields.siblings) {
        const siblingRepository = getRepository(Character);
        let existingSiblings = characterToUpdate.siblings || [];

        for (const siblingId of fields.siblings) {
            const siblingEntity = await siblingRepository.findOne({ where: { id: siblingId } });

            if (!siblingEntity) {
                return res.status(404).json({ message: `Sibling ID ${siblingId} not found` });
            }

            existingSiblings.push(siblingEntity);
        }
        characterToUpdate.siblings = existingSiblings;
    }

    if (fields.historicalEvents) {
        const eventRepository = getRepository(HistoricalEvent);
        const eventEntities = [];

        for (const eventId of fields.historicalEvents) {
            const eventEntity = await eventRepository.findOne({ where: { id: eventId } });

            if (!eventEntity) {
                return res.status(404).json({ message: `Event ID ${eventId} not found` });
            }

            eventEntities.push(eventEntity);
        }

        characterToUpdate.historicalEvents = eventEntities;
    }

    if (fields.booksWritten) {
        const bookRepository = getRepository(Book);
        const bookEntities = [];

        for (const bookId of fields.booksWritten) {
            const bookEntity = await bookRepository.findOne({ where: { id: bookId } });

            if (!bookEntity) {
                return res.status(404).json({ message: `Book ID ${bookId} not found` });
            }

            bookEntities.push(bookEntity);
        }

        characterToUpdate.booksWritten = bookEntities;
    }

    const updatedCharacter = await characterRepository.save(characterToUpdate);

    res.status(200).json(updatedCharacter);
};

// Delete
export const deleteCharacter = async (req: Request, res: Response) => {
    const { id } = req.params;
    const characterRepository = getRepository(Character);

    const idNumber = Number(id);
    const characterToDelete = await characterRepository.findOne({ where: { id: idNumber } });

    if (!characterToDelete) {
        return res.status(404).json({ message: 'Character not found' });
    }

    await characterRepository.remove(characterToDelete);
    res.status(204).send();
};
