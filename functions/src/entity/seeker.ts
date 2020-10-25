import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Seeker {
	@PrimaryColumn({ type: String })
	uid: string;
	
	@PrimaryColumn({ type: String })
	pid: string;

	@Column({ type: String })
	photo: URL;

	@Column({ type: String, default: 'https://www.youtube.com/' })
	introduction: string;

	@Column({ type: String })
	occupation: string;

	@Column({ type: String, nullable: true, length: 1000 })
	description: string;

	@Column({ type: String })
	location: string;
}
