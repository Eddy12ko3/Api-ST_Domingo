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
exports.personController = void 0;
const err_handle_1 = require("../utils/err.handle");
const persona_service_1 = require("../services/persona.service");
class PersonController {
    static getInstance() {
        if (!PersonController.instance) {
            this.instance = new PersonController();
        }
        return this.instance;
    }
    GetPersons(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield persona_service_1.personService.GetPersons();
                res.status(200).json(response);
            }
            catch (e) {
                (0, err_handle_1.handleHttp)(res, 'Error al obtener los registos', e.message);
            }
        });
    }
}
exports.personController = PersonController.getInstance();
