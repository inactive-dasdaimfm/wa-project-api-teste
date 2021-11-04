import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Exam } from "./Exam";

@Entity()
export class Laboratory {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column({
        default: 'active'
    })
    status: string;

}
