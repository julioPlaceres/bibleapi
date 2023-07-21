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

    @Column({ type: "varchar" })
    name: string;

    @Column({ type: "varchar" })
    description: string;

    @ManyToMany(() => Location, (locations) => locations.materials)
    @JoinTable()
    sources: Location[];

    @Column({ type: "varchar" })
    image: string;

    @ManyToMany(() => Book, (book) => book.materials)
    @JoinTable()
    books: Book[];
}
