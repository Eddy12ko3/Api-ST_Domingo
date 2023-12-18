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
exports.AreasMTSDB = void 0;
const typeorm_1 = require("typeorm");
const puestos_1 = require("./puestos");
let AreasMTSDB = class AreasMTSDB {
};
exports.AreasMTSDB = AreasMTSDB;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], AreasMTSDB.prototype, "areaId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: '50',
        default: '',
    }),
    __metadata("design:type", String)
], AreasMTSDB.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => puestos_1.StandsDB, (stands) => stands.areas, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], AreasMTSDB.prototype, "stands", void 0);
exports.AreasMTSDB = AreasMTSDB = __decorate([
    (0, typeorm_1.Entity)()
], AreasMTSDB);
