import { AppDataSource } from "../app.config";
import { AssociatesDB } from "../models/asociados";

class ReportService{
    private static instance: ReportService
    public static getInstance(): ReportService{
        if(!ReportService.instance) {
            this.instance = new ReportService();
        }
        return this.instance;
    }

    async getReports() {
        try {
			const responseAssociates = await AppDataSource.getRepository(AssociatesDB).find({
				relations: {
					numDocument: {
						tipoDocumento: true,
					},
					persons: {
						addresses: true,
						gender: true,
						cellPhones: {
							operators: true,
						},
						stands: {
							areas: true,
							sector: true,
							rubro: true,
						},
                        detailpayment: true
					},
				},
			});

			return {
                recordsFiltered: responseAssociates.length,
	            recordsTotal: responseAssociates.length,
                data: responseAssociates};
		} catch (e: any) {
			throw new Error(e.message);
		}
    }
}

export const reportService = ReportService.getInstance()