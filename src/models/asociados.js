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
exports.AssociatesDB = void 0;
const typeorm_1 = require("typeorm");
const persona_1 = require("./persona");
const n_documento_1 = require("./n_documento");
let AssociatesDB = class AssociatesDB {
};
exports.AssociatesDB = AssociatesDB;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], AssociatesDB.prototype, "associateId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0,
        nullable: false,
    }),
    __metadata("design:type", Number)
], AssociatesDB.prototype, "folio", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => persona_1.PersonaDB, (person) => person.asocciate, {
        cascade: true,
    }),
    __metadata("design:type", persona_1.PersonaDB)
], AssociatesDB.prototype, "persons", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => n_documento_1.NumdocumentDB, (numdoc) => numdoc.asocciate, {
        cascade: true,
    }),
    __metadata("design:type", n_documento_1.NumdocumentDB)
], AssociatesDB.prototype, "numDocument", void 0);
exports.AssociatesDB = AssociatesDB = __decorate([
    (0, typeorm_1.Entity)()
], AssociatesDB);
