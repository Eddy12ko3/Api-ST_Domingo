import { Router, Request, Response } from "express";


const router = Router()
router.get("/", (req: Request, res: Response) =>{
    res.send("<h3>Datos_ blog</h3>")
})
export{router}