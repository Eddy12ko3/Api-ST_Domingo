import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./routes";
import { AppDataSource } from "./app.config";

const PORT = process.env.PORT || 5000
const app = express()

app.use(cors());
app.use(express.json())
app.disable('X-Powered-By')

AppDataSource.initialize().then(()=>{
    console.info("---->Database Connected<-----")
}).catch((err) =>{
    throw new Error(err)
})
app.use(router);
app.listen(PORT, ()=> console.log(`Listening for the Port http://localhost:${PORT}`));  