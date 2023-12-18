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
exports.StandsDB = void 0;
const typeorm_1 = require("typeorm");
const areas_1 = require("./areas");
const sector_1 = require("./sector");
const persona_1 = require("./persona");
const rubros_1 = require("./rubros");
let StandsDB = class StandsDB {
};
exports.StandsDB = StandsDB;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], StandsDB.prototype, "standId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: '100',
        nullable: false,
    }),
    __metadata("design:type", String)
], StandsDB.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => areas_1.AreasMTSDB, (areas) => areas.stands, {
        cascade: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'areaId' }),
    __metadata("design:type", areas_1.AreasMTSDB)
], StandsDB.prototype, "areas", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sector_1.SectorDB, (sector) => sector.stands, {
        cascade: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'sectorId' }),
    __metadata("design:type", sector_1.SectorDB)
], StandsDB.prototype, "sector", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rubros_1.FieldsDB, (field) => field.stand, {
        cascade: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'fieldId' }),
    __metadata("design:type", rubros_1.FieldsDB)
], StandsDB.prototype, "rubro", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => persona_1.PersonaDB, (person) => person.stands, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], StandsDB.prototype, "persons", void 0);
exports.StandsDB = StandsDB = __decorate([
    (0, typeorm_1.Entity)()
], StandsDB);
