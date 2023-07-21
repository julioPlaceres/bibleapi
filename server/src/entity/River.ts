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

    @Column({ type: "varchar" })
    name: string;

    @Column({ type: "varchar" })
    description: string;

    @Column({ type: "varchar" })
    image: string;

    @ManyToMany(() => Location, (locations) => locations.rivers)
    @JoinTable()
    locations: Location[];

    @ManyToMany(() => Book, (book) => book.rivers)
    @JoinTable()
    books: Book[];
}
