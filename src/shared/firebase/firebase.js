import firebase from "firebase/app";
import "firebase/auth";
import "firebase/functions";
import "firebase/firestore";
import { getFirebase, getFunctions, getStorage } from "./config";
import { updateSkillsTools } from "../../actions/userAction";
// FUNCTIONS //

export const createAccount = getFunctions(firebase).httpsCallable(
    "createAccount"
);

export const checkUserExists = getFunctions(firebase).httpsCallable(
    "checkUserExists"
);

export const getUserInfo = getFunctions(firebase).httpsCallable("getUserInfo");
export const getPublicInfo = getFunctions(firebase).httpsCallable(
    "getPublicInfo"
);
export const getUserSocials = getFunctions(firebase).httpsCallable(
    "getUserSocials"
);
export const getUserExpertise = getFunctions(firebase).httpsCallable(
    "getUserExpertise"
);

export const finishUserSignUp = getFunctions(firebase).httpsCallable(
    "finishUserSignUp"
);

export const getExploreUsers = getFunctions(firebase).httpsCallable(
    "getExploreUsers"
);
export const getExploreCount = getFunctions(firebase).httpsCallable(
    "getExploreCount"
);
export const updateUserStats = getFunctions(firebase).httpsCallable(
    "updateUserStats"
);
export const addSkillsAndTools = getFunctions(firebase).httpsCallable(
    "addSkillsAndTools"
);
export const getUID = getFunctions(firebase).httpsCallable("getUID");
export const tempDeleteProjectStats = getFunctions(firebase).httpsCallable(
    "tempDeleteProjectStats"
);

// FIRESTORE

export const addUserDetails = async (
    uid,
    photoURL,
    allExpertise,
    firstStep,
    secondStep,
    thirdStep
) => {
    await getFirebase().firestore().collection("/users").doc(uid).set({
        uid: uid,
        firstName: firstStep.firstName,
        lastName: firstStep.lastName,
        role: firstStep.role,
        photoUrl: photoURL,
        occupation: secondStep.occupation,
        location: secondStep.location,
        description: secondStep.description,
        expertise: allExpertise,
        socials: thirdStep,
        skills: {},
        tools: {},
    });
};

export const uploadProject = async (uid, project) => {
    const newSkills = {};
    const newTools = {};
    const projectBase = {
        pid: project.pid,
        title: project.title,
        visibility: project.visibility,
        situation: {
            summary: project.situation.summary,
            role: project.situation.role,
            teamSize: project.situation.teamSize,
            currency: project.situation.currency,
            budget: project.situation.budget,
            startDate: new Date(
                project.situation.projectDates.startDate.format()
            ),
            endDate: new Date(project.situation.projectDates.endDate.format()),
        },
        created: new Date(),
    };
    await getFirebase()
        .firestore()
        .collection("users")
        .doc(uid)
        .collection("projects")
        .doc(project.pid)
        .set(projectBase)
        .then(() => {
            project.tasks.map(async (task, index) => {
                const actions = [];
                task.actions.forEach((action) => {
                    const files = [];
                    action.skills.forEach((skill) => {
                        addToStats(newSkills, skill);
                    });
                    action.tools.forEach((tool) => {
                        addToStats(newTools, tool);
                    });
                    action.files.forEach((file) => {
                        files.push(file.name);
                    });
                    action.files.forEach(async (file) => {
                        const path = storage.ref(
                            `users/${uid}/projects/${project.pid}/${file.name}`
                        );
                        await path.put(file);
                    });
                    console.log(files);
                    actions.push({
                        actionId: action.actionId,
                        title: action.title,
                        description: action.description,
                        skills: action.skills,
                        tools: action.tools,
                        files: files,
                    });
                });
                var startDate = null;
                var endDate = null;
                if (task.startDate !== null && task.endDate !== null) {
                    startDate = new Date(task.startDate.format());
                    endDate = new Date(task.endDate.format());
                }
                var taskId;
                if (task.tid) {
                    taskId = task.tid;
                } else {
                    taskId = `task-${Math.floor(
                        Math.random() * 100000
                    )}-${Math.floor(Math.random() * 100000)}-${Math.floor(
                        Math.random() * 100000
                    )}-${Math.floor(Math.random() * 100000)}`;
                }
                await getFirebase()
                    .firestore()
                    .collection("users")
                    .doc(uid)
                    .collection("projects")
                    .doc(project.pid)
                    .collection("tasks")
                    .doc(taskId)
                    .set({
                        index,
                        actions: actions,
                        description: task.description,
                        title: task.title,
                        startDate: startDate,
                        endDate: endDate,
                        tid: taskId,
                    });
            });
        })
        .then(async () => {
            const sections = [];
            const results = {
                conclusion: project.results.conclusion,
                links: project.results.links,
            };
            project.results.sections.forEach((section) => {
                const files = [];
                section.files.forEach(async (file) => {
                    const path = storage.ref(
                        `users/${uid}/projects/${project.pid}/results/${file.name}`
                    );
                    path.put(file);
                    files.push(file.name);
                });
                sections.push({
                    sectionId: section.sectionId,
                    description: section.description,
                    files: files,
                    sectionLink: section.sectionLink,
                });
            });
            results.sections = sections;
            var url =
                "https://firebasestorage.googleapis.com/v0/b/uran-28-12-98.appspot.com/o/static%2FdefaultProject.png?alt=media&token=dfa29922-f6da-47f1-9b01-a50a3ac15266";
            if (project.cover.changed === true) {
                const path = storage.ref(
                    `users/${uid}/projects/${project.pid}/cover`
                );
                await path.put(project.cover.imgSrc);
                url = await storage
                    .ref(`users/${uid}/projects/${project.pid}/cover`)
                    .getDownloadURL();
            }
            if (project.fromEdit === true) {
                await tempDeleteProjectStats({
                    oldSkills: project.oldSkills,
                    oldTools: project.oldTools,
                    uid,
                });
            }
            const projectPreview = {
                pid: project.pid,
                title: project.title,
                role: project.situation.role,
                coverUrl: url,
                startDate: new Date(
                    project.situation.projectDates.startDate.format()
                ),
                endDate: new Date(
                    project.situation.projectDates.endDate.format()
                ),
                skills: Object.keys(newSkills),
                tools: Object.keys(newTools),
            };
            console.log(uid, project.pid, results);
            await getFirebase()
                .firestore()
                .collection("users")
                .doc(uid)
                .collection("projects")
                .doc(project.pid)
                .update({ results: results });
            await getFirebase()
                .firestore()
                .collection("users")
                .doc(uid)
                .collection("projectPreviews")
                .doc(project.pid)
                .set(projectPreview);
            await getFirebase()
                .firestore()
                .collection("users")
                .doc(uid)
                .collection("projects")
                .doc(project.pid)
                .update({ coverUrl: url });
            project.results.sections.forEach((section) => {
                section.files.forEach(async (file) => {
                    const path = storage.ref(
                        `users/${uid}/projects/${project.pid}/${file.name}`
                    );
                    await path.put(file);
                });
            });
            updateSkillsTools(newSkills, newTools)
            await updateUserStats({ uid, skills: newSkills, tools: newTools });
        });
};

// STORAGE //
export const storage = getStorage(firebase);

export const getPidImage = async (uid, pid, name) => {
    const ref = storage.ref(`users/${uid}/projects/${pid}/${name}`);
    const preview = await ref.getDownloadURL();
    return { name, preview };
};
// HELPER FUNCTIONS //

export const addToStats = (stats, key) => {
    if (key in stats) {
        stats[key] += 1;
    } else {
        stats[key] = 1;
    }
};
