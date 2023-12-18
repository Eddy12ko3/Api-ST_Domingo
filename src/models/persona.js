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
exports.PersonaDB = void 0;
const typeorm_1 = require("typeorm");
const sexo_1 = require("./sexo");
const detalle_pago_1 = require("./detalle_pago");
const direccion_1 = require("./direccion");
const celular_1 = require("./celular");
const puestos_1 = require("./puestos");
const asociados_1 = require("./asociados");
let PersonaDB = class PersonaDB {
};
exports.PersonaDB = PersonaDB;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], PersonaDB.prototype, "personId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: '100',
        default: '',
    }),
    __metadata("design:type", String)
], PersonaDB.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: '100',
        default: '',
    }),
    __metadata("design:type", String)
], PersonaDB.prototype, "lastname", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], PersonaDB.prototype, "date_birth", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        default: true,
    }),
    __metadata("design:type", Boolean)
], PersonaDB.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }) // Campo de creación
    ,
    __metadata("design:type", Date)
], PersonaDB.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    }) // Campo de actualización
    ,
    __metadata("design:type", Date)
], PersonaDB.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => asociados_1.AssociatesDB, (associate) => associate.persons, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'associateId' }),
    __metadata("design:type", asociados_1.AssociatesDB)
], PersonaDB.prototype, "asocciate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sexo_1.SexoDB, (sexo) => sexo.person),
    (0, typeorm_1.JoinColumn)({ name: 'genderId' }),
    __metadata("design:type", sexo_1.SexoDB)
], PersonaDB.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => detalle_pago_1.DetailPaymentDB, (detailpayment) => detailpayment.person),
    __metadata("design:type", Array)
], PersonaDB.prototype, "detailpayment", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => direccion_1.AddressDB, (address) => address.persons, {
        cascade: true,
    }),
    (0, typeorm_1.JoinTable)({
        name: 'person_db_addresses_address_db',
        joinColumn: {
            name: 'personId',
            referencedColumnName: 'personId',
        },
        inverseJoinColumn: {
            name: 'addressId',
            referencedColumnName: 'addressId',
        },
    }),
    __metadata("design:type", Array)
], PersonaDB.prototype, "addresses", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => celular_1.CellPhoneDB, (cellphone) => cellphone.persons, {
        cascade: true,
    }),
    (0, typeorm_1.JoinTable)({
        name: 'person_db_cellphones_cellphone_db',
        joinColumn: {
            name: 'personId',
            referencedColumnName: 'personId',
        },
        inverseJoinColumn: {
            name: 'cellPhoneid',
            referencedColumnName: 'cellPhoneid',
        },
    }),
    __metadata("design:type", Array)
], PersonaDB.prototype, "cellPhones", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => puestos_1.StandsDB, (stands) => stands.persons, {
        cascade: true,
    }),
    (0, typeorm_1.JoinTable)({
        name: 'person_db_persons_stands_db',
        joinColumn: {
            name: 'personId',
            referencedColumnName: 'personId',
        },
        inverseJoinColumn: {
            name: 'standId',
            referencedColumnName: 'standId',
        },
    }),
    __metadata("design:type", Array)
], PersonaDB.prototype, "stands", void 0);
exports.PersonaDB = PersonaDB = __decorate([
    (0, typeorm_1.Entity)()
], PersonaDB);
