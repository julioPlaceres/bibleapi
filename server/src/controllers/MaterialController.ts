import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Book } from '../entity/Book';
import { Location } from '../entity/Location';
import { Material } from '../entity/Material';

const joinRelations = ['locations', 'books'];

const extractFieldsFromRequest = (req: Request) => {
    const { name, description, image, locations, books } = req.body;
    return { name, description, image, locations, books };
}

// Get all
export const getMaterials = async (req: Request, res: Response) => {
    const materialRepository = getRepository(Material);
    const materials = await materialRepository.find({ relations: joinRelations });
    res.json(materials);
};

// Get by id
export const getMaterial = async (req: Request, res: Response) => {
    const { id } = req.params;
    const materialRepository = getRepository(Material);

    const idNumber = Number(id);

    if (isNaN(idNumber)) {
        return res.status(400).json({ message: 'Invalid Material id' });
    }

    const material = await materialRepository.findOne({ where: { id: idNumber }, relations: joinRelations });

    if (!material) {
        return res.status(404).json({ message: 'Material not found' });
    }

    res.json(material);
}

// Create
export const createMaterial = async (req: Request, res: Response) => {
    const materialRepository = getRepository(Material);
    const fields = extractFieldsFromRequest(req);

    // Required fields
    if (!fields.name) {
        return res.status(400).json({ message: 'Name is required' });
    }

    const newMaterial = new Material();
    newMaterial.name = fields.name;

    // Optional fields
    if (fields.description) {
        newMaterial.description = fields.description;
    }

    if (fields.image) {
        newMaterial.image = fields.image;
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

        newMaterial.locations = fields.locations;
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

        newMaterial.books = bookEntities;
    }

    const result = await materialRepository.save(newMaterial);
    res.status(201).json(result);
};

// Update
export const updateMaterial = async (req: Request, res: Response) => {
    const { id } = req.params;
    const fields = extractFieldsFromRequest(req);

    const materialRepository = getRepository(Material);

    const idNumber = Number(id);

    const materialToUpdate = await materialRepository.findOne({ where: { id: idNumber } });

    if (!materialToUpdate) {
        return res.status(404).json({ message: 'Material not found' });
    }

    if (fields.name) materialToUpdate.name = fields.name;
    if (fields.description) materialToUpdate.description = fields.description;
    if (fields.image) materialToUpdate.image = fields.image;

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
        materialToUpdate.locations = locationEntities;
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
        materialToUpdate.books = fields.books;
    }

    const updatedMaterial = await materialRepository.save(materialToUpdate);

    res.status(200).json(updatedMaterial);
};

// Delete
export const deleteMaterial = async (req: Request, res: Response) => {
    const { id } = req.params;
    const materialRepository = getRepository(Material);

    const idNumber = Number(id);
    const materialToDelete = await materialRepository.findOne({ where: { id: idNumber } });

    if (!materialToDelete) {
        return res.status(404).json({ message: 'Material not found' });
    }

    await materialRepository.remove(materialToDelete);
    res.status(204).send();
};






