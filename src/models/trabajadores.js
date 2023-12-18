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
exports.WorkersDB = void 0;
const typeorm_1 = require("typeorm");
let WorkersDB = class WorkersDB {
};
exports.WorkersDB = WorkersDB;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], WorkersDB.prototype, "workedId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: '100',
        default: '',
    }),
    __metadata("design:type", String)
], WorkersDB.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], WorkersDB.prototype, "dni", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WorkersDB.prototype, "password", void 0);
exports.WorkersDB = WorkersDB = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['dni'])
], WorkersDB);
