"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Skills = void 0;
const typeorm_1 = require("typeorm");
let Skills = class Skills {
};
__decorate([
    typeorm_1.PrimaryColumn({ type: String })
], Skills.prototype, "uuid", void 0);
__decorate([
    typeorm_1.PrimaryColumn({ type: String })
], Skills.prototype, "uid", void 0);
__decorate([
    typeorm_1.PrimaryColumn({ type: String })
], Skills.prototype, "skill", void 0);
__decorate([
    typeorm_1.Column({ type: String })
], Skills.prototype, "created", void 0);
Skills = __decorate([
    typeorm_1.Entity()
], Skills);
exports.Skills = Skills;
//# sourceMappingURL=skills.js.map