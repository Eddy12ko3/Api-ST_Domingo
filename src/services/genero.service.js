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
exports.genderService = void 0;
const app_config_1 = require("../app.config");
const sexo_1 = require("../models/sexo");
class GenderService {
    static getInstance() {
        if (!GenderService.instance) {
            this.instance = new GenderService();
        }
        return this.instance;
    }
    InsertGenero(genders) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sexorepo = app_config_1.AppDataSource.getRepository(sexo_1.SexoDB);
                for (const gender of genders) {
                    const exist = yield sexorepo.exist({
                        where: {
                            description: gender.description,
                        },
                    });
                    if (!exist) {
                        const genero = new sexo_1.SexoDB();
                        genero.description = gender.description;
                        yield sexorepo.save(genero);
                    }
                }
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    ;
    GetGender() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield app_config_1.AppDataSource.getRepository(sexo_1.SexoDB).find();
                return response;
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
}
exports.genderService = GenderService.getInstance();
