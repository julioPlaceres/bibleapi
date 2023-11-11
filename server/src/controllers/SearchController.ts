import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Book } from '../entity/Book';
import { Character } from '../entity/Character';
import { HistoricalEvent } from '../entity/HistoricalEvent';
import { Location } from '../entity/Location';
// import { Material } from '../entity/Material';
// import { River } from '../entity/River';

let joinRelations: string[] = [];

export const searchEntities = async (req: Request, res: Response) => {
    type Filter = {
        fieldType: string;
        fieldValue: string;
    };

    type ReqBody = {
        entityType: 'books' | 'characters' | 'historicalEvents' | 'locations';
        filters: Filter[];
    };

    const { entityType, filters } = req.body as ReqBody;

    let repository;
    switch (entityType) {
        case 'books':
            repository = getRepository(Book);
            joinRelations = ['author', 'historicalEvents', 'materials', 'locations', 'rivers'];
            break;
        case 'characters':
            repository = getRepository(Character);
            joinRelations = ['father', 'mother', 'childrenFromFather', 'childrenFromMother', 'siblings', 'spouse', 'spouseOf', 'historicalEvents', 'booksWritten']
            break;
        case 'historicalEvents':
            repository = getRepository(HistoricalEvent);
            break;
        case 'locations':
            repository = getRepository(Location);
            break;
    }

    let query: { [key: string]: any } = {};

    if (filters && Array.isArray(filters)) {
        filters.forEach(filter => {
            query[filter.fieldType] = filter.fieldValue;
        });

    } else {
        // Handle the case when filters are not provided or not an array
        res.status(400).json({ error: "Invalid filters provided. :)" });
        return;
    }

    const results = await repository.find({
        where: query, relations: joinRelations
    });

    res.json(results);
};