import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./routes";
import { AppDataSource } from "./app.config";
import { User } from "./models/user";

const PORT = process.env.PORT || 5000
const app = express()

app.use(cors());
AppDataSource.initialize().then(()=>{
    console.info("conexion exitosa")

    const newUser = new User();
    newUser.nombre = "Eddy";
    newUser.dni = 123;
    newUser.email = "correro@gmial.com";
    newUser.password = "123456";
    AppDataSource.getRepository(User).save(newUser);
}).catch((err) =>{
    throw new Error(err)
})
app.use(router);
app.listen(PORT, ()=> console.log(`Listening for the Port http://localhost:${PORT}`));  
