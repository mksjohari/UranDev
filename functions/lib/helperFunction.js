"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpertise = exports.getSocials = void 0;
exports.getSocials = (uuid, uid, thirdStep) => {
    const socials = [];
    Object.entries(thirdStep).forEach(([key, value]) => {
        if (value !== '') {
            socials.push({ uuid: uuid, uid: uid, name: key, url: value });
        }
    });
    return socials;
};
exports.getExpertise = (uuid, uid, secondStep) => {
    const socials = [];
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
const expertise = {
    id1: 'Business & Management',
    id2: 'Creative Arts',
    id3: 'Engineering & Mathematics',
    id4: 'Humanities, Arts & Social Sciences',
    id5: 'IT & Computer Science',
    id6: 'Law, Legal Studies & Justice',
    id7: 'Medical & Health Sciences',
    id8: 'Property & Built Environment',
    id9: 'Sciences',
    id10: 'Teaching & Education',
};
//# sourceMappingURL=helperFunction.js.map