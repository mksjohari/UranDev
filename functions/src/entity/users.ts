import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

export enum UserType {
	NONE = 'none',
	MANAGER = 'manager',
	SEEKER = 'seeker',
}
export enum StatusType {
	INCOMPLETE = 'incomplete',
	UNVERIFIED = 'unverified',
	VERIFIED = 'verified',
}

@Entity()
export class Users {
	@PrimaryColumn({ type: String })
	uid: string;

	@Column({ type: String })
	firstName: string;

	@Column({ type: String })
	lastName: string;

	@Column({ type: String })
	email: string;

	@Column({
		type: 'enum',
		enum: UserType,
		default: UserType.NONE,
	})
	userType: UserType;

	@Column({
		type: 'enum',
		enum: StatusType,
		default: StatusType.INCOMPLETE,
	})
	status: StatusType;

	@CreateDateColumn()
	dateCreated: Date;
}
