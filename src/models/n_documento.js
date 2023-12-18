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
exports.NumdocumentDB = void 0;
const typeorm_1 = require("typeorm");
const tipo_documento_1 = require("./tipo_documento");
const user_1 = require("./user");
const asociados_1 = require("./asociados");
let NumdocumentDB = class NumdocumentDB {
};
exports.NumdocumentDB = NumdocumentDB;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], NumdocumentDB.prototype, "numDocId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint',
        nullable: false,
    }),
    __metadata("design:type", Number)
], NumdocumentDB.prototype, "numDocument", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tipo_documento_1.TipoDocumentoDB, (tipoDocumento) => tipoDocumento.numdocument),
    (0, typeorm_1.JoinColumn)({ name: 'tipoDocId' }),
    __metadata("design:type", tipo_documento_1.TipoDocumentoDB)
], NumdocumentDB.prototype, "tipoDocumento", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => asociados_1.AssociatesDB, (associate) => associate.numDocument, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'associateId' }),
    __metadata("design:type", asociados_1.AssociatesDB)
], NumdocumentDB.prototype, "asocciate", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_1.UserDB, (user) => user.userId),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_1.UserDB)
], NumdocumentDB.prototype, "user", void 0);
exports.NumdocumentDB = NumdocumentDB = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['numDocument'])
], NumdocumentDB);
