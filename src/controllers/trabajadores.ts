import { Request, Response } from "express"
import { workersService } from "../services/trabajadores";
import { handleHttp } from "../utils/err.handle";

class WorkersController{
    private static instance: WorkersController;
    public static getinstance(): WorkersController {
        if(!WorkersController.instance){
            this.instance = new WorkersController()
        }
        return this.instance
    }

    async PostWorker(req: Request, res: Response){
        try{
            const{dni, nombre, password} = req.body; 
            const response = await workersService.InsertWorker({dni, nombre, password});
            return res.status(200)
                .json({message: "trabajador insertado correctamente"});
        }catch(e: any){
            handleHttp(res, "ERR_POST_WORKER", e.message);
        }
    }

    async GetWorkers(req: Request, res: Response){
        try{
            const response = await workersService.GetWorkers();
            if(response){
                return res.status(200).json(response);
            }else{
                return res.json({message:"No hay registros"});
            }
        }catch(e: any){
            handleHttp(res, "ERR_GET_WORKERS", e.message);
        }
    }
}

export const workerController = WorkersController.getinstance();