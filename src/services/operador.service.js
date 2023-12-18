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
exports.operatorService = void 0;
const app_config_1 = require("../app.config");
const operador_1 = require("../models/operador");
class OperatorService {
    static getInstance() {
        if (!OperatorService.instance) {
            this.instance = new OperatorService();
        }
        return this.instance;
    }
    InsertOperators(operators) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const operepo = app_config_1.AppDataSource.getRepository(operador_1.OperatorDB);
                for (const operator of operators) {
                    const exist = yield operepo.exist({
                        where: {
                            name: operator.nameOperator,
                        },
                    });
                    if (!exist) {
                        const newOperator = new operador_1.OperatorDB();
                        newOperator.name = operator.nameOperator;
                        yield operepo.save(newOperator);
                    }
                }
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    GetOperator() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield app_config_1.AppDataSource.getRepository(operador_1.OperatorDB).find();
                return response;
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
}
exports.operatorService = OperatorService.getInstance();
