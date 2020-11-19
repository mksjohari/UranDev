"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = exports.StatusType = exports.UserType = void 0;
const typeorm_1 = require("typeorm");
var UserType;
(function (UserType) {
    UserType["NONE"] = "none";
    UserType["MANAGER"] = "manager";
    UserType["SEEKER"] = "seeker";
})(UserType = exports.UserType || (exports.UserType = {}));
var StatusType;
(function (StatusType) {
    StatusType["INCOMPLETE"] = "incomplete";
    StatusType["UNVERIFIED"] = "unverified";
    StatusType["VERIFIED"] = "verified";
})(StatusType = exports.StatusType || (exports.StatusType = {}));
let Users = class Users {
};
__decorate([
    typeorm_1.PrimaryColumn({ type: String })
], Users.prototype, "uuid", void 0);
__decorate([
    typeorm_1.Column({ type: String })
], Users.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column({ type: String })
], Users.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column({ type: String })
], Users.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({
        type: "enum",
        enum: UserType,
        default: UserType.NONE,
    })
], Users.prototype, "userType", void 0);
__decorate([
    typeorm_1.Column({
        type: "enum",
        enum: StatusType,
        default: StatusType.INCOMPLETE,
    })
], Users.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ type: String })
], Users.prototype, "dateCreated", void 0);
Users = __decorate([
    typeorm_1.Entity()
], Users);
exports.Users = Users;
//# sourceMappingURL=users.js.map