import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Expertise {
	@PrimaryColumn({ type: String })
	uid: String;

	@PrimaryColumn({ type: String })
	eid: String;

	@Column({ type: String })
	expertise: String;
}
