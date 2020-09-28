import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// import * as mysql from 'promise-mysql';

import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';
import { User, UserType } from './entity/user';

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

export const testCall = functions
	.region('australia-southeast1')
	.https.onCall(async (data, context) => {
		try {
			const user = new User();
			if (!connection || !connection.isConnected) {
				connection = await connect();
			}
			user.uid = '2';
			user.firstName = 'Khairi';
			user.lastName = 'Johari';
			user.email = 'Uran@Uran.com';
			user.photoUrl =
				'https://scontent.fmel5-1.fna.fbcdn.net/v/t1.0-1/cp0/p60x60/117968907_3230294453683475_1839075413000905669_n.jpg?_nc_cat=109&_nc_sid=7206a8&_nc_ohc=NJee0EYZINkAX_0DXuS&_nc_ht=scontent.fmel5-1.fna&_nc_tp=27&oh=4d63d0b1c0dfc32149d67cf1b2e3465c&oe=5F90595A';
			user.userType = UserType.MANAGER;
			await connection.manager.save(user);
			console.log('user has been saved. user id is', user.uid);
			return `Successfully added ${user.uid}`;
		} catch (err) {
			console.log(err);
			return `Error occurred adding user`;
		}
	});

export const getUser = functions
	.region('australia-southeast1')
	.https.onCall(async (data, context) => {
		console.log('data', data);
		try {
			const uid = data.uid;
			if (!connection || !connection.isConnected) {
				connection = await connect();
			}
			const result = connection.query(
				`SELECT * FROM user WHERE UID=${uid};`
			);
			return result;
		} catch (err) {
			console.log(err);
		}
	});
