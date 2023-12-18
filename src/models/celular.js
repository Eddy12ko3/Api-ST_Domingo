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
exports.CellPhoneDB = void 0;
const typeorm_1 = require("typeorm");
const persona_1 = require("./persona");
const operador_1 = require("./operador");
let CellPhoneDB = class CellPhoneDB {
};
exports.CellPhoneDB = CellPhoneDB;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], CellPhoneDB.prototype, "cellPhoneid", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0,
    }),
    __metadata("design:type", Number)
], CellPhoneDB.prototype, "cellNumber", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => persona_1.PersonaDB, (person) => person.cellPhones, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], CellPhoneDB.prototype, "persons", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => operador_1.OperatorDB, (operator) => operator.cellphone),
    (0, typeorm_1.JoinColumn)({ name: 'operatorId' }),
    __metadata("design:type", operador_1.OperatorDB)
], CellPhoneDB.prototype, "operators", void 0);
exports.CellPhoneDB = CellPhoneDB = __decorate([
    (0, typeorm_1.Entity)()
], CellPhoneDB);
