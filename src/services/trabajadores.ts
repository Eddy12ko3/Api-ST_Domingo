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
        const newWorker = new WorkersDB();
        newWorker.dni = worker.dni;
        newWorker.nombre = worker.nombre;
        newWorker.password = worker.password;
        
        const responseInsert = await AppDataSource.getRepository(WorkersDB).save(newWorker);
        return responseInsert 
    }

    async GetWorkers (){
        const responseWorkers = await AppDataSource.getRepository(WorkersDB)
                .find({
                    select:{
                        dni: true,
                        password: true,
                        nombre: true
                    }
                })
        return responseWorkers;
    }
}

export const workersService = WorkersService.getInstance();

