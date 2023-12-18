"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detailPaymentService = void 0;
const app_config_1 = require("../app.config");
const detalle_pago_1 = require("../models/detalle_pago");
const persona_1 = require("../models/persona");
class DetailPaymentService {
    static getInstance() {
        if (!DetailPaymentService.instance) {
            this.instance = new DetailPaymentService();
        }
        return this.instance;
    }
    constructor() { }
    InsertDetailPayment({ datepayment, amount, person }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const personObj = yield app_config_1.AppDataSource.getRepository(persona_1.PersonaDB).findOne({
                    where: {
                        personId: person,
                    },
                });
                if (!personObj)
                    throw new Error('Persona no encontrada');
                const newPayment = new detalle_pago_1.DetailPaymentDB();
                newPayment.datePayment = datepayment;
                newPayment.amount = amount;
                newPayment.person = personObj;
                const response = yield app_config_1.AppDataSource.getRepository(detalle_pago_1.DetailPaymentDB).save(newPayment);
                return response;
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    GetDetailPayment() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield app_config_1.AppDataSource.getRepository(detalle_pago_1.DetailPaymentDB).find({
                    relations: {
                        person: true,
                    },
                    select: {
                        person: {
                            name: true,
                            lastname: true,
                            date_birth: true,
                        },
                    },
                });
                return response;
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    UpdateDetailPayment(id, { datepayment, amount, person }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const personObj = yield app_config_1.AppDataSource.getRepository(persona_1.PersonaDB).findOne({
                    where: {
                        personId: person,
                    },
                });
                if (!personObj)
                    throw new Error('Persona no encontrada');
                const detailPaymentObj = yield app_config_1.AppDataSource.getRepository(detalle_pago_1.DetailPaymentDB).findOne({
                    where: {
                        detailPaymentId: parseInt(id),
                    },
                });
                if (!detailPaymentObj)
                    throw new Error('Pagos no encontrados');
                detailPaymentObj.datePayment = datepayment;
                detailPaymentObj.amount = amount;
                detailPaymentObj.person = personObj;
                const response = yield app_config_1.AppDataSource.getRepository(detalle_pago_1.DetailPaymentDB).save(detailPaymentObj);
                return response;
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    DeleteDetailPayment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paymentdelete = yield app_config_1.AppDataSource.getRepository(detalle_pago_1.DetailPaymentDB).findOne({
                    where: {
                        detailPaymentId: parseInt(id),
                    },
                });
                if (!paymentdelete)
                    throw new Error('Pagos no encontrados');
                const response = yield app_config_1.AppDataSource.getRepository(detalle_pago_1.DetailPaymentDB).remove(paymentdelete);
                return response;
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
}
exports.detailPaymentService = DetailPaymentService.getInstance();
