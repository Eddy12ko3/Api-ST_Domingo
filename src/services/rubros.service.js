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
exports.fieldsService = void 0;
const app_config_1 = require("../app.config");
const rubros_1 = require("../models/rubros");
class FieldsService {
    static getInstance() {
        if (!FieldsService.instance) {
            this.instance = new FieldsService();
        }
        return this.instance;
    }
    InsertField(fields) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fieldrepo = app_config_1.AppDataSource.getRepository(rubros_1.FieldsDB);
                if (!fieldrepo) {
                    throw new Error('Repository is not available.');
                }
                for (const field of fields) {
                    const exist = yield fieldrepo.exist({
                        where: {
                            nameField: field.nameField
                        },
                    });
                    if (!exist) {
                        const newField = new rubros_1.FieldsDB();
                        newField.nameField = field.nameField;
                        yield fieldrepo.save(newField);
                    }
                }
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    ;
    GetField() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield app_config_1.AppDataSource.getRepository(rubros_1.FieldsDB).find();
                return response;
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
}
exports.fieldsService = FieldsService.getInstance();
