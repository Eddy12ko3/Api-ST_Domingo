import { AppDataSource } from "../app.config";
import { Producto } from "../interfaces/productos.interface";
import { ProductoDB } from "../models/producto";

const InsertProduct = async (producto: Producto) =>{
    const newProduct = new ProductoDB();
    newProduct.nombre = producto.name;
    newProduct.precio = producto.price;
    newProduct.cantidad = producto.quantity;
    newProduct.estado = producto.state;
    
    const responseInsert = await AppDataSource.getRepository(ProductoDB).save(newProduct)
    return responseInsert;
};

const GetProducts = async () =>{
    const responseProducts = await AppDataSource.getRepository(ProductoDB).createQueryBuilder("ProductoDB").getMany();
    return responseProducts;
}

const GetProduct = async (id: string) =>{
    const responseProduct =  await AppDataSource.getRepository(ProductoDB).createQueryBuilder("ProductoDB").where("ProductoDB.productoId = :id", {id:id}).getOne();
    return responseProduct;
}

const UpdateProduct = async (id: string, producto: Producto) =>{
    const newProduct = new ProductoDB();
    newProduct.productoId = parseInt(id);
    newProduct.nombre = producto.name;
    newProduct.precio = producto.price;
    newProduct.cantidad = producto.quantity;
    newProduct.estado = producto.state;

    const responseUpdate = await AppDataSource.getRepository(ProductoDB).save(newProduct);
    return responseUpdate;
}

const DeleteProduct = async (id: string) =>{
    const responseDelete = await AppDataSource.createQueryBuilder().delete().from(ProductoDB).where("id = :id", {id: id}).execute();
    return responseDelete;
}
export{InsertProduct, GetProducts, GetProduct, UpdateProduct, DeleteProduct}