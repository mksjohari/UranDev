"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tools = void 0;
const typeorm_1 = require("typeorm");
let Tools = class Tools {
};
__decorate([
    typeorm_1.PrimaryColumn({ type: String })
], Tools.prototype, "uuid", void 0);
__decorate([
    typeorm_1.PrimaryColumn({ type: String })
], Tools.prototype, "uid", void 0);
__decorate([
    typeorm_1.PrimaryColumn({ type: String })
], Tools.prototype, "tool", void 0);
__decorate([
    typeorm_1.Column({ type: String })
], Tools.prototype, "created", void 0);
Tools = __decorate([
    typeorm_1.Entity()
], Tools);
exports.Tools = Tools;
//# sourceMappingURL=tools.js.map