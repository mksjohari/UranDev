import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Tools {
	@PrimaryColumn({ type: String })
	uuid: String;

	@PrimaryColumn({ type: String })
	uid: String;

	@PrimaryColumn({ type: String })
	tool: String;

	@Column({ type: String })
	created: String;
}
