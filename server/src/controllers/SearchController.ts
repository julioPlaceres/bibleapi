import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Book } from '../entity/Book';
import { Character } from '../entity/Character';
import { HistoricalEvent } from '../entity/HistoricalEvent';
import { Location } from '../entity/Location';
// import { Material } from '../entity/Material';
// import { River } from '../entity/River';

const joinRelations = ['author', 'historicalEvents', 'materials', 'locations', 'rivers'];

export const searchEntities = async (req: Request, res: Response) => {
    type Filter = {
        fieldType: string;
        fieldValue: string;
    };

    type ReqBody = {
        entityType: 'Book' | 'Character' | 'HistoricalEvent' | 'Location';
        filters: Filter[];
    };

    const { entityType, filters } = req.body as ReqBody;

    let repository;
    switch (entityType) {
        case 'Book':
            repository = getRepository(Book);
            break;
        case 'Character':
            repository = getRepository(Character);
            break;
        case 'HistoricalEvent':
            repository = getRepository(HistoricalEvent);
            break;
        case 'Location':
            repository = getRepository(Location);
            break;
    }

    let query: { [key: string]: any } = {};

    if (filters && Array.isArray(filters)) {
        // console.log(filters);

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