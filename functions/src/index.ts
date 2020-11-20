import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { Connection, createConnection } from "typeorm";
import { StatusType, Users, UserType } from "./entity/users";
import { Seeker } from "./entity/seeker";
import { Expertise } from "./entity/expertise";
import { getExpertise, minusSkillTool } from "./helperFunction";
import "reflect-metadata";
import { Skills } from "./entity/skills";
import { Tools } from "./entity/tools";

admin.initializeApp();
const db = admin.firestore();

export const connect = async () => {
    return await createConnection({
        type: "mysql",
        host: functions.config().cloudsql.host,
        port: functions.config().cloudsql.port,
        username: functions.config().cloudsql.user,
        password: functions.config().cloudsql.pass,
        database: functions.config().cloudsql.database,
        entities: [Users, Seeker, Skills, Tools, Expertise],
        synchronize: true,
    });
};
let connection: Connection;

export const createAccount = functions
    .region("australia-southeast1")
    .https.onCall(async (data, context) => {
        try {
            const user = new Users();
            if (!connection || !connection.isConnected) {
                connection = await connect();
            }
            user.uuid = data.uuid;
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.email = data.email;
            user.dateCreated = new Date().getTime().toString();
            await connection.manager.save(Users, user);
            console.log("user has been saved. user id is", user.uuid);
            return `Successfully added ${user.uuid}`;
        } catch (err) {
            console.log(err);
            return `Error occurred adding user`;
        }
    });

export const checkUserExists = functions
    .region("australia-southeast1")
    .https.onCall(async (data, context) => {
        try {
            const uuid = data.uuid;
            if (!connection || !connection.isConnected) {
                connection = await connect();
            }
            const result = await connection.query(
                `SELECT * FROM users WHERE uuid='${uuid}';`
            );
            if (result.length > 0) return [true, result[0]];
            return [false, "incomplete"];
        } catch (err) {
            console.log(err);
            return [false, "incomplete"];
        }
    });

export const getUID = functions
    .region("australia-southeast1")
    .https.onCall(async (data, context) => {
        try {
            const uuid = data.uuid;
            if (!connection || !connection.isConnected) {
                connection = await connect();
            }
            const result = await connection.query(
                `SELECT uid FROM users inner join seeker on users.uuid = seeker.uuid where users.uuid = '${uuid}';`
            );
            return result[0];
        } catch (err) {
            console.log(err);
        }
    });
export const getUserInfo = functions
    .region("australia-southeast1")
    .https.onCall(async (data, context) => {
        try {
            const uuid = data.uuid;
            if (!connection || !connection.isConnected) {
                connection = await connect();
            }
            const result = await connection.query(
                `SELECT * FROM users inner join seeker on users.uuid = seeker.uuid where users.uuid = '${uuid}';`
            );
            return result[0];
        } catch (err) {
            console.log(err);
        }
    });
export const getPublicInfo = functions
    .region("australia-southeast1")
    .https.onCall(async (data, context) => {
        try {
            const uuid = data.uuid;
            const uid = data.uid;
            if (!connection || !connection.isConnected) {
                connection = await connect();
            }
            var result;
            if (uuid !== undefined) {
                result = await connection.query(
                    `SELECT * FROM users inner join seeker on users.uuid = seeker.uuid where seeker.uuid = '${uuid}';`
                );
            } else {
                result = await connection.query(
                    `SELECT * FROM users inner join seeker on users.uuid = seeker.uuid where seeker.uid = '${uid}';`
                );
            }
            return result[0];
        } catch (err) {
            console.log(err);
        }
    });

export const getExploreUsers = functions
    .region("australia-southeast1")
    .https.onCall(async (data, context) => {
        const limit = data.limit;
        const offset = data.page * limit - limit;
        try {
            if (!connection || !connection.isConnected) {
                connection = await connect();
            }
            const result = await connection.query(
                `SELECT * FROM users inner join seeker on users.uuid = seeker.uuid limit ${limit} offset ${offset}`
            );
            return result;
        } catch (err) {
            console.log(err);
        }
    });

export const getExploreCount = functions
    .region("australia-southeast1")
    .https.onCall(async (data, context) => {
        try {
            if (!connection || !connection.isConnected) {
                connection = await connect();
            }
            const result = await connection.query(
                `SELECT COUNT(*) FROM users inner join seeker on users.uuid = seeker.uuid`
            );
            return result[0]["COUNT(*)"];
        } catch (err) {
            console.log(err);
        }
    });

export const getUserSocials = functions
    .region("australia-southeast1")
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
                whereLeft = "uuid";
                whereRight = uuid;
            } else {
                whereLeft = "uid";
                whereRight = uid;
            }
            const result = await connection.query(
                `SELECT uid, name, url FROM social where ${whereLeft} = '${whereRight}';`
            );
            return result;
        } catch (err) {
            console.log(err);
        }
    });

