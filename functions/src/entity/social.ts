import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Social {
    @PrimaryColumn({ type: String })
    uuid: String;

    @PrimaryColumn({ type: String })
    uid: String;

    @PrimaryColumn({ type: String })
    name: string;

    @Column({ type: String })
    url: URL;
}
