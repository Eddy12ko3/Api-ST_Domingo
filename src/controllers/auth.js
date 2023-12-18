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
exports.authController = void 0;
const auth_service_1 = require("../services/auth.service");
const err_handle_1 = require("../utils/err.handle");
class AuthController {
    constructor() {
        this.registerCtrl = ({ body }, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { numDocument, password, name, lastname, date_birth, document } = body;
                const responseUser = yield auth_service_1.authService.registerNewUser({
                    numDocument,
                    password,
                    name,
                    lastname,
                    date_birth,
                    document,
                });
                if (responseUser) {
                    res.status(200).json({
                        success: 'Registrado correctamente',
                    });
                }
                else {
                    res.status(404).json({
                        error: 'Error al registrar el usuario',
                    });
                }
            }
            catch (e) {
                (0, err_handle_1.handleHttp)(res, 'Error al registrar el usuario', e.message);
            }
        });
        this.loginCtrl = ({ body }, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { numDocument, password } = body;
                const responseUser = yield auth_service_1.authService.loginUser({
                    numDocument,
                    password,
                });
                return res.status(200).json(responseUser);
            }
            catch (e) {
                (0, err_handle_1.handleHttp)(res, 'Usuario o Contraseña incorrectas', e.message);
            }
        });
    }
    static getInstance() {
        if (!AuthController.instance) {
            this.instance = new AuthController();
        }
        return this.instance;
    }
}
exports.authController = AuthController.getInstance();
