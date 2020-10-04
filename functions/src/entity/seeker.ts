import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Seeker {
    @PrimaryGeneratedColumn("uuid")
    jid: string;

    @Column({ type: String })
    uid: string;

    @Column({ type: String })
    photo: URL;

    @Column({ type: String })
    location: string;
}
