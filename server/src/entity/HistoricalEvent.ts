import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Character } from './Character';
import { Book } from './Book';
import { Location } from './Location';
@Entity()
export class HistoricalEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  dateTime: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @ManyToMany(() => Character, (character) => character.historicalEvents)
  @JoinTable()
  characters: Character[];

  @ManyToMany(() => Location, (location) => location.historicalEvents)
  @JoinTable()
  locations: Location[];

  @ManyToMany(() => Book, (book) => book.historicalEvents)
  @JoinTable()
  bookReferences: Book[];
}
