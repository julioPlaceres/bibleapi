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

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar", nullable: true })
  gender: string;

  @Column({ type: "varchar", nullable: true })
  yearsLived: string;

  @Column({ type: "varchar", nullable: true })
  role: string;

  @Column({ type: "varchar", nullable: true })
  nameMeaning: string;

  @Column({ type: "varchar", nullable: true })
  married: boolean;

  @Column({ type: "varchar", nullable: true })
  image: string;

  @Column({ type: "varchar", nullable: true })
  otherNames: string;

  @Column({ nullable: true, type: "number" })
  fatherId: number;

  @ManyToOne(() => Character)
  @JoinColumn({ name: "fatherId" })
  father: Character;

  @OneToMany(() => Character, character => character.father)
  childrenFromFather: Character[];

  @Column({ nullable: true, type: "number" })
  motherId: number;

  @ManyToOne(() => Character)
  @JoinColumn({ name: "motherId" })
  mother: Character;

  @OneToMany(() => Character, character => character.mother)
  childrenFromMother: Character[];

  @ManyToMany(() => Character)
  @JoinTable()
  siblings: Character[];

  @Column({ nullable: true, type: "number" })
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
