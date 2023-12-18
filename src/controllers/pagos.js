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
exports.detailPaymentController = void 0;
const pagos_service_1 = require("../services/pagos.service");
const err_handle_1 = require("../utils/err.handle");
class DetailPaymentController {
    static getInstance() {
        if (!DetailPaymentController.instance) {
            this.instance = new DetailPaymentController();
        }
        return this.instance;
    }
    InsertPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { datepayment, amount, person } = req.body;
                const response = yield pagos_service_1.detailPaymentService.InsertDetailPayment({
                    datepayment,
                    amount,
                    person,
                });
                if (response) {
                    res.status(200).json({
                        success: 'El registro ha sido insertado correctamente',
                    });
                }
                else {
                    res.status(404).json({
                        error: 'Error al registrar el registro',
                    });
                }
            }
            catch (e) {
                (0, err_handle_1.handleHttp)(res, 'Error al registar un pago', e.message);
            }
        });
    }
    GetPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield pagos_service_1.detailPaymentService.GetDetailPayment();
                if (response.length > 0) {
                    return res.status(200).json(response);
                }
                else {
                    return res.json({ message: 'No hay registros' });
                }
            }
            catch (e) {
                (0, err_handle_1.handleHttp)(res, 'Error al obtener los registros', e.message);
            }
        });
    }
    UpdatePayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { datepayment, amount, person } = req.body;
                const response = yield pagos_service_1.detailPaymentService.UpdateDetailPayment(id, {
                    datepayment,
                    amount,
                    person,
                });
                if (response) {
                    res.status(200).json({
                        success: 'El registro ha sido modificado correctamente',
                    });
                }
                else {
                    res.status(404).json({
                        error: 'Error al modificar el registro',
                    });
                }
            }
            catch (e) {
                (0, err_handle_1.handleHttp)(res, 'Error al modificar el registro de pagos', e.message);
            }
        });
    }
    DeletePayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const response = yield pagos_service_1.detailPaymentService.DeleteDetailPayment(id);
                if (response) {
                    res.status(200).json({
                        success: 'El registro ha sido eliminado correctamente',
                    });
                }
                else {
                    res.status(404).json({
                        error: 'Error al eliminar el registro',
                    });
                }
            }
            catch (e) {
                (0, err_handle_1.handleHttp)(res, 'Error al eliminar el registro de pagos', e.message);
            }
        });
    }
}
exports.detailPaymentController = DetailPaymentController.getInstance();
