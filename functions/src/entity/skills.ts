import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Skills {
	@PrimaryColumn({ type: String })
	uuid: String;

	@PrimaryColumn({ type: String })
	uid: String;

	@PrimaryColumn({ type: String })
	pid: String;

	@PrimaryColumn({ type: String })
	skill: String;

	@Column({ type: String })
	created: String;
}
