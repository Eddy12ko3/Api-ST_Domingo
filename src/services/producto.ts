import { AppDataSource } from "../app.config";
import { Producto } from "../interfaces/productos.interface";
import { ProductoDB } from "../models/producto";

const InsertProduct = async (producto: Producto) =>{
    const newProduct = new ProductoDB();
    newProduct.nombre = producto.nombre;
    
    newProduct.precio = producto.precio;
    newProduct.cantidad = producto.cantidad;
    newProduct.estado = producto.estado;
    
    const responseInsert = await AppDataSource.getRepository(ProductoDB).save(newProduct)
    return responseInsert;
};

export{InsertProduct}