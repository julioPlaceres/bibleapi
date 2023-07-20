import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { Character } from './Character';
import { HistoricalEvent } from './HistoricalEvent';
import { Location } from './Location';
import { Material } from './Material';
import { River } from './River';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Character, character => character.booksWritten)
  author: Character;

  @ManyToMany(() => HistoricalEvent, (historicalEvents) => historicalEvents.bookReferences)
  historicalEvents: HistoricalEvent[];

  @ManyToMany(() => Material, (material) => material.books)
  materials: Material[];

  @ManyToMany(() => Location, (location) => location.books)
  locations: Location[];

  @ManyToMany(() => River, (river) => river.books)
  rivers: River[];
}
