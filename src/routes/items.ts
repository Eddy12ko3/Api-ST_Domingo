import { Router, Request, Response } from "express";

// export const routerItems = Router();
/* 
http:localhost:5000/items [GET]
*/
const router = Router()
router.get("/", (req: Request, res: Response) =>{
    res.send("<h3>Datos_ </h3>")
})
export{router}