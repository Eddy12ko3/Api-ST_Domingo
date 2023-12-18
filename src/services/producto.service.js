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
exports.productService = void 0;
const app_config_1 = require("../app.config");
const producto_1 = require("../models/producto");
class ProductService {
    static getinstance() {
        if (!ProductService.instance) {
            this.instance = new ProductService();
        }
        return this.instance;
    }
    constructor() {
        this.InsertProduct = ({ code, name, details, marca, unit, priceDistributor, priceProduct, image, commission, tax, expired, stock_max, stock_min, status, }) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newProduct = new producto_1.ProductoDB();
                newProduct.code = code;
                newProduct.name = name;
                newProduct.details = details;
                newProduct.marca = marca;
                newProduct.unit = unit;
                newProduct.priceDistributor = priceDistributor;
                newProduct.priceProduct = priceProduct;
                newProduct.image = image;
                newProduct.commission = commission;
                newProduct.tax = tax;
                newProduct.expired = expired;
                newProduct.stock_min = stock_min;
                newProduct.stock_max = stock_max;
                newProduct.status = status;
                const responseInsert = yield app_config_1.AppDataSource.getRepository(producto_1.ProductoDB).save(newProduct);
                return responseInsert;
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
        this.GetProducts = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const responseProducts = yield app_config_1.AppDataSource.getRepository(producto_1.ProductoDB).find();
                return responseProducts;
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
        this.GetProduct = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const responseProduct = yield app_config_1.AppDataSource.getRepository(producto_1.ProductoDB).findOne({
                    where: { productoId: parseInt(id) },
                });
                if (!responseProduct)
                    throw new Error('PRODUCT_NOT_FOUND');
                return responseProduct;
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
        this.UpdateProduct = (id, { code, name, details, marca, unit, priceDistributor, priceProduct, image, commission, tax, expired, stock_max, stock_min, status, }) => __awaiter(this, void 0, void 0, function* () {
            try {
                const productObj = yield app_config_1.AppDataSource.getRepository(producto_1.ProductoDB).findOne({
                    where: { productoId: parseInt(id) },
                });
                if (!productObj)
                    throw new Error('PRODUCT_NOT_FOUND');
                productObj.code = code;
                productObj.name = name;
                productObj.details = details;
                productObj.marca = marca;
                productObj.unit = unit;
                productObj.priceDistributor = priceDistributor;
                productObj.priceProduct = priceProduct;
                productObj.image = image;
                productObj.commission = commission;
                productObj.tax = tax;
                productObj.expired = expired;
                productObj.stock_min = stock_min;
                productObj.stock_max = stock_max;
                productObj.status = status;
                const responseUpdate = yield app_config_1.AppDataSource.getRepository(producto_1.ProductoDB).save(productObj);
                return responseUpdate;
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
        this.DeleteProduct = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const productDelete = yield app_config_1.AppDataSource.getRepository(producto_1.ProductoDB).findOne({
                    where: { productoId: parseInt(id) },
                });
                if (!productDelete)
                    throw new Error('PRODUCT_NOT_FOUND');
                const responseDelete = yield app_config_1.AppDataSource.getRepository(producto_1.ProductoDB).remove(productDelete);
                return responseDelete;
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
}
exports.productService = ProductService.getinstance();
