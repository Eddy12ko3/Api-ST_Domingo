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
exports.TipoDocumentoDB = void 0;
const typeorm_1 = require("typeorm");
const n_documento_1 = require("./n_documento");
let TipoDocumentoDB = class TipoDocumentoDB {
};
exports.TipoDocumentoDB = TipoDocumentoDB;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], TipoDocumentoDB.prototype, "tipoDocId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: '50',
    }),
    __metadata("design:type", String)
], TipoDocumentoDB.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => n_documento_1.NumdocumentDB, (numdocument) => numdocument.tipoDocumento),
    __metadata("design:type", Array)
], TipoDocumentoDB.prototype, "numdocument", void 0);
exports.TipoDocumentoDB = TipoDocumentoDB = __decorate([
    (0, typeorm_1.Entity)()
], TipoDocumentoDB);
