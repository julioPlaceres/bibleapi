import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  ManyToOne,
  JoinColumn,
  JoinTable
} from 'typeorm';
import { Book } from './Book';
import { HistoricalEvent } from './HistoricalEvent';

@Entity()
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  gender: string;

  @Column()
  yearsLived: string;

  @Column()
  role: string;

  @Column()
  nameMeaning: string;

  @Column()
  married: boolean;

  @Column()
  image: string;

  @Column()
  otherNames: string;

  @Column({ nullable: true })
  fatherId: number;

  @ManyToOne(() => Character)
  @JoinColumn({ name: "fatherId" })
  father: Character;

  @OneToMany(() => Character, character => character.father)
  childrenFromFather: Character[];

  @Column({ nullable: true })
  motherId: number;

  @ManyToOne(() => Character)
  @JoinColumn({ name: "motherId" })
  mother: Character;

  @OneToMany(() => Character, character => character.mother)
  childrenFromMother: Character[];

  @ManyToMany(() => Character)
  @JoinTable()
  siblings: Character[];

  @Column({ nullable: true })
  spouseId: number;

  @ManyToOne(() => Character, character => character.spouse)
  @JoinColumn({ name: "spouseId" })
  spouse: Character;

  @OneToMany(() => Character, character => character.spouse)
  spouseOf: Character[];

  @ManyToMany(() => HistoricalEvent, historicalEvents => historicalEvents.characters)
  historicalEvents: HistoricalEvent[];

  @OneToMany(() => Book, book => book.author)
  booksWritten: Book[];
}
