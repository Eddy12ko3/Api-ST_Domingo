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
exports.productController = void 0;
const err_handle_1 = require("../utils/err.handle");
const producto_service_1 = require("../services/producto.service");
class ProductController {
    constructor() {
        this.getProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const response = yield producto_service_1.productService.GetProduct(id);
                if (response) {
                    return res.status(200).json(response);
                }
                else {
                    return res.json({ message: 'registro no encontrado' });
                }
            }
            catch (e) {
                (0, err_handle_1.handleHttp)(res, 'ERR_GET_PRODUCT', e.message);
            }
        });
        this.getProducts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield producto_service_1.productService.GetProducts();
                if (response) {
                    return res.status(200).json(response);
                }
                else {
                    return res.json({ message: 'No hay registros' });
                }
            }
            catch (e) {
                (0, err_handle_1.handleHttp)(res, 'ERR_GET_PRODUCTS', e.message);
            }
        });
        this.updateProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { code, name, details, marca, unit, priceDistributor, priceProduct, image, commission, tax, expired, stock_min, stock_max, status, } = req.body;
                const response = yield producto_service_1.productService.UpdateProduct(id, {
                    code,
                    name,
                    details,
                    marca,
                    unit,
                    priceDistributor,
                    priceProduct,
                    image,
                    commission,
                    tax,
                    expired,
                    stock_min,
                    stock_max,
                    status,
                });
                if (response) {
                    res.status(200).json({ success: 'modificado correctamente' });
                }
                else {
                    res.status(500).json({ error: 'error updating product' });
                }
            }
            catch (e) {
                (0, err_handle_1.handleHttp)(res, 'ERR_UPDATE_PRODUCT', e.message);
            }
        });
        this.postProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { code, name, details, marca, unit, priceDistributor, priceProduct, image, commission, tax, expired, stock_min, stock_max, status, } = req.body;
                const response = yield producto_service_1.productService.InsertProduct({
                    code,
                    name,
                    details,
                    marca,
                    unit,
                    priceDistributor,
                    priceProduct,
                    image,
                    commission,
                    tax,
                    expired,
                    stock_min,
                    stock_max,
                    status,
                });
                return res.status(200).json({ message: 'producto insertado correctamente' });
            }
            catch (e) {
                (0, err_handle_1.handleHttp)(res, 'ERR_POST_PRODUCT', e.message);
            }
        });
        this.deleteProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const response = yield producto_service_1.productService.DeleteProduct(id);
                if (response) {
                    res.status(200).json({ message: 'Producto borrado correctamente' });
                }
                else {
                    res.status(404).json({ message: 'Product not found' });
                }
            }
            catch (e) {
                (0, err_handle_1.handleHttp)(res, 'ERR_DELETE_PRODUCT', e.message);
            }
        });
    }
    static getinstance() {
        if (!ProductController.instance) {
            this.instance = new ProductController();
        }
        return this.instance;
    }
}
exports.productController = ProductController.getinstance();
