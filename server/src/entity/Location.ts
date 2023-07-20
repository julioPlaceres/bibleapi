// Location.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { Book } from './Book';
import { HistoricalEvent } from './HistoricalEvent';
import { Material } from './Material';
import { River } from './River';

@Entity()
export class Location {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    geographicalLocation: string;

    @Column()
    image: string;

    @ManyToMany(() => Material, (material) => material.sources)
    materials: Material[];

    @ManyToMany(() => River, (river) => river.locations)
    rivers: River[];

    @ManyToMany(() => HistoricalEvent, (historicalEvents) => historicalEvents.locations)
    historicalEvents: HistoricalEvent[];

    @ManyToMany(() => Book, (book) => book.locations)
    @JoinTable()
    books: Book[];
}
