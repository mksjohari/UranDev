"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserStats = exports.finishUserSignUp = exports.addSkillsAndTools = exports.getUserExpertise = exports.getUserSocials = exports.getExploreCount = exports.getExploreUsers = exports.getPublicInfo = exports.getUserInfo = exports.checkUserExists = exports.createAccount = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const typeorm_1 = require("typeorm");
const users_1 = require("./entity/users");
const seeker_1 = require("./entity/seeker");
const expertise_1 = require("./entity/expertise");
const helperFunction_1 = require("./helperFunction");
require("reflect-metadata");
const skills_1 = require("./entity/skills");
const tools_1 = require("./entity/tools");
admin.initializeApp();
const db = admin.firestore();
const connect = async () => {
    return await typeorm_1.createConnection({
        type: 'mysql',
        host: functions.config().cloudsql.host,
        port: functions.config().cloudsql.port,
        username: functions.config().cloudsql.user,
        password: functions.config().cloudsql.pass,
        database: functions.config().cloudsql.database,
        entities: [users_1.Users, seeker_1.Seeker, skills_1.Skills, tools_1.Tools, expertise_1.Expertise],
        synchronize: true,
    });
};
let connection;
exports.createAccount = functions
    .region('australia-southeast1')
    .https.onCall(async (data, context) => {
    try {
        const user = new users_1.Users();
        if (!connection || !connection.isConnected) {
            connection = await connect();
        }
        user.uuid = data.uuid;
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.email = data.email;
        user.dateCreated = new Date().getTime().toString();
        await connection.manager.save(users_1.Users, user);
        console.log('user has been saved. user id is', user.uuid);
        return `Successfully added ${user.uuid}`;
    }
    catch (err) {
        console.log(err);
        return `Error occurred adding user`;
    }
});
exports.checkUserExists = functions
    .region('australia-southeast1')
    .https.onCall(async (data, context) => {
    try {
        const uuid = data.uuid;
        if (!connection || !connection.isConnected) {
            connection = await connect();
        }
        const result = await connection.query(`SELECT * FROM users WHERE uuid='${uuid}';`);
        if (result.length > 0)
            return [true, result[0]];
        return [false, 'incomplete'];
    }
    catch (err) {
        console.log(err);
        return [false, 'incomplete'];
    }
});
exports.getUserInfo = functions
    .region('australia-southeast1')
    .https.onCall(async (data, context) => {
    try {
        const uuid = data.uuid;
        if (!connection || !connection.isConnected) {
            connection = await connect();
        }
        const result = await connection.query(`SELECT * FROM users inner join seeker on users.uuid = seeker.uuid where users.uuid = '${uuid}';`);
        return result[0];
    }
    catch (err) {
        console.log(err);
    }
});
exports.getPublicInfo = functions
    .region('australia-southeast1')
    .https.onCall(async (data, context) => {
    try {
        const uuid = data.uuid;
        const uid = data.uid;
        if (!connection || !connection.isConnected) {
            connection = await connect();
        }
        var result;
        if (uuid !== undefined) {
            result = await connection.query(`SELECT * FROM users inner join seeker on users.uuid = seeker.uuid where seeker.uuid = '${uuid}';`);
        }
        else {
            result = await connection.query(`SELECT * FROM users inner join seeker on users.uuid = seeker.uuid where seeker.uid = '${uid}';`);
        }
        return result[0];
    }
    catch (err) {
        console.log(err);
    }
});
exports.getExploreUsers = functions
    .region('australia-southeast1')
    .https.onCall(async (data, context) => {
    const limit = data.limit;
    const offset = data.page * limit - limit;
    try {
        if (!connection || !connection.isConnected) {
            connection = await connect();
        }
        const result = await connection.query(`SELECT * FROM users inner join seeker on users.uuid = seeker.uuid limit ${limit} offset ${offset}`);
        return result;
    }
    catch (err) {
        console.log(err);
    }
});
exports.getExploreCount = functions
    .region('australia-southeast1')
    .https.onCall(async (data, context) => {
    try {
        if (!connection || !connection.isConnected) {
            connection = await connect();
        }
        const result = await connection.query(`SELECT COUNT(*) FROM users inner join seeker on users.uuid = seeker.uuid`);
        return result[0]['COUNT(*)'];
    }
    catch (err) {
        console.log(err);
    }
});
exports.getUserSocials = functions
    .region('australia-southeast1')
    .https.onCall(async (data, context) => {
    try {
        const uuid = data.uuid;
        const uid = data.uid;
        var whereLeft;
        var whereRight;
        if (!connection || !connection.isConnected) {
            connection = await connect();
        }
        if (uuid !== null) {
            whereLeft = 'uuid';
            whereRight = uuid;
        }
        else {
            whereLeft = 'uid';
            whereRight = uid;
        }
        const result = await connection.query(`SELECT uid, name, url FROM social where ${whereLeft} = '${whereRight}';`);
        return result;
    }
    catch (err) {
        console.log(err);
    }
});
exports.getUserExpertise = functions
    .region('australia-southeast1')
    .https.onCall(async (data, context) => {
    try {
        const uuid = data.uuid;
        const uid = data.uid;
        var whereLeft;
        var whereRight;
        if (!connection || !connection.isConnected) {
            connection = await connect();
        }
        if (uuid !== null) {
            whereLeft = 'uuid';
            whereRight = uuid;
        }
        else {
            whereLeft = 'uid';
            whereRight = uid;
        }
        const result = await connection.query(`SELECT uid, eid, expertise FROM expertise where ${whereLeft} = '${whereRight}';`);
        return result;
    }
    catch (err) {
        console.log(err);
    }
});
exports.addSkillsAndTools = functions
    .region('australia-southeast1')
    .https.onCall(async (data, context) => {
    try {
        if (!connection || !connection.isConnected) {
            connection = await connect();
        }
        const skills = data.skills;
        const tools = data.tools;
        await connection.manager.save(skills_1.Skills, skills);
        await connection.manager.save(tools_1.Tools, tools);
        return;
    }
    catch (err) {
        console.log(err);
        return;
    }
});
exports.finishUserSignUp = functions
    .region('australia-southeast1')
    .https.onCall(async (data, context) => {
    try {
        if (!connection || !connection.isConnected) {
            connection = await connect();
        }
        const uid = data.uid;
        const firstStep = data.firstStep;
        const secondStep = data.secondStep;
        const seeker = new seeker_1.Seeker();
        const expertise = helperFunction_1.getExpertise(data.uuid, uid, secondStep.expertise);
        var description;
        seeker.uuid = data.uuid;
        seeker.uid = uid;
        seeker.photo = data.photoURL;
        seeker.location = secondStep.location;
        seeker.occupation = secondStep.occupation;
        if (secondStep.personalDesc.length > 0) {
            description = secondStep.personalDesc;
        }
        else {
            description = null;
        }
        seeker.description = description;
        var userType;
        if (firstStep.role === 'Jobseeker') {
            userType = users_1.UserType.SEEKER;
        }
        else {
            userType = users_1.UserType.MANAGER;
        }
        await connection.manager.update(users_1.Users, seeker.uuid, {
            firstName: firstStep.firstName,
            lastName: firstStep.lastName,
            status: users_1.StatusType.UNVERIFIED,
            userType: userType,
        });
        await connection.manager.save(expertise_1.Expertise, expertise);
        await connection.manager.save(seeker);
        return;
    }
    catch (err) {
        console.log(err);
        return;
    }
});
// TRIGGERS
exports.updateUserStats = functions
    .region('australia-southeast1')
    .https.onCall(async (data, context) => {
    const uid = data.uid;
    const skills = data.skills;
    const tools = data.tools;
    const ref = db.collection('users').doc(uid);
    const userRawStats = await ref.get();
    const userStats = userRawStats.data();
    if (userStats) {
        for (const [key, value] of Object.entries(skills)) {
            if (key in userStats.skills) {
                ref.set({
                    skills: Object.assign(Object.assign({}, userStats.skills), { [key]: userStats.skills[key] + value }),
                }, { merge: true });
            }
            else {
                ref.set({
                    skills: Object.assign(Object.assign({}, userStats.skills), { [key]: value }),
                }, { merge: true });
            }
        }
        for (const [key, value] of Object.entries(tools)) {
            if (key in userStats.tools) {
                ref.set({
                    tools: Object.assign(Object.assign({}, userStats.tools), { [key]: userStats.tools[key] + value }),
                }, { merge: true });
            }
            else {
                ref.set({
                    tools: Object.assign(Object.assign({}, userStats.tools), { [key]: value }),
                }, { merge: true });
            }
        }
    }
    return;
});
//# sourceMappingURL=index.js.map