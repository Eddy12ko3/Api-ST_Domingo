import { AppDataSource } from "../app.config";
import { Workers } from "../interfaces/trabajadores";
import { WorkersDB } from "../models/trabajadores";

class WorkersService{
    private static instance: WorkersService;
    public static getInstance(): WorkersService{
        if(!WorkersService.instance){
            this.instance = new WorkersService();
        }
        return this.instance;
    }
    
    async InsertWorker (worker: Workers){
        try{
            const newWorker = new WorkersDB();
            newWorker.dni = worker.dni;
            newWorker.nombre = worker.nombre;
            newWorker.password = worker.password;
            
            const responseInsert = await AppDataSource.getRepository(WorkersDB).save(newWorker);
            return responseInsert 
        }catch(e: any){
            throw new Error(e.message)
        }
    }

    async GetWorkers (){
        try{
            const responseWorkers = await AppDataSource.getRepository(WorkersDB)
                    .find()
            return responseWorkers;
        }catch(e: any){
            throw new Error(e.message)
        }
    }

    async UpdateWorker (id: string, worker: Workers){
        try{
            const workerObj = await AppDataSource.getRepository(WorkersDB)
                .findOne({where: {workedId: parseInt(id)}});
            
            if(!workerObj) throw new Error("WORKER_NOT_FOUND");
    
            workerObj.dni = worker.dni;
            workerObj.nombre = worker.nombre;
            workerObj.password = worker.password;
            
            const responseUpdate = await AppDataSource.getRepository(WorkersDB).save(workerObj);
            return responseUpdate
        }catch(e: any){
            throw new Error(e.message)
        }
    }   

    async DeleteWorker(id: string){
        try{
            const workerDelete = await AppDataSource.getRepository(WorkersDB)
            .findOne({where: {workedId: parseInt(id)}});
            if(!workerDelete) throw new Error("WORKER_NOT_FOUND");
    
            const responseDelete = await AppDataSource.getRepository(WorkersDB).remove(workerDelete)
            return responseDelete;
        }catch(e: any){
            throw new Error(e.message)
        }
    }
}

export const workersService = WorkersService.getInstance();

