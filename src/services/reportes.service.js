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
exports.reportService = void 0;
const app_config_1 = require("../app.config");
const asociados_1 = require("../models/asociados");
class ReportService {
    static getInstance() {
        if (!ReportService.instance) {
            this.instance = new ReportService();
        }
        return this.instance;
    }
    getReports() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const responseAssociates = yield app_config_1.AppDataSource.getRepository(asociados_1.AssociatesDB).find({
                    relations: {
                        numDocument: {
                            tipoDocumento: true,
                        },
                        persons: {
                            addresses: true,
                            gender: true,
                            cellPhones: {
                                operators: true,
                            },
                            stands: {
                                areas: true,
                                sector: true,
                                rubro: true,
                            },
                            detailpayment: true
                        },
                    },
                });
                return {
                    recordsFiltered: responseAssociates.length,
                    recordsTotal: responseAssociates.length,
                    data: responseAssociates
                };
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
}
exports.reportService = ReportService.getInstance();
