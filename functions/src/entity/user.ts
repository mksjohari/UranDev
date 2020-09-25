import { Entity, Column, PrimaryColumn } from 'typeorm';

export enum UserType {
	MANAGER = 'manager',
	SEEKER = 'seeker',
}

@Entity()
export class User {
	@PrimaryColumn({ type: String })
	uid: String;

	@Column({ type: String })
	firstName: String;

	@Column({ type: String })
	lastName: String;

	@Column({ type: String })
	email: String;

	@Column({ type: String })
	photoUrl: String;

	@Column({
		type: 'enum',
		enum: UserType,
		default: UserType.SEEKER,
	})
	userType: UserType;
}
