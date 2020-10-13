import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';
import { StatusType, Users } from './entity/users';
import { Seeker } from './entity/seeker';
import { Social } from './entity/social';
import { Expertise } from './entity/expertise';
import { getSocials, getExpertise } from './helperFunction';

admin.initializeApp();

const connect = async () => {
	return await createConnection({
		type: 'mysql',
		host: functions.config().cloudsql.host,
		port: functions.config().cloudsql.port,
		username: functions.config().cloudsql.user,
		password: functions.config().cloudsql.pass,
		database: functions.config().cloudsql.database,
		entities: [Users, Seeker, Social, Expertise],
		synchronize: true,
	});
};
let connection: Connection;

export const createAccount = functions
	.region('australia-southeast1')
	.https.onCall(async (data, context) => {
		try {
			const user = new Users();
			if (!connection || !connection.isConnected) {
				connection = await connect();
			}
			user.uid = data.uid;
			user.firstName = data.firstName;
			user.lastName = data.lastName;
			user.email = data.email;
			await connection.manager.save(user);
			console.log('user has been saved. user id is', user.uid);
			return `Successfully added ${user.uid}`;
		} catch (err) {
			console.log(err);
			return `Error occurred adding user`;
		}
	});

export const checkUserExists = functions
	.region('australia-southeast1')
	.https.onCall(async (data, context) => {
		try {
			const uid = data.uid;
			if (!connection || !connection.isConnected) {
				connection = await connect();
			}
			const result = await connection.query(
				`SELECT * FROM users WHERE uid='${uid}';`
			);
			if (result.length > 0) return [true, result[0].status];
			return [false, 'incomplete'];
		} catch (err) {
			console.log(err);
			return [false, 'incomplete'];
		}
	});

export const getBasicUser = functions
	.region('australia-southeast1')
	.https.onCall(async (data, context) => {
		try {
			const uid = data.uid;
			if (!connection || !connection.isConnected) {
				connection = await connect();
			}
			const result = await connection.query(
				`SELECT * FROM users WHERE uid='${uid}';`
			);
			return result;
		} catch (err) {
			console.log(err);
		}
	});

export const finishUserSignUp = functions
	.region('australia-southeast1')
	.https.onCall(async (data, context) => {
		try {
			if (!connection || !connection.isConnected) {
				connection = await connect();
			}
			const firstStep = data.firstStep;
			const secondStep = data.secondStep;
			const thirdStep = data.thirdStep;
			const seeker = new Seeker();
			const expertise = getExpertise(data.uid, secondStep);
			const socials = getSocials(data.uid, thirdStep);
			seeker.uid = data.uid;
			seeker.photo = data.photoURL;
			seeker.location = secondStep.location;
			seeker.occupation = secondStep.occupation;
			await connection.manager.update(Users, seeker.uid, {
				firstName: firstStep.firstName,
				lastName: firstStep.lastName,
				status: StatusType.UNVERIFIED,
			});
			await connection.manager.save(Expertise, expertise);
			await connection.manager.save(Social, socials);
			await connection.manager.save(seeker);
			return;
		} catch (err) {
			console.log(err);
			return;
		}
	});
