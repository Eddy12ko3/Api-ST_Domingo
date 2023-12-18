"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SexoDB = void 0;
const typeorm_1 = require("typeorm");
const persona_1 = require("./persona");
let SexoDB = class SexoDB {
};
exports.SexoDB = SexoDB;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], SexoDB.prototype, "genderId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: '50',
    }),
    __metadata("design:type", String)
], SexoDB.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => persona_1.PersonaDB, (persona) => persona.gender),
    __metadata("design:type", Array)
], SexoDB.prototype, "person", void 0);
exports.SexoDB = SexoDB = __decorate([
    (0, typeorm_1.Entity)()
], SexoDB);
