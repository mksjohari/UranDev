export const getSocials = (uuid: String, uid: String, thirdStep: Object) => {
    const socials: Object[] = [];
    Object.entries(thirdStep).forEach(([key, value]) => {
        if (value !== "") {
            socials.push({ uuid: uuid, uid: uid, name: key, url: value });
        }
    });
    return socials;
};

export const getExpertise = (uuid: String, uid: String, secondStep: Object) => {
    const socials: Object[] = [];
    Object.entries(secondStep).forEach(([key, value]) => {
        if (value && key in expertise) {
            socials.push({
                uuid: uuid,
                uid: uid,
                eid: key,
                expertise: expertise[key],
            });
        }
    });
    return socials;
};

export const minusSkillTool = (key: number, value: any) => {
    return key - value;
};
const expertise: any = {
    id1: "Business & Management",
    id2: "Creative Arts",
    id3: "Engineering & Mathematics",
    id4: "Humanities, Arts & Social Sciences",
    id5: "IT & Computer Science",
    id6: "Law, Legal Studies & Justice",
    id7: "Medical & Health Sciences",
    id8: "Property & Built Environment",
    id9: "Sciences",
    id10: "Teaching & Education",
};
