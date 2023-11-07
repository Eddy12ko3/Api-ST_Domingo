import { Request, Response } from "express"
import { detailPaymentService } from "../services/pagos.service";
import { handleHttp } from "../utils/err.handle";

class DetailPaymentController{
    private static instance: DetailPaymentController;
    public static getInstance(): DetailPaymentController{
        if(!DetailPaymentController.instance){
            this.instance = new DetailPaymentController();
        }
        return this.instance;
    }

    async InsertPayment(req: Request, res: Response){
        try{
            const {
                datepayment,
                amount,
                person
            } = req.body
            const response = await detailPaymentService.InsertDetailPayment({
                datepayment: datepayment,
                amount: amount,
                person: person
            })
            return res.status(200).json(response)
        }catch(e: any){
            handleHttp(res, "ERR_POST_PAYMENT", e.message)
        }
    }

    async GetPayment(req: Request, res: Response){
        try{
            const response = await detailPaymentService.GetDetailPayment()
            return res.status(200).json(response)
        }catch(e: any){
            handleHttp(res, "ERR_GET_PAYMENT", e.message)
        }
    }

    async UpdatePayment(req: Request, res: Response){
        try{
            const {id} = req.params;
            const {datepayment, amount, person} = req.body;
            const response = await detailPaymentService.UpdateDetailPayment(id, {
                datepayment: datepayment, 
                amount: amount, 
                person: person,
            })
            return res.status(200).json(response)
        }catch(e: any){
            handleHttp(res, "ERR_GET_PAYMENT", e.message)
        }
    }

    async DeletePayment(req: Request, res: Response){
        try{
            const {id} = req.params;
            const response = await detailPaymentService.DeleteDetailPayment(id)
            return res.status(200).json(response)
        }catch(e: any){
            handleHttp(res, "ERR_GET_PAYMENT", e.message)
        }
    }
}

export const detailPaymentController = DetailPaymentController.getInstance();

