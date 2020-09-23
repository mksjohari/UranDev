import { Entity, Column, PrimaryColumn } from 'typeorm';

export enum UserType {
	MANAGER,
	SEEKER,
}

@Entity()
export class User {
	@PrimaryColumn({ type: String })
	uid: string;

	@Column({ type: String })
	firstName: string;

	@Column({ type: String })
	lastName: string;

	@Column({ type: String })
	email: string;

	@Column({ type: String })
	photoUrl: String;

	@Column({
		type: 'enum',
		enum: UserType,
		default: UserType.SEEKER,
	})
	userType: UserType;
}
