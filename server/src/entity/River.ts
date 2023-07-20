import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable
} from "typeorm";
import { Location } from "./Location";
import { Book } from "./Book";

@Entity()
export class River {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @ManyToMany(() => Location, (locations) => locations.rivers)
    @JoinTable()
    locations: Location[];

    @ManyToMany(() => Book, (book) => book.rivers)
    @JoinTable()
    books: Book[];
}
