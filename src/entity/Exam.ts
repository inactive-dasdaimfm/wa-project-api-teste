import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Laboratory } from "./Laboratory";

@Entity()
export class Exam {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column()
    type: string;

    @Column({
        default: 'active'
    })
    status: string;

    @Column("int", {
        array: true
    })
    laboratories: any[]
}