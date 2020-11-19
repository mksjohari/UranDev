"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Seeker = void 0;
const typeorm_1 = require("typeorm");
let Seeker = class Seeker {
};
__decorate([
    typeorm_1.PrimaryColumn({ type: String })
], Seeker.prototype, "uuid", void 0);
__decorate([
    typeorm_1.PrimaryColumn({ type: String })
], Seeker.prototype, "uid", void 0);
__decorate([
    typeorm_1.Column({ type: String })
], Seeker.prototype, "photo", void 0);
__decorate([
    typeorm_1.Column({ type: String, default: "https://www.youtube.com/" })
], Seeker.prototype, "introduction", void 0);
__decorate([
    typeorm_1.Column({ type: String })
], Seeker.prototype, "occupation", void 0);
__decorate([
    typeorm_1.Column({ type: String, nullable: true, length: 1000 })
], Seeker.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ type: String })
], Seeker.prototype, "location", void 0);
Seeker = __decorate([
    typeorm_1.Entity()
], Seeker);
exports.Seeker = Seeker;
//# sourceMappingURL=seeker.js.map