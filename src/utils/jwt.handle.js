"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
const encryptHash = '$2y$19$sUcRTjesx/tcq4rLsgiLre0NGnwPP8BWPSZJgyysWYoeBiGPPLaNG';
const generateToken = (dni) => {
    const Gtoken = jsonwebtoken_1.default.sign({ userId: dni }, JWT_SECRET || encryptHash, {
        expiresIn: '3h',
    });
    return Gtoken;
};
exports.generateToken = generateToken;
const verifyToken = (payload) => {
    const isOk = jsonwebtoken_1.default.verify(payload, JWT_SECRET || encryptHash);
    return isOk;
};
exports.verifyToken = verifyToken;
