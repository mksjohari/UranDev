import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Social {
	@PrimaryGeneratedColumn('uuid')
	sid: string;

	@Column({ type: String })
	uid: String;

	@Column({ type: String })
	name: string;

	@Column({ type: String })
	url: URL;
}