export const getUserExpertise = functions
    .region("australia-southeast1")
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
                whereLeft = "uuid";
                whereRight = uuid;
            } else {
                whereLeft = "uid";
                whereRight = uid;
            }
            const result = await connection.query(
                `SELECT uid, eid, expertise FROM expertise where ${whereLeft} = '${whereRight}';`
            );
            return result;
        } catch (err) {
            console.log(err);
        }
    });

export const addSkillsAndTools = functions
    .region("australia-southeast1")
    .https.onCall(async (data, context) => {
        try {
            if (!connection || !connection.isConnected) {
                connection = await connect();
            }
            const skills = data.skills;
            const tools = data.tools;
            await connection.manager.save(Skills, skills);
            await connection.manager.save(Tools, tools);
            return;
        } catch (err) {
            console.log(err);
            return;
        }
    });

export const finishUserSignUp = functions
    .region("australia-southeast1")
    .https.onCall(async (data, context) => {
        try {
            if (!connection || !connection.isConnected) {
                connection = await connect();
            }
            const uid = data.uid;
            const firstStep = data.firstStep;
            const secondStep = data.secondStep;
            const seeker = new Seeker();
            const expertise = getExpertise(
                data.uuid,
                uid,
                secondStep.expertise
            );

            var description;
            seeker.uuid = data.uuid;
            seeker.uid = uid;
            seeker.photo = data.photoURL;
            seeker.location = secondStep.location;
            seeker.occupation = secondStep.occupation;
            if (secondStep.description.length > 0) {
                description = secondStep.description;
            } else {
                description = null;
            }
            seeker.description = description;
            var userType;
            if (firstStep.role === "Jobseeker") {
                userType = UserType.SEEKER;
            } else {
                userType = UserType.MANAGER;
            }
            await connection.manager.update(Users, seeker.uuid, {
                firstName: firstStep.firstName,
                lastName: firstStep.lastName,
                status: StatusType.UNVERIFIED,
                userType: userType,
            });
            await connection.manager.save(Expertise, expertise);
            await connection.manager.save(seeker);
            return;
        } catch (err) {
            console.log(err);
            return;
        }
    });

// TRIGGERS

export const tempDeleteProjectStats = functions
    .region("australia-southeast1")
    .https.onCall(async (data, context) => {
        const uid = data.uid;
        const skills = data.oldSkills;
        const tools = data.oldTools;
        console.log(skills, tools);
        const ref = db.collection("users").doc(uid);
        const userRawStats = await ref.get();
        const userStats = userRawStats.data();
        if (userStats) {
            for (const [key, value] of Object.entries(skills)) {
                if (key in userStats.skills) {
                    ref.set(
                        {
                            skills: {
                                ...userStats.skills,
                                [key]: minusSkillTool(
                                    userStats.skills[key],
                                    value
                                ),
                            },
                        },
                        { merge: true }
                    );
                }
            }
            for (const [key, value] of Object.entries(tools)) {
                if (key in userStats.tools) {
                    ref.set(
                        {
                            tools: {
                                ...userStats.tools,
                                [key]: minusSkillTool(
                                    userStats.tools[key],
                                    value
                                ),
                            },
                        },
                        { merge: true }
                    );
                }
            }
        }
        return;
    });

export const updateUserStats = functions
    .region("australia-southeast1")
    .https.onCall(async (data, context) => {
        const uid = data.uid;
        const skills = data.skills;
        const tools = data.tools;

        const ref = db.collection("users").doc(uid);
        const userRawStats = await ref.get();
        const userStats = userRawStats.data();
        if (userStats) {
            for (const [key, value] of Object.entries(skills)) {
                if (key in userStats.skills) {
                    ref.set(
                        {
                            skills: {
                                ...userStats.skills,
                                [key]: userStats.skills[key] + value,
                            },
                        },
                        { merge: true }
                    );
                } else {
                    ref.set(
                        {
                            skills: {
                                ...userStats.skills,
                                [key]: value,
                            },
                        },
                        { merge: true }
                    );
                }
            }
            for (const [key, value] of Object.entries(tools)) {
                if (key in userStats.tools) {
                    ref.set(
                        {
                            tools: {
                                ...userStats.tools,
                                [key]: userStats.tools[key] + value,
                            },
                        },
                        { merge: true }
                    );
                } else {
                    ref.set(
                        {
                            tools: {
                                ...userStats.tools,
                                [key]: value,
                            },
                        },
                        { merge: true }
                    );
                }
            }
        }
        return;
    });

export default admin;
