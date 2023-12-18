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
exports.OperatorDB = void 0;
const typeorm_1 = require("typeorm");
const celular_1 = require("./celular");
let OperatorDB = class OperatorDB {
};
exports.OperatorDB = OperatorDB;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], OperatorDB.prototype, "operatorId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: '20',
    }),
    __metadata("design:type", String)
], OperatorDB.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => celular_1.CellPhoneDB, (cellphone) => cellphone),
    __metadata("design:type", Array)
], OperatorDB.prototype, "cellphone", void 0);
exports.OperatorDB = OperatorDB = __decorate([
    (0, typeorm_1.Entity)()
], OperatorDB);
