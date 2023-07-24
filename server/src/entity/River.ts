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

    @Column({ type: "varchar", nullable: true })
    description: string;

    @Column({ type: "varchar", nullable: true })
    image: string;

    @ManyToMany(() => Location, (locations) => locations.rivers)
    @JoinTable()
    locations: Location[];

    @ManyToMany(() => Book, (book) => book.rivers)
    @JoinTable()
    books: Book[];
}
