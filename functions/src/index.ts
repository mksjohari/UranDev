import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// import * as mysql from 'promise-mysql';

import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';
import { User } from './entity/user';

admin.initializeApp();

const connect = async () => {
	return await createConnection({
		type: 'mysql',
		host: functions.config().cloudsql.host,
		port: functions.config().cloudsql.port,
		username: functions.config().cloudsql.user,
		password: functions.config().cloudsql.pass,
		database: functions.config().cloudsql.database,
		entities: [User],
		synchronize: true,
	});
};
let connection: Connection;

export const createAccount = functions
	.region('australia-southeast1')
	.https.onCall(async (data, context) => {
		try {
			const user = new User();
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
				`SELECT uid FROM user WHERE uid='${uid}';`
			);
			if (result.length > 0) return true;
			return false;
		} catch (err) {
			console.log(err);
			return false;
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
				`SELECT * FROM user WHERE uid='${uid}';`
			);
			return result;
		} catch (err) {
			console.log(err);
		}
	});
