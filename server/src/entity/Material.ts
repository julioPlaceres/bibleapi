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

    @Column({ type: "varchar", nullable: true })
    name: string;

    @Column({ type: "varchar", nullable: true })
    description: string;

    @Column({ type: "varchar", nullable: true })
    image: string;

    @ManyToMany(() => Location, (locations) => locations.materials)
    @JoinTable()
    locations: Location[];

    @ManyToMany(() => Book, (book) => book.materials)
    @JoinTable()
    books: Book[];
}
