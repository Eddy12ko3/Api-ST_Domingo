import { Request, Response } from "express";
import { handleHttp } from "../utils/err.handle";
import { reportService } from "../services/reportes.service";

class ReportController{
    private static instance: ReportController
    public static getInstance(): ReportController{
        if(!ReportController.instance) {
            this.instance = new ReportController();
        }
        return this.instance;
    }

    async getReports(req: Request, res: Response){
        try{
            const response = await reportService.getReports();
            return res.status(200).json(response);
        }catch(e: any){
            handleHttp(res, "Error al obtener los registros", e.message);
        }
    }
}

export const reportController = ReportController.getInstance()