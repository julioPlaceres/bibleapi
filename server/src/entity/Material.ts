import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
} from "typeorm";
import { Location } from "./Location";
import { Book } from "./Book";

@Entity()
export class Material {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToMany(() => Location, (locations) => locations.materials)
    @JoinTable()
    sources: Location[];

    @Column()
    image: string;

    @ManyToMany(() => Book, (book) => book.materials)
    @JoinTable()
    books: Book[];
}
